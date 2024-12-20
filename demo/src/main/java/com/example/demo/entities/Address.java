package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Address {
    private String id;
    private String userId;
    private String houseNumber;
    private String street;
    private String zipCode;
    private String city;
    private String country;

    // Getters et Setters
}

