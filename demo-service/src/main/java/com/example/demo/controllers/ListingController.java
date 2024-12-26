package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Listing;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    @PostMapping
    public ResponseEntity<Listing> createListing(@RequestBody Listing listing) {
        // Ici, vous pouvez ajouter toute logique métier nécessaire
        // Pour le moment, on renvoie directement l'objet reçu
        return ResponseEntity.ok(listing);
    }
}
