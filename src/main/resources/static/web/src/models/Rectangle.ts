import { Line } from "./Line";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
    height:Line;
    width:Line;

    constructor(height:Line, width:Line) {
        super(height.start)
        this.height = height;
        this.width = width;
        
    }
}