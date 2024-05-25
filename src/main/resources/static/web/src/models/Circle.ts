import { Line } from "./Line";
import { Point } from "./Point";
import { Shape } from "./Shape";

export class Circle extends Shape {
    radio:Line;
    constructor(start:Point, radio:Line) {
        super(start)
        this.radio = radio
    }
}