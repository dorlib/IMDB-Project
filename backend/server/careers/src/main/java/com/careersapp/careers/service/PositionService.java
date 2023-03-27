package com.careersapp.careers.service;

import com.careersapp.careers.model.Position;
import com.careersapp.careers.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionService {

    private final PositionRepository positionRepository;


    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public void addPosition(Position position) {
        positionRepository.insert(position);
    }
    
    public void removePosition() {

    }

    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    public void updatePosition(Position position) {
        Position existingPosition = positionRepository.findById(position.getPositionID())
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannot find Position By ID %s", position.getPositionID())
                ));

        existingPosition.setTitle(position.getTitle());
        existingPosition.setDepartment(position.getDepartment());
        existingPosition.setDescription(position.getDescription());
        existingPosition.setModel(position.getModel());
    }

    public void getPositionByDepartment() {

    }
    public void getPositionByID() {

    }
    public void getPositionByName() {

    }
    public void getPositionByModel() {

    }
}
