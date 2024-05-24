package com.eis.carboncredits.models.shapes;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonFormat
public class Square extends Rectangle {


    public Square(Point start, Line height) {
        super(height, new Line(height.getStart(), height.getEnd()));
        //super(height, height);
    }
}
