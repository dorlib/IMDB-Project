package com.careersapp.careers;

import com.careersapp.careers.model.Position;
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
    public IPosition positionRepo;

    public static void main(String[] args) {

        CareersApplication app = new CareersApplication();

        SpringApplication.run(CareersApplication.class, args);
        app.createPositions();

    }

    public void createPositions() {
        positionRepo.save(new Position(1, "Software Engineer", "backend software engineer", "hybrid", "R&D"));
        positionRepo.save(new Position(1, "team lead", "team lead of backend software engineers", "hybrid", "R&D"));
        positionRepo.save(new Position(1, "office manager", "HR and wellness", "On Site", "HR"));
        positionRepo.save(new Position(1, "data scientist", "data scientist in AI group", "hybrid", "R&D"));
        positionRepo.save(new Position(1, "IT manager", "manage IT and system", "On Site", "system"));
    }


    @Override
    public void run(String... args) throws Exception {

    }
}
