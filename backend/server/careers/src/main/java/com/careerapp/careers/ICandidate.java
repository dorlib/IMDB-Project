package com.careerapp.careers;

import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ICandidate extends IApp {

    public void applyForJob();

    public void deleteApplicationForJob();

    @Query(value = "{candidateID: '?0'}", fields = "{'firstName' :  1, 'lastName' :  1}")
    public List<Position> getApplications(int candidateID);
}
