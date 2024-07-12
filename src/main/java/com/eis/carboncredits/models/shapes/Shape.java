package com.eis.carboncredits.models.shapes;

import java.lang.Double;

import com.eis.carboncredits.entities.AreaEntity;
import com.fasterxml.jackson.annotation.*;


@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Circle.class, name = "Circle"),
        @JsonSubTypes.Type(value = Rectangle.class, name = "Rectangle"),
})
public abstract class Shape {

    @JsonProperty
    Point start;
    @JsonProperty
    Point end;

    public Shape(Point start, Point end) {
        this.start = start;
        if (end == null){
            end = new Point(0,0);
        }
        this.end = end;
    }


    public Point getStart() {
        return start;
    }

    public void setStart(Point start) {
        this.start = start;
    }

    public Point getEnd(){
        return end;
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
