package com.eis.carboncredits.controllers;


import com.eis.carboncredits.entities.PropetarioEntity;
import com.eis.carboncredits.repositories.IPropetarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/propetarios")
public class PropetarioController {


    final IPropetarioRepository propetarioRepository;

    public PropetarioController(IPropetarioRepository propetarioRepository) {
        this.propetarioRepository = propetarioRepository;
    }

    @GetMapping
    List<PropetarioEntity> getPropetarios() {
        return propetarioRepository.findAll();
    }

    @GetMapping("/{id}")
    PropetarioEntity getPropetario(@PathVariable Long id) {
        return propetarioRepository.findById(id).orElse(null);
    }


    @PostMapping
    PropetarioEntity createPropetario(@RequestBody PropetarioEntity propetario) {
        return propetarioRepository.save(propetario);
    }

    @PutMapping("/{id}")
    void updatePropetario(@PathVariable Long id, @RequestBody PropetarioEntity propetario) {
        propetario.setId(id);
        propetarioRepository.save(propetario);
    }

    @DeleteMapping("/{id}")
    boolean deletePropetario(@PathVariable Long id) {
        propetarioRepository.deleteById(id);
        return !propetarioRepository.existsById(id);
    }


}
