package com.careersapp.careers.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("position")
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

    public int getPositionID() {
        return positionID;
    }

    public String getDepartment() {
        return department;
    }

    public String getDescription() {
        return description;
    }

    public String getModel() {
        return model;
    }

    public String getTitle() {
        return title;
    }

    public void setPositionID(int positionID) {
        this.positionID = positionID;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
