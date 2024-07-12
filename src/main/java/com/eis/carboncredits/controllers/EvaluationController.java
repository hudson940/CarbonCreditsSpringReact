package com.eis.carboncredits.controllers;

import com.eis.carboncredits.entities.AreaEntity;
import com.eis.carboncredits.entities.EvaluacionEntity;
import com.eis.carboncredits.entities.EvaluadorEntity;
import com.eis.carboncredits.models.Evaluation;
import com.eis.carboncredits.repositories.IAreaRepository;
import com.eis.carboncredits.repositories.IEvaluadorRepository;
import com.eis.carboncredits.repositories.IEvaluationRepository;
import org.springframework.web.bind.annotation.*;

import java.awt.geom.Area;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/evaluation")
public class EvaluationController {
    private final IEvaluationRepository evaluationRepository;
    private final IAreaRepository areaRepository;
    private final IEvaluadorRepository evaluadorRepository;

    public EvaluationController(IEvaluationRepository evaluationRepository, IAreaRepository areaRepository, IEvaluadorRepository evaluadorRepository) {
        this.evaluationRepository = evaluationRepository;
        this.areaRepository = areaRepository;
        this.evaluadorRepository = evaluadorRepository;
    }
    @GetMapping
    public List<EvaluacionEntity> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<EvaluacionEntity> getEvaluationById(@PathVariable Long id) {
        return evaluationRepository.findById(id);
    }

    @PostMapping
    public EvaluacionEntity addEvaluation(@RequestBody EvaluacionEntity evaluation) {
        evaluation.from_json();
        for (AreaEntity area : evaluation.getAreas()) {
            area.setEvaluacion(evaluation);
        }
        List<EvaluadorEntity> evaluador = evaluadorRepository.findByName(evaluation.getEvaluador().getName());
        if (evaluador.isEmpty()) {
            this.evaluadorRepository.save(evaluation.getEvaluador());
        }
        else {
            evaluation.setEvaluador(evaluador.getFirst());
        }

        return this.evaluationRepository.save(evaluation);
        //this.areaRepository.saveAll(evaluation.getAreas());

        //return this.evaluationRepository.findById(evaluation.getId());
    }
}
