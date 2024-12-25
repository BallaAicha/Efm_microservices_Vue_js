package com.example.demo.entities;

import java.time.LocalDateTime;

public class OutputMessage {
    private String sender;
    private String content;
    private LocalDateTime timestamp;

    public OutputMessage(String sender, String content, LocalDateTime timestamp) {
        this.sender = sender;
        this.content = content;
        this.timestamp = timestamp;
    }

    // Getters
    public String getSender() { return sender; }
    public String getContent() { return content; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
