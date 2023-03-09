package com.careerapp.careers;

import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface IPosition extends IApp {
    public Position addPosition();

    public void removePosition(int positionID);

    @Query(value = "{positionID: '?0'}", fields = "{'firstName' :  1, 'lastName' :  1}")
    public List<Candidate> getApplicants(int positionID);

    @Query(value = "{positionID: '?0'}", fields = "{'title' :  1, 'department' :  1}")
    public Candidate chooseBestApplicant(int positionID);

}
