import { Point } from "./Point";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
    height:number;
    width:number;
    start: Point;
    end: Point;

    constructor(start:Point,end:Point,height:number, width:number) {
        super(start)
        this.height = height;
        this.width = width;
        this.start = start ;
        this.end = end;
    }

}