package com.careerapp.careers;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Position {
    @Id
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
