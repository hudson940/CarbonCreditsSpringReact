import { Point } from "./Point";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
    height:number=0;
    width:number=0;
    start: Point;
    end: Point;

    constructor(id: number|undefined, start:Point,end:Point ) {
        super(id, start)
        this.start = start ;
        this.end = end;
    }

}