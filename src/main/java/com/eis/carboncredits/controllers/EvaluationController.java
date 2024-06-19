package com.eis.carboncredits.controllers;

import com.eis.carboncredits.entities.EvaluacionEntity;
import com.eis.carboncredits.models.Evaluation;
import com.eis.carboncredits.repositories.IEvaluationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/evaluation")
public class EvaluationController {
    private final IEvaluationRepository evaluationRepository;

    public EvaluationController(IEvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
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
    public Optional<EvaluacionEntity> addEvaluation(@RequestBody EvaluacionEntity evaluation) {
        evaluation.from_json();
        this.evaluationRepository.save(evaluation);
        return this.evaluationRepository.findById(evaluation.getId());
    }
}
