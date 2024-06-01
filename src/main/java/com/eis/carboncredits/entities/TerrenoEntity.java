package com.eis.carboncredits.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "terrenos")
public class TerrenoEntity {


    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "id_propietario")
    private Integer idPropietario;

    @Column(name = "id_evaluacion")
    private Integer idEvaluacion;


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Integer getIdPropietario() {
        return idPropietario;
    }

    public void setIdPropietario(Integer idPropietario) {
        this.idPropietario = idPropietario;
    }

    public Integer getIdEvaluacion() {
        return idEvaluacion;
    }

    public void setIdEvaluacion(Integer idEvaluacion) {
        this.idEvaluacion = idEvaluacion;
    }

}