package com.eis.carboncredits.models.shapes;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat
public class Rectangle extends Shape {

    @JsonProperty
    Double height;
    @JsonProperty
    Double width;

    public Rectangle() {}

    public Rectangle(Point start,Double height, Double width){
        super(start);
        this.height = height;
        this.width = width;

    }

    public double length() {
        return width * 2 + height * 2;
    }

    @Override
    public double area() {
        return width * height;
    }
}
