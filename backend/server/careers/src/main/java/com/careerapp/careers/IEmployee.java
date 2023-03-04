package com.careerapp.careers;

import java.util.List;

public interface IEmployee {
    public void applyForJob();
    public void deleteApplicationForJob();
    public List<Position> getApplications();
}
