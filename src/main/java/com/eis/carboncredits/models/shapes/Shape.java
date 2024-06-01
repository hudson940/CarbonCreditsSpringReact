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
    Point end;

    public Shape(Point start, Point end) {
        this.start = start;
        this.end = end;
    }

    public Point getStart() {
        return start;
    }

    public void setStart(Point start) {
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
