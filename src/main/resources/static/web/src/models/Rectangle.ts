import { Point } from "./Point";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
    start: Point;
    end: Point;

    constructor(start:Point, end:Point) {
        super(start)
        this.start = start ;
        this.end = end;

    }
}