package com.example.demo.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.demo.entities.Message;
import com.example.demo.entities.OutputMessage;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @MessageMapping("/sendMessage") // Reçoit les messages envoyés par le client
    @SendTo("/topic/messages") // Envoie à tous les abonnés du canal "/topic/messages"
    public OutputMessage sendMessage(Message message) {
        return new OutputMessage(
            message.getSender(),
            message.getContent(),
            LocalDateTime.now()
        );
    }
}
