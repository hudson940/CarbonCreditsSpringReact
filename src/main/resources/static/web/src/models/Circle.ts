import { Point } from "./Point";
import { Shape } from "./Shape";

export class Circle extends Shape {
    radio:number;
    constructor(start:Point, radio:number) {
        super(start)
        this.radio = radio * 2
    }
}