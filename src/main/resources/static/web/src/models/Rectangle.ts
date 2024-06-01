
import { Shape } from "./Shape";
import { Point } from "../models/Point";
export class Rectangle extends Shape {
    height:number;
    width:number;

    constructor(start:Point,height:number, width:number) {
        super(start)
        this.height = height;
        this.width = width;
    }
}