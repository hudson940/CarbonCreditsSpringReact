package com.eis.carboncredits.models;

import com.eis.carboncredits.models.shapes.Shape;
import com.fasterxml.jackson.annotation.JsonProperty;


import java.util.List;

public record Evaluation (
        int id,
        String image_path,
        List<Shape> evaluated_areas,
        List<Shape> native_forest_areas
){

    public double get_area(List<Shape> shapes) {
        double result = 0;
        for (Shape shape : shapes) {
            result += shape.area();
        }
        return result;
    }

    @JsonProperty
    public double evaluated_area() {
        return get_area(evaluated_areas);
    }
    @JsonProperty
    public double native_forest_area() {
        return get_area(native_forest_areas);
    }

    @JsonProperty
    public double percent_forest_area(){
        return native_forest_area() / evaluated_area() * 100;
    }

}