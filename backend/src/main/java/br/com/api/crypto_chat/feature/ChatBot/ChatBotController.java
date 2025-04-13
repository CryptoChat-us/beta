package br.com.api.crypto_chat.feature.ChatBot;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import br.com.api.crypto_chat.dto.ChatMessageRequest;
import br.com.api.crypto_chat.dto.ChatMessageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Chat Bot", description = "APIs for interacting with the chat bot")
public class ChatBotController {
        
    private final ChatBotService chatBotService;

    @Operation(summary = "Send a message to the chat bot")
    @MessageMapping("/send")
    @SendTo("/topic/public")
    public ChatMessageResponse sendPublicMessage(
            @Valid @Payload ChatMessageRequest request) {
        log.info("Received public message from {}: {}", request.getLogin(), request.getMessage());
        
        return chatBotService.processMessage(request);
    }

    @Operation(summary = "Send a private message to the chat bot")
    @MessageMapping("/send/private")
    @SendToUser("/topic/private")
    public ChatMessageResponse sendPrivateMessage(
            @Valid @Payload ChatMessageRequest request) {
        log.info("Received private message from {}: {}", request.getLogin(), request.getMessage());
        
        ChatMessageResponse response = chatBotService.processMessage(request);
        response.setTopic("private");
        return response;
    }
}
