package com.eis.carboncredits.controllers;

import com.eis.carboncredits.models.Evaluation;
import com.eis.carboncredits.repositories.CustomEvaluationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/evaluation")
public class EvaluationController {
    private final CustomEvaluationRepository evaluationRepository;

    public EvaluationController(CustomEvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }
    @GetMapping
    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Evaluation> getEvaluationById(@PathVariable int id) {
        return evaluationRepository.findById(id);
    }

    @PostMapping
    public Optional<Evaluation> addEvaluation(@RequestBody Evaluation evaluation) {
        this.evaluationRepository.create(evaluation);
        return this.evaluationRepository.findById(evaluation.id());
    }
}
