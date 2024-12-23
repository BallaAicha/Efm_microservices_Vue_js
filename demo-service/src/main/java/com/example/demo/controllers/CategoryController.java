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
                new Category(2, "Smartphones", 1),
                new Category(3, "Ordinateurs portables", 2),
                new Category(4, "Ordinateurs", 1),
                new Category(5, "Téléviseurs", 1),
                new Category(6, "Appareils électroménagers", null),
                new Category(7, "Réfrigérateurs", 6),
                new Category(8, "Fours", 6),
                new Category(9, "Micro-ondes", 6),
                new Category(10, "Blenders", 6),
                new Category(11, "Vêtements", null),
                new Category(12, "Homme", 11),
                new Category(13, "Femme", 11),
                new Category(14, "Enfants", 11),
                new Category(15, "Chaussures", 11),
                new Category(16, "Chaussures pour hommes", 15),
                new Category(17, "Chaussures pour femmes", 15),
                new Category(18, "Vêtements de sport", 11),
                new Category(19, "Mobilier de maison", null),
                new Category(20, "Salon", 19),
                new Category(21, "Canapés", 20),
                new Category(22, "Tables basses", 20),
                new Category(23, "Chambre à coucher", 19),
                new Category(24, "Lits", 23),
                new Category(25, "Armoires", 23),
                new Category(26, "Mobilier de jardin", 19),
                new Category(27, "Chaises de jardin", 26),
                new Category(28, "Tables de jardin", 26),
                new Category(29, "Équipements de sport", null),
                new Category(30, "Fitness", 29),
                new Category(31, "Tapis de yoga", 30),
                new Category(32, "Haltères", 30),
                new Category(33, "Cyclisme", 29),
                new Category(34, "Vélos", 33),
                new Category(35, "Accessoires de vélo", 33),
                new Category(36, "Camping", 29),
                new Category(37, "Tentes", 36),
                new Category(38, "Sacs de couchage", 36),
                new Category(39, "Jeux vidéo", null),
                new Category(40, "Consoles", 39),
                new Category(41, "Jeux", 39),
                new Category(42, "Accessoires pour consoles", 39));
    }
}
