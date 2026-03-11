package com.wpsk.cae.countriesapi.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Country {

    private String name;
    private String capital;
    private String region;
    private long population;
    private String flag;

}