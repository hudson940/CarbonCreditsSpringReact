package com.eis.carboncredits.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "areas")
public class AreaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "start")
    private Integer start;

    @Column(name = "\"end\"")
    private Integer end;

    @Column(name = "type", length = Integer.MAX_VALUE)
    private String type;

    @Column(name = "type_area", length = Integer.MAX_VALUE)
    private String typeArea;


    @ManyToOne
    @JoinColumn(name = "id_evaluacion")
    private EvaluacionEntity evaluacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public Integer getEnd() {
        return end;
    }

    public void setEnd(Integer end) {
        this.end = end;
    }

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



}