package com.careerapp.careers;

import org.springframework.data.mongodb.repository.Query;

public interface IApp {
    @Query(value = "{candidateID: '?0'}", fields = "{'firstName' :  1, 'lastName' : 1}")
    public Candidate getCandidate(int candidateID);
}
