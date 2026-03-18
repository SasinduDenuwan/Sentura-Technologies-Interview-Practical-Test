package com.wpsk.cae.countriesapi.service;

import com.wpsk.cae.countriesapi.model.Country;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CountryService {

    private static final Logger logger = LoggerFactory.getLogger(CountryService.class);
    private static final String API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags";

    private List<Country> cache = new ArrayList<>();
    private long lastFetchTime = 0;

    public List<Country> getCountries() {

        long now = System.currentTimeMillis();

        if (cache.isEmpty() || (now - lastFetchTime) > 600000) {

            RestTemplate restTemplate = new RestTemplate();

            try {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> response =
                        restTemplate.getForObject(API_URL, List.class);

                if (response != null) {
                    cache = response.stream()
                            .map(this::mapCountry)
                            .filter(java.util.Objects::nonNull)
                            .collect(Collectors.toList());

                    lastFetchTime = now;
                }
            } catch (RestClientException e) {
                logger.error("Failed to fetch countries from external API: {}", e.getMessage());
                if (cache.isEmpty()) {
                    throw new RuntimeException("Country data is currently unavailable. Please try again later.", e);
                }
                logger.warn("Returning stale cached data due to API failure.");
            }
        }

        return cache;
    }

    public List<Country> searchCountries(String keyword) {

        return getCountries().stream()
                .filter(c ->
                        c.getName().toLowerCase()
                                .contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private Country mapCountry(Map<String, Object> data) {

        try {
            Map<String, Object> nameMap = (Map<String, Object>) data.get("name");
            String name = (nameMap != null && nameMap.get("common") != null)
                    ? nameMap.get("common").toString()
                    : "Unknown";

            String capital = "";
            List<String> capitalList = (List<String>) data.get("capital");
            if (capitalList != null && !capitalList.isEmpty()) {
                capital = capitalList.get(0);
            }

            String region = data.get("region") != null ? data.get("region").toString() : "Unknown";

            long population = 0;
            if (data.get("population") != null) {
                population = Long.parseLong(data.get("population").toString());
            }

            Map<String, Object> flagsMap = (Map<String, Object>) data.get("flags");
            String flag = (flagsMap != null && flagsMap.get("png") != null)
                    ? flagsMap.get("png").toString()
                    : "";

            return new Country(name, capital, region, population, flag);

        } catch (Exception e) {
            logger.warn("Skipping a country entry due to mapping error: {}", e.getMessage());
            return null;
        }
    }
}
