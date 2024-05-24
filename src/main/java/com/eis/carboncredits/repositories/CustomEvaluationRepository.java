package com.eis.carboncredits.repositories;

import com.eis.carboncredits.models.Evaluation;
import org.springframework.stereotype.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.eis.carboncredits.util.NotFoundException;


@Repository
public class CustomEvaluationRepository implements EvaluationRepository {
    private final List<Evaluation> evaluations = new ArrayList<Evaluation>();
    private static final Logger log = LoggerFactory.getLogger(CustomEvaluationRepository.class);
    @Override
    public List<Evaluation> findAll() {
        return evaluations;
    }

    @Override
    public Optional<Evaluation> findById(int id) {
        return Optional.ofNullable(evaluations.stream()
                .filter(eval -> eval.id() == id)
                .findFirst()
                .orElseThrow( NotFoundException::new));
    }

    @Override
    public void create(Evaluation evaluation) {
        Evaluation newEval = new Evaluation(
                evaluation.id(),
                evaluation.image_path(),
                evaluation.evaluated_areas(),
                evaluation.native_forest_areas()
        );

        evaluations.add(newEval);
    }

    @Override
    public void update(Evaluation evaluation, int id) {
        Optional<Evaluation> existingEval = findById(id);
        if(existingEval.isPresent()) {
            var r = existingEval.get();
            log.info("Updating Existing Evaluation: {}", existingEval.get());
            evaluations.set(evaluations.indexOf(r),evaluation);
        }
    }

    public void delete(Integer id) {
        log.info("Deleting Run: {}", id);
        evaluations.removeIf(evaluation -> evaluation.id()==id);
    }

    public int count() {
        return evaluations.size();
    }

    public void saveAll(List<Evaluation> evaluations) {
        evaluations.stream().forEach(evaluation -> create(evaluation));
    }
}
