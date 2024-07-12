package com.eis.carboncredits.models.shapes;

import com.eis.carboncredits.entities.AreaEntity;

public class ShapeLoader {

    public static Shape from_entity(AreaEntity areaEntity) {
        switch (areaEntity.getType()){
            case ("Circle"):{
                return new Circle(areaEntity.getStart(), areaEntity.getEnd(), areaEntity.getRadio());
            }
            case ("Rectangle"): {
                return new Rectangle(areaEntity.getStart(), areaEntity.getEnd(), areaEntity.getHeight(), areaEntity.getWidth());
            }
            case ("Square"):{
                return null;
            }
        }
        return null;
    }
    public static void to_entity(AreaEntity areaEntity) {
        Shape shape = areaEntity.getShape();
        areaEntity.setStart_x(shape.getStart().getX());
        areaEntity.setStart_y(shape.getStart().getY());
        areaEntity.setEnd_x(shape.getEnd().getX());
        areaEntity.setEnd_y(shape.getEnd().getY());
        if (shape instanceof Circle ){
            areaEntity.setRadio(((Circle) shape).radio);
            areaEntity.setType("Circle");
        }
        else if (shape instanceof Rectangle){
            areaEntity.setHeight(((Rectangle) shape).height);
            areaEntity.setWidth(((Rectangle) shape).width);
            areaEntity.setType("Rectangle");
        }

    }
}
