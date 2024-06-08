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
}
