package com.eis.carboncredits.models.shapes;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Circle extends Shape{

    @JsonProperty
    Double radio;

    public Circle(Point start, Double radio) {
        super(start);
        this.radio = radio;
    }

    public double length() {
        return Math.PI * 2 * radio;
    }

    public double area() {
        return Math.PI * Math.pow(radio, 2);
    }
}
