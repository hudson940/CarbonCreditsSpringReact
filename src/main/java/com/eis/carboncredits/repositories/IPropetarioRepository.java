package com.eis.carboncredits.repositories;

import com.eis.carboncredits.entities.PropetarioEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IPropetarioRepository extends CrudRepository<PropetarioEntity,Long> {

    @Override
    List<PropetarioEntity> findAll();
}
