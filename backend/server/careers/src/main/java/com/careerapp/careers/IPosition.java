package com.careerapp.careers;

import java.util.List;

public interface IPosition {
    public Position addPosition();
    public void removePosition();
    public List<Employee> getApplicants();
    public Employee chooseBestApplicant();
}
