package com.eis.carboncredits.models.shapes;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Line extends Shape{
    @JsonProperty
    Point end;

    public Line(Point start, Point end) {
        super(start);
        this.end = end;
    }

    public Point getEnd() {
        return end;
    }

    public void setEnd(Point end) {
        this.end = end;
    }

    public double length(){
        double length_in_pixel;
        double x=Math.pow((this.end.x-this.start.x), 2);
        double y=Math.pow((this.end.y-this.start.y), 2);
        length_in_pixel = Math.sqrt(x+y);
        return length_in_pixel;
    }

}
