package com.beautycenter.bcappointmentsapp;

import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.EntityManagerFactory;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class BcAppointmentsAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BcAppointmentsAppApplication.class, args);
	}


	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	public Jackson2ObjectMapperBuilderCustomizer jacksonCustomizer() {
		return builder -> builder.featuresToDisable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
	}

}
