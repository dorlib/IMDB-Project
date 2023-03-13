package com.careersapp.careers.service;

import com.careersapp.careers.model.Candidate;
import com.careersapp.careers.repository.CandidateRepository;
import org.springframework.stereotype.Service;

@Service
public class CandidateService {
    private final CandidateRepository candidateRepository;

    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public void addCandidate(Candidate candidate) {
        candidateRepository.insert(candidate);
    }
    public void removePCandidate() {

    }
    public void getAllCandidates() {

    }
    public void updateCandidate() {

    }
    public void getCandidateByFirstName() {

    }
    public void getCandidateByLastName() {

    }
    public void getCandidateByID() {

    }
}
