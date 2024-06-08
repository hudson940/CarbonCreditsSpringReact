package com.eis.carboncredits.entities;

import com.eis.carboncredits.models.shapes.Shape;
import com.eis.carboncredits.models.shapes.ShapeLoader;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "evaluaciones")
public class EvaluacionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "image", length = 255)
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

    public void from_json(){
        for (AreaEntity area: areas){
            ShapeLoader.to_entity(area);
        }
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

    public double get_area(List<Shape> shapes) {
        double result = 0;
        for (Shape shape : shapes) {
            result += shape.area();
        }
        return result;
    }

    public List<Shape> get_areas_by_type(String typeArea){
        List<Shape> shapes = new ArrayList<>();
        for (AreaEntity area: areas){
            if (area.getTypeArea().equals(typeArea)){
                shapes.add(area.getShape());
            }
        }
        return shapes;
    }

    @JsonProperty
    public double evaluated_area() {
        return get_area(get_areas_by_type("evaluated"));
    }
    @JsonProperty
    public double native_forest_area() {
        return get_area(get_areas_by_type("native_forest"));
    }

    @JsonProperty
    public double percent_forest_area(){
        return native_forest_area() / evaluated_area() * 100;
    }



}