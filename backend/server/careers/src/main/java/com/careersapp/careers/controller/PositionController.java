package com.careersapp.careers.controller;

import com.careersapp.careers.model.Position;
import com.careersapp.careers.service.PositionService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/position")
public class PositionController {

    private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @PostMapping
    public ResponseEntity addPosition(@RequestBody Position position) {
        positionService.addPosition(position);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public void removePosition() {}

    @GetMapping
    public ResponseEntity<List<Position>> getAllPositions() {
        return ResponseEntity.ok(positionService.getAllPositions());
    }

    public void updatePosition(Position position) {

    }
    public void getPositionByDepartment() {}
    public void getPositionByID() {}
    public void getPositionByName() {}
    public void getPositionByModel() {}

}
