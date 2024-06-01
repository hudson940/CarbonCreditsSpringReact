package com.eis.carboncredits.entities;

import com.eis.carboncredits.models.shapes.Shape;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "evaluaciones")
public class EvaluacionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "image", length = Integer.MAX_VALUE)
    private String image;


    public EvaluadorEntity getEvaluador() {
        return evaluador;
    }

    public void setEvaluador(EvaluadorEntity evaluador) {
        this.evaluador = evaluador;
    }

    @ManyToOne
    @JoinColumn(name = "id_evaluador")
    public EvaluadorEntity evaluador;

    @OneToMany(mappedBy = "evaluacion")
    private List<AreaEntity> areas;

    public List<AreaEntity> getAreas() {
        return areas;
    }

    public void setAreas(List<AreaEntity> areas) {
        this.areas = areas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }



}