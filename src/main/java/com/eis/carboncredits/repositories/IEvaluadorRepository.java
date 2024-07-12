package com.eis.carboncredits.repositories;

import com.eis.carboncredits.entities.EvaluadorEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IEvaluadorRepository extends CrudRepository<EvaluadorEntity,Long> {

    @Override
    List<EvaluadorEntity> findAll();

    List<EvaluadorEntity> findByName(String name);
}
