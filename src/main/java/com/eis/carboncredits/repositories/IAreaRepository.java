package com.eis.carboncredits.repositories;

import com.eis.carboncredits.entities.AreaEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IAreaRepository extends CrudRepository<AreaEntity, Long> {

    @Override
    List<AreaEntity> findAll();


}
