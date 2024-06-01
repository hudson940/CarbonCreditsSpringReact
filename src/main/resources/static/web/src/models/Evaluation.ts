import { Shape } from "../models/Shape";
import { Circle } from "../models/Circle";
import { Rectangle } from "../models/Rectangle";
import { Point } from "../models/Point";
import { CircleDrawable } from "../drawable/CircleDrawable";
import { RectangleDrawable } from "../drawable/RentangleDrawable";


export class Evaluation {
    id: Number;
    image_path: String;
    evaluated_areas: Shape[];
    native_forest_areas: Shape[]

    constructor(id:Number, image_path:String, evaluated_areas: Shape[], native_forest_areas: Shape[]) {

        this.id = id,
        this.image_path = image_path,
        this.evaluated_areas = evaluated_areas,
        this.native_forest_areas = native_forest_areas
        
    }
    
    public static from_json(json_data:Object):Evaluation {

        const evaluation = new Evaluation(json_data.id, json_data.image_path, [], [])
        evaluation.evaluated_areas = [],
        evaluation.native_forest_areas = []

        this.load_areas(json_data.evaluated_areas, evaluation.evaluated_areas)
        this.load_areas(json_data.native_forest_areas, evaluation.native_forest_areas)
        return evaluation
    }

    static load_areas(json_areas:Shape[], shape_list:Shape[]){
        json_areas.forEach(element => {
            const shapeType = element["@type"]
            let shape:Shape
            switch (shapeType) {
                case "Circle":
                    shape = new CircleDrawable(new Point(element.start.x,element.start.y), element.radio, 'red')
                    break;
                case "Rectangle":
                    shape = new RectangleDrawable(new Point(element.start.x,element.start.y), element.height, element.width)
                    break;
                default:
                    shape = new Shape(new Point(element.start.x, element.start.y))
                    break;
            }
            shape_list.push(shape)

        });
    }
}