package com.example.demo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Category;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @GetMapping
    public List<Category> getCategories() {
        // Liste de catégories en dur
        logger.info("Récupération données catégories");
        return Arrays.asList(
            new Category(1, "Électronique", null),
            new Category(2, "Ordinateurs", 1),
            new Category(3, "Ordinateurs portables", 2),
            new Category(4, "Smartphones", 1),
            new Category(5, "Téléviseurs", 1),
            new Category(6, "Appareils électroménagers", null)
        );
    }
}
