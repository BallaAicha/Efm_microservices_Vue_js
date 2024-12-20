package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Address;
import com.example.demo.entities.User;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    // Exemple d'utilisateur pour getUser
    private final User exampleUser = new User(
            "1",
            "John",
            "Doe Do",
            "johndoe@example.com",
            "+123456789",
            "",
            "",
            4.5,
            20,
            "");

    // Exemple d'adresse
    private Address exampleAddress = new Address(
            "1",
            "1", // userId
            "42",
            "Main Street",
            "12345",
            "New York",
            "USA");

    // GET /api/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable("id") String id) {
        logger.info("Récupération données getUser : {}", id);

        // Combiner les données utilisateur et adresse
        Map<String, Object> response = new HashMap<>();
        response.put("user", exampleUser);
        response.put("address", exampleAddress);

        return ResponseEntity.ok(response);
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<Object> addUser(@RequestBody User user) {
        logger.info("Tentative de connexion avec email : {}", user.getEmail());

        String email = user.getEmail();
        String password = user.getPassword();

        // Validation simplifiée
        if ("user@example.com".equals(email) && "password123".equals(password)) {
            // Simule l'ajout d'utilisateur (dans un vrai cas, il faudrait persister cet
            // utilisateur)
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } else {
            // Retourne un message d'erreur avec le statut FORBIDDEN
            String errorMessage = "Les identifiants fournis sont incorrects.";
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorMessage);
        }
    }

}
