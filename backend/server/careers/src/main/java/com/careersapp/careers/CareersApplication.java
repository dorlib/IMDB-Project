package com.careersapp.careers;

import com.careersapp.careers.repository.IPosition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class CareersApplication implements CommandLineRunner {

    @Autowired
    IPosition positionRepo;

    public static void main(String[] args) {

        SpringApplication.run(CareersApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
