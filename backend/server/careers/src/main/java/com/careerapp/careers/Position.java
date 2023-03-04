package com.careerapp.careers;

public class Position {
    int positionID;
    String title;
    String description;
    String model;
    String department;

    public Position(
            int positionID,
            String title,
            String description,
            String model,
            String department
    ) {
        positionID = positionID;
        title = title;
        description = description;
        model = model;
        department = description;
    }
}
