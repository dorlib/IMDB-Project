package com.careersapp.careers.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("candidate")
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

    public int getPositionID() {
        return positionID;
    }

    public int getCandidateID() {
        return candidateID;
    }

    public int getAge() {
        return age;
    }

    public String getCountry() {
        return country;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String[] getEducation() {
        return education;
    }

    public String[] getExperience() {
        return experience;
    }

    public void setCandidateID(int candidateID) {
        this.candidateID = candidateID;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setEducation(String[] education) {
        this.education = education;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setExperience(String[] experience) {
        this.experience = experience;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPositionID(int positionID) {
        this.positionID = positionID;
    }
}
