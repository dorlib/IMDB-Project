package com.careersapp.careers.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Candidate {
    @Id
    int candidateID;
    String firstName;
    String lastName;
    int age;
    String phoneNumber;
    String email;
    String country;
    String[] education;
    String[] experience;
    int positionID;

    public Candidate(
            String firstName,
            String lastName,
            int age,
            String phoneNumber,
            String email,
            String country,
            String[] education,
            String[] experience,
            int positionID
    ) {
        firstName = firstName;
        lastName = lastName;
        age = age;
        phoneNumber = phoneNumber;
        email = email;
        country = country;
        education = education;
        experience = experience;
        positionID = positionID;
    }
}
