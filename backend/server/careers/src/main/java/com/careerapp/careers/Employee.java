package com.careerapp.careers;

public class Employee {
    String firstName;
    String lastName;
    int age;
    String phoneNumber;
    String email;
    String country;
    String[] education;
    String[] experience;
    int positionID;

    public Employee(
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
