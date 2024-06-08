package com.eis.carboncredits.entities;

import com.eis.carboncredits.models.shapes.Shape;
import com.eis.carboncredits.models.shapes.ShapeLoader;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import com.eis.carboncredits.models.shapes.Point;

@Entity
@Table(name = "areas")
public class AreaEntity {

    public void setStart_x(Integer start_x) {
        this.start_x = start_x;
    }

    public void setStart_y(Integer start_y) {
        this.start_y = start_y;
    }

    public void setEnd_x(Integer end_x) {
        this.end_x = end_x;
    }

    public void setEnd_y(Integer end_y) {
        this.end_y = end_y;
    }

    public void setRadio(Double radio) {
        this.radio = radio;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Transient
    private Shape shape;

    @Column(name = "start_x")
    private Integer start_x;
    @Column(name = "start_y")
    private Integer start_y;
    @Column(name = "\"end_x\"")
    private Integer end_x;
    @Column(name = "\"end_y\"")
    private Integer end_y;

    @Column(name = "type", length = Integer.MAX_VALUE)
    private String type;

    @Column(name = "type_area", length = Integer.MAX_VALUE)
    private String typeArea;

    @Column(name = "radio")
    private Double radio;

    @Column(name = "height")
    private Double height;

    @Column(name = "width")
    private Double width;
    @ManyToOne
    @JoinColumn(name = "id_evaluacion")
    private EvaluacionEntity evaluacion;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    public Point getStart() {
        return new Point(start_x, start_y);
    }

    @JsonIgnore
    public Point getEnd() {
        return new Point(end_x, end_y);
    }

    @JsonIgnore
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTypeArea() {
        return typeArea;
    }

    public void setTypeArea(String typeArea) {
        this.typeArea = typeArea;
    }

    @JsonIgnore
    public Double getRadio(){
        return this.radio;
    }

    public Shape getShape() {
        if (this.shape == null) {
            this.shape = ShapeLoader.from_entity(this);
        }
        return this.shape;
    }

    @JsonIgnore
    public Double getHeight() {
        return height;
    }
    @JsonIgnore
    public Double getWidth() {
        return width;
    }
}