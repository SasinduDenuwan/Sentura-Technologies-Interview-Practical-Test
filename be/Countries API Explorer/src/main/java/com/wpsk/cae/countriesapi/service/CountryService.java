package com.wpsk.cae.countriesapi.service;

import com.wpsk.cae.countriesapi.model.Country;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CountryService {

    private static final String API_URL = "https://restcountries.com/v3.1/all";

    private List<Country> cache = new ArrayList<>();
    private long lastFetchTime = 0;

    public List<Country> getCountries() {

        long now = System.currentTimeMillis();

        if (cache.isEmpty() || (now - lastFetchTime) > 600000) {

            RestTemplate restTemplate = new RestTemplate();

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> response =
                    restTemplate.getForObject(API_URL, List.class);

            if (response != null) {
                cache = response.stream()
                        .map(this::mapCountry)
                        .collect(Collectors.toList());

                lastFetchTime = now;
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

        String name = ((Map<String, Object>) data.get("name")).get("common").toString();

        String capital = "";
        if (data.get("capital") != null) {
            capital = ((List<String>) data.get("capital")).get(0);
        }

        String region = data.get("region").toString();

        long population = Long.parseLong(data.get("population").toString());

        String flag = ((Map<String, Object>) data.get("flags")).get("png").toString();

        return new Country(name, capital, region, population, flag);
    }
}
