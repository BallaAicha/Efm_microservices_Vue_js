package com.example.demo.entities;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Listing {
    private String id;
    private String userId;
    private String title;
    private Double price;
    private String location;
    private String description;
    private List<Category> category; // IDs des catégories
    private Boolean isExchangeable;
    private String condition; // NEW ou USED
    private String status; // ACTIVE, SOLD ou REMOVED
}
