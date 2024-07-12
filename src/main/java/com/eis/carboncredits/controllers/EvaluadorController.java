package com.eis.carboncredits.controllers;


import com.eis.carboncredits.entities.EvaluadorEntity;
import com.eis.carboncredits.repositories.IEvaluadorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/evaluadores")
public class EvaluadorController {

  final IEvaluadorRepository evaluadorRepository;

  public EvaluadorController(IEvaluadorRepository evaluadorRepository) {
      this.evaluadorRepository = evaluadorRepository;
  }

  @GetMapping
    List<EvaluadorEntity>  getEvaluadores(){
     return evaluadorRepository.findAll();
  }


  @GetMapping("/{id}")
    Optional<EvaluadorEntity> getEvaluador(@PathVariable Long id){
         var evaluador = evaluadorRepository.findById(id);
         return evaluador;
    }

    @PostMapping
    EvaluadorEntity createEvaluador(@RequestBody EvaluadorEntity evaluador){
      return evaluadorRepository.save(evaluador);
    }

    @PutMapping("/{id}")
    EvaluadorEntity updateEvaluador(@PathVariable Long id, @RequestBody EvaluadorEntity evaluador){
      var evaluadorEntity = evaluadorRepository.findById(id);
      if(!evaluadorEntity.isPresent()){
         return  null;
      }
      evaluador.setId(id);
      return evaluadorRepository.save(evaluador);
    }

    @DeleteMapping("/{id}")
    boolean deleteEvaluador(@PathVariable Long id){
      evaluadorRepository.deleteById(id);
      return true;
    }
}
