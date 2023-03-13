package com.careersapp.careers.repository;

import com.careersapp.careers.model.Candidate;
import com.careersapp.careers.model.Position;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PositionRepository extends MongoRepository<Position, String> {
    public Position addPosition();

    public void removePosition(int positionID);

    @Query(value = "{positionID: '?0'}", fields = "{'firstName' :  1, 'lastName' :  1}")
    public List<Candidate> getApplicants(int positionID);

    @Query(value = "{positionID: '?0'}", fields = "{'title' :  1, 'department' :  1}")
    public Candidate chooseBestApplicant(int positionID);

}
