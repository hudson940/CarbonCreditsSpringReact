package com.eis.carboncredits.entities;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "evaluadores")
public class EvaluadorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;



    @OneToMany(mappedBy = "evaluador")
    private List<EvaluacionEntity> evaluaciones;


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