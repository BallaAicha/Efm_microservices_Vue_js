package com.example.demo.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat") // Mapping pour l'envoi des messages
    @SendTo("/topic/messages") // Destination pour diffuser les messages
    public String sendMessage(String message) {
        return message; // Traitez le message si nécessaire
    }
}

