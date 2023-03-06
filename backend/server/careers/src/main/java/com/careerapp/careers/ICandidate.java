package com.careerapp.careers;

import java.util.List;

public interface ICandidate {
    public void applyForJob();
    public void deleteApplicationForJob();
    public List<Position> getApplications();
}
