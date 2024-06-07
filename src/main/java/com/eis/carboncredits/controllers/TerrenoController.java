package com.eis.carboncredits.controllers;

import com.eis.carboncredits.entities.TerrenoEntity;
import com.eis.carboncredits.repositories.ITerrenoRepository;
import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/terrenos")
public class TerrenoController {

    final ITerrenoRepository terrenoRepository;

    public TerrenoController(ITerrenoRepository terrenoRepository) {
        this.terrenoRepository = terrenoRepository;
    }

    @GetMapping
    List<TerrenoEntity> getTerrenos() {
        return terrenoRepository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<TerrenoEntity> getTerreno(@PathVariable Long id) {

        var terreno = terrenoRepository.findById(id);
        if(!terreno.isPresent()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(terreno.orElse(null));
    }

    @PostMapping
    TerrenoEntity createTerreno(@RequestBody TerrenoEntity terrenoEntity) {
        return terrenoRepository.save(terrenoEntity);
    }

    @PutMapping("/id")
    TerrenoEntity updateTerreno(@PathVariable Long id, @RequestBody TerrenoEntity terrenoEntity) {
         terrenoEntity.setId(id);
         return terrenoRepository.save(terrenoEntity);
    }

    @DeleteMapping("/{id}")
    boolean deleteTerreno(@PathVariable Long id) {
      terrenoRepository.deleteById(id);
      return true;
    }
}
