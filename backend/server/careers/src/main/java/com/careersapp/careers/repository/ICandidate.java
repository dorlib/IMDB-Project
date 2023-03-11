package com.careersapp.careers.repository;

import com.careersapp.careers.model.Candidate;
import com.careersapp.careers.model.Position;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ICandidate extends MongoRepository<Candidate, String> {

    public void applyForJob();

    public void deleteApplicationForJob();

    @Query(value = "{candidateID: '?0'}", fields = "{'firstName' :  1, 'lastName' :  1}")
    public List<Position> getApplications(int candidateID);

    @Query(value = "{candidateID: '?0'}", fields = "{'firstName' :  1, 'lastName' : 1}")
    public Candidate getCandidate(int candidateID);
}
