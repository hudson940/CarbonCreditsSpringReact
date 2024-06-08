import { Drawable } from "../drawable/Drawable";
import { Point } from "../models/Point";
import { CircleDrawable } from "../drawable/CircleDrawable";
import { RectangleDrawable } from "../drawable/RentangleDrawable";


export class Evaluation {
    id: Number;
    image_path: string;
    evaluated_areas: Drawable[];
    native_forest_areas: Drawable[];
    percent_forest_area: number;
    native_forest_area: number;
    evaluated_area:number;

    constructor(id:Number, image_path:string, evaluated_areas: Drawable[], native_forest_areas: Drawable[],percent_forest_area:number, native_forest_area:number,evaluated_area:number) {

        this.id = id,
        this.image_path = image_path,
        this.evaluated_areas = evaluated_areas
        this.native_forest_areas = native_forest_areas
        this.percent_forest_area = percent_forest_area
        this.native_forest_area = native_forest_area
        this.evaluated_area = evaluated_area
        
    }
    
    public static from_json(json_data:any):Evaluation {

        const evaluation = new Evaluation(json_data.id, json_data.image, [], [], json_data.percent_forest_area, json_data.native_forest_area, json_data.evaluated_area)
        evaluation.evaluated_areas = []
        evaluation.native_forest_areas = []

        this.load_areas(json_data.areas.filter( (a:any) => a.typeArea == 'evaluated'), evaluation.evaluated_areas, 'Blue')
        this.load_areas(json_data.areas.filter((a:any)=>a.typeArea == 'native_forest'), evaluation.native_forest_areas, 'Red')
        return evaluation
    }
    public get_all_areas(): Drawable[]{
        return [...this.evaluated_areas, ...this.native_forest_areas]
    }

    static load_areas(json_areas:Drawable[], shape_list:Drawable[], color:string){
        json_areas.forEach((area:any) => {
            const element = area.shape
            const shapeType = element["@type"]
            let shape:Drawable|null = null
            if (shapeType == 'Circle') {
                shape = new CircleDrawable(new Point(element.start.x,element.start.y), element.radio, color)
            }
            else if (shapeType == 'Rectangle') {
                shape = new RectangleDrawable(new Point(element.start.x,element.start.y), new Point(element.end.x, element.end.y), color)
            }
            if (shape != null) {
                shape_list.push(shape)
            }
            

        });
    }
}