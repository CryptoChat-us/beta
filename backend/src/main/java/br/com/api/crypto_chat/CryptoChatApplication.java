package br.com.api.crypto_chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableFeignClients(basePackages = "br.com.api.crypto_chat.integration")
public class CryptoChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(CryptoChatApplication.class, args);
	}

}
