import { Drawable } from "../drawable/Drawable";
import { Point } from "./Point";
import { Evaluador } from "./Evaluador";
import { CircleDrawable } from "../drawable/CircleDrawable";
import { RectangleDrawable } from "../drawable/RentangleDrawable";


export class Evaluation {
    id: number;
    image_path: string;
    evaluated_areas: Drawable[];
    native_forest_areas: Drawable[];
    percent_forest_area: number;
    native_forest_area: number;
    evaluated_area:number;
    evaluador: Evaluador;

    constructor(id:number, image_path:string, evaluated_areas: Drawable[], native_forest_areas: Drawable[],percent_forest_area:number, native_forest_area:number,evaluated_area:number, evaluador:Evaluador) {

        this.id = id,
        this.image_path = image_path,
        this.evaluated_areas = evaluated_areas
        this.native_forest_areas = native_forest_areas
        this.percent_forest_area = percent_forest_area
        this.native_forest_area = native_forest_area
        this.evaluated_area = evaluated_area
        this.evaluador = evaluador
        
    }

    public static from_json(json_data:any):Evaluation {

        const evaluation = new Evaluation(json_data.id, json_data.image, [], [], json_data.percent_forest_area, json_data.native_forest_area, json_data.evaluated_area, json_data.evaluador)
        evaluation.evaluated_areas = []
        evaluation.native_forest_areas = []

        this.load_areas(json_data.areas.filter( (a:any) => a.typeArea == 'evaluated'), evaluation.evaluated_areas, 'Blue')
        this.load_areas(json_data.areas.filter((a:any)=>a.typeArea == 'native_forest'), evaluation.native_forest_areas, 'Red')
        return evaluation
    }
    public to_json():string {
        const areas = []

        function mapArea(area:Drawable, typeArea:string) {
            
            return {
                typeArea: typeArea,
                ...area,
                shape: {
                    '@type': area.type,
                    ...area
                }
            }
        }

        for (const area of this.evaluated_areas){
            const area_json = mapArea(area, 'evaluated')
            areas.push(area_json)
        }
        for (const area of this.native_forest_areas){
            const area_json = mapArea(area, 'native_forest')
            areas.push(area_json)
        }

        return JSON.stringify({
            id: this.id || undefined,
            areas: areas,
            image: this.image_path,
            evaluador: this.evaluador,
            
        })
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
                shape = new CircleDrawable(area.id, new Point(element.start.x,element.start.y), element.radio, color)
            }
            else if (shapeType == 'Rectangle') {
                shape = new RectangleDrawable(area.id, new Point(element.start.x,element.start.y), new Point(element.end.x, element.end.y), color)
            }
            if (shape != null) {
                shape_list.push(shape)
            }
            

        });
    }
}