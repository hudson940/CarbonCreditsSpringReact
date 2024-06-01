package com.eis.carboncredits.repositories;

import com.eis.carboncredits.models.Evaluation;

import java.util.List;
import java.util.Optional;

public interface EvaluationRepository {


    List<Evaluation> findAll();
    Optional<Evaluation> findById(int id);
    void create(Evaluation evaluation);
    void update(Evaluation evaluation, int id);

    void delete(Integer id);
    int count();
    void saveAll(List<Evaluation> evaluations);

}
