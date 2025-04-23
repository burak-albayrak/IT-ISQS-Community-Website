package com.devEra.ws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableCaching
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);

		System.out.println("başladi");
	}
}
