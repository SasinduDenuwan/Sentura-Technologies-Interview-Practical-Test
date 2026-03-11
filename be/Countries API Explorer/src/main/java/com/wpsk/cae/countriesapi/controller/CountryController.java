package com.wpsk.cae.countriesapi.controller;

import com.wpsk.cae.countriesapi.model.Country;
import com.wpsk.cae.countriesapi.service.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin
@RequiredArgsConstructor
public class CountryController {
    private final CountryService service;

    @GetMapping
    public List<Country> getCountries() {
        return service.getCountries();
    }

    @GetMapping("/search")
    public List<Country> searchCountries(@RequestParam String name) {
        return service.searchCountries(name);
    }
}
