package br.com.api.crypto_chat.vo;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class PromptsVO {

    private String message;
    private String messageResponse;
    private Date dateMessage;

    public PromptsVO(String message, String messageResponse, Date dateMessage) {
        this.message = message;
        this.messageResponse = messageResponse;
        this.dateMessage = dateMessage;
    }
}
