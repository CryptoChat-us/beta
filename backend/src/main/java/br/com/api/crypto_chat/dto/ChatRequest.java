package br.com.api.crypto_chat.dto;

import java.util.List;

import lombok.Data;

@Data
public class ChatRequest {
    private String model;
    private List<Message> messages;

    @Data
    public static class Message {
        private String role;
        private String content;
    }
}
