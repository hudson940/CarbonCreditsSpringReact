package com.eis.carboncredits.models.shapes;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Circle extends Shape{

    @JsonProperty
    Line radio;

    public Circle(Point start, Line radio) {
        super(start);
        this.radio = radio;
    }

    public double length() {
        return Math.PI * 2 * radio.length();
    }

    public double area() {
        return Math.PI * Math.pow(radio.length(), 2);
    }
}
