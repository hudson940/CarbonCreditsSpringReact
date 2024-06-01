package com.eis.carboncredits.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "evaluadores")
public class EvaluadorEntity {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}