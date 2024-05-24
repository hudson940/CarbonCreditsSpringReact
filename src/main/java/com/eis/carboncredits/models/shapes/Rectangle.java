package com.eis.carboncredits.models.shapes;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat
public class Rectangle extends Shape {

    @JsonProperty
    Line height;
    @JsonProperty
    Line width;

    public Rectangle() {}

    public Rectangle(Line height, Line width){
        super(height.getStart());
        this.height = height;
        this.width = width;

    }

    public double length() {
        return width.length() * 2 + height.length() * 2;
    }

    @Override
    public double area() {
        return width.length() * height.length();
    }
}
