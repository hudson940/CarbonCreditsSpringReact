package com.eis.carboncredits.models.shapes;

import java.lang.Double;
import com.fasterxml.jackson.annotation.*;


@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Circle.class, name = "Circle"),
        @JsonSubTypes.Type(value = Line.class, name = "Line"),
        @JsonSubTypes.Type(value = Rectangle.class, name = "Rectangle"),
        @JsonSubTypes.Type(value = Square.class, name = "Square"),
})
public abstract class Shape {

    Point start;

    public Point getStart() {
        return start;
    }

    public void setStart(Point start) {
        this.start = start;
    }

    public Shape() {}

    public Shape(Point start) {
        this.start = start;
    }
    @JsonProperty
    public double length(){
        return Double.NaN;
    }

    @JsonProperty
    public double area(){
        return Double.NaN;
    }

}
