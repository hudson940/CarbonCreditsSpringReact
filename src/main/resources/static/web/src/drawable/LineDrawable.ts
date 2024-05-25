import { Line } from "../models/Line";
import { Point } from "../models/Point";
import { Drawable } from "./Drawable";
import {canvas} from 'roughjs';



export class LineDrawable extends Line implements Drawable {
    constructor(start:Point, end:Point) {
        super(start, end)
    }

    draw(canvas:canvas.RoughCanvas): void {
        canvas.line(this.start.x, this.start.y, this.end.x, this.end.y)
    }

}