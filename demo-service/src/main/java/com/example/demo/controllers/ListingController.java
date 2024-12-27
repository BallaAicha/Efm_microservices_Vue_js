package com.example.demo.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Category;
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

    // @GetMapping
    // public List<Listing> getAllListings() {
    //     return Arrays.asList(
    //             // new Listing("1", "90798JKGKJ", "Iphone", 8.0, "Rabat", "DEEE", null, null, null, null)
    //             new Listing("1", "101", "Laptop Dell Inspiron", "High-performance laptop suitable for gaming and work.",
    //                     Arrays.asList(new Category[]{
    //                             new Category("1", "Electronics", "Electronic devices", null),
    //                             new Category("2", "Computers", "Desktops and laptops", "1")
    //                     }),
    //                     800.99, false, "New York, NY", "USED",
    //                     "2024-12-01T10:00:00Z", "2024-12-05T10:00:00Z", "ACTIVE"),
    //             // Ajoutez les autres listings ici en suivant le même format
    //             // ...
    //     );
    // }
}
