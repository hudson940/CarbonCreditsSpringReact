package com.eis.carboncredits.controllers;


import com.eis.carboncredits.entities.AreaEntity;
import com.eis.carboncredits.repositories.IAreaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/areas")
public class AreaController {

    final IAreaRepository areaRepository;

    public AreaController(IAreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }


    @GetMapping
    public List<AreaEntity> getAllAreas() {
        return areaRepository.findAll();
    }


    @GetMapping("/{id}")
    public Optional<AreaEntity> getArea(@PathVariable Long id) {
        return areaRepository.findById(id);
    }

    @PostMapping
    public AreaEntity saveArea(@RequestBody AreaEntity area) {
        return areaRepository.save(area);
    }


    @PutMapping("/{id}")
    public ResponseEntity<AreaEntity> updateArea(@PathVariable Long id,@RequestBody AreaEntity area) {
        var areaToUpdate = areaRepository.findById(id);

        if (!areaToUpdate.isPresent()) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        area.setId(id);
        areaRepository.save(area);
        return ResponseEntity.ok(area);
    }

    @DeleteMapping("/{id}")
    public Boolean deleteArea(@PathVariable Long id) {
        areaRepository.deleteById(id);
        return true;
    }

}
