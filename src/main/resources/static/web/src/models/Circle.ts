import { Point } from "./Point";
import { Shape } from "./Shape";

export class Circle extends Shape {
    radio:number;
    
    constructor(id:number|undefined, start:Point, radio:number) {
        super(id, start)
        this.radio = radio * 2
    }
}