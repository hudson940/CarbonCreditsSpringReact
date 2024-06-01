import { RoughCanvas } from "roughjs/bin/canvas";
import { Line } from "../models/Line";
import { Point } from "../models/Point";
import { Drawable } from "./Drawable";
import { Circle } from "../models/Circle";




export class CircleDrawable extends Circle implements Drawable {
    
    constructor(start:Point,radius: number) {
        super(start,radius)
    }

    draw(canvas:RoughCanvas): void {
        canvas.circle(this.start.x, this.start.y, this.radio)
    }

}