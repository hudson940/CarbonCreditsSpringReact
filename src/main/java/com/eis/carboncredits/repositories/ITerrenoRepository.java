package com.eis.carboncredits.repositories;

import com.eis.carboncredits.entities.TerrenoEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ITerrenoRepository extends CrudRepository<TerrenoEntity,Long> {
    @Override
    List<TerrenoEntity> findAll();
}
