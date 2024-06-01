import { RoughCanvas } from "roughjs/bin/canvas";
import { Line } from "../models/Line";
import { Point } from "../models/Point";
import { Drawable } from "./Drawable";




export class LineDrawable extends Line implements Drawable {
    constructor(start:Point, end:Point) {
        super(start, end)
    }

    draw(canvas:RoughCanvas): void {
     canvas.line(this.start.x, this.start.y, this.end.x, this.end.y) 
    }

}