package com.example.demo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    // Token fictif
    private String TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MzQyMDgwNTksImlhdCI6MTczNDE5MDA1OSwianRpIjoiZDdmMTg3NWQtNDJlOC00MjVmLTg2ZTktMTM1MDYzNjkyNmU0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDk5L3JlYWxtcy9jb25uZWN0VHJvYyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI2YjE2MzgwZi03ZTk4LTQ3NjEtODUzZi0yZGY1M2ZiN2E1MDgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjb25uZWN0Iiwic2lkIjoiMjMwMzJmYmUtOWI0MC00NWYxLWE2MmItNTIxYjFjYjYzOWUzIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtY29ubmVjdHRyb2MiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJwaG9uZU51bWJlciI6IjA2MjQ2NTIzNDUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm51bWJlck9mVmlld3MiOjI0LCJuYW1lIjoiTWFyYyBBbGZyZWRvIElJIiwicmF0aW5nIjoiMy41IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWxmcmVfMiIsImdpdmVuX25hbWUiOiJNYXJjIiwiZmFtaWx5X25hbWUiOiJBbGZyZWRvIElJIiwiZW1haWwiOiJhbGZyZWRvMkB0ZXN0LmNvbSJ9.w4wpeKduQr9vfthA03IsxOoAGVSs_6vah6gju-k5a9M";

    // Méthode GET pour obtenir directement un token
    @GetMapping("/token")
    public Map<String, String> getAccessToken() {
        logger.info("Accès à l'endpoint /token pour obtenir le token.");
        Map<String, String> response = new HashMap<>();
        response.put("access_token", TOKEN);
        logger.info("Token renvoyé avec succès.");
        return response;
    }

    // Méthode POST pour vérifier email/password et renvoyer un token
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload) {
        logger.info("Tentative de connexion avec email : {}", payload);
        Map<String, Object> response = new HashMap<>();

        String email = payload.get("email");
        String password = payload.get("password");

        // Validation simplifiée
        if ("user@example.com".equals(email) && "password123".equals(password)) {
            response.put("access_token", TOKEN);
            response.put("status", "success");
        } else {
            response.put("status", "error");
            response.put("message", "Invalid email or password");
        }
        return response;
    }

    // Méthode POST pour déconnexion
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorization) {
        logger.info("Tentative de deconnexion");
        // Extraire le token sans le préfixe "Bearer "
        String token = authorization.replace("Bearer ", "");

        if (TOKEN.equals(token)) {
            // Si le token correspond, on invalide la session (ici un message simple)
            return ResponseEntity.ok(Map.of("message", "Déconnexion réussie", "status", "success"));
        } else {
            // Si le token ne correspond pas, on renvoie une erreur 401 Unauthorized
            return ResponseEntity.status(401).body(Map.of("message", "Token invalide", "status", "error"));
        }
    }

    // Méthode POST pour verifier le token
    @PostMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        logger.info("Tentative de verification du token");
        if (TOKEN.equals(token)) {
            return ResponseEntity.ok(Map.of("valid", true));
        } else {
            return ResponseEntity.status(401).body(Map.of("valid", false, "message", "Token invalide"));
        }
    }

}
