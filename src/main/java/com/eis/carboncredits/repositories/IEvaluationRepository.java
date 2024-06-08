package com.eis.carboncredits.repositories;

import com.eis.carboncredits.entities.EvaluacionEntity;
import com.eis.carboncredits.models.Evaluation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IEvaluationRepository extends CrudRepository<EvaluacionEntity, Long> {

    @Override
    List<EvaluacionEntity> findAll();
}