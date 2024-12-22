package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithAddress {
    private String id; // UUID
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String password;
    private String passwordConfirmation;
    private float rating; // Float
    private String status;
    private String[] images;
    private String imagePath;
    private int numberOfReviews;
    private String profilePicture;
    private Address address;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Address {
        private String id; // UUID
        private String street;
        private String houseNumber;
        private String postalCode;
        private String city;
        private String country;
    }
}
