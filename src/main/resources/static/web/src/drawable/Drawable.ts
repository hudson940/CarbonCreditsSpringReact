import { RoughCanvas } from "roughjs/bin/canvas";
import { Point } from "../models/Point";


export interface Drawable {
    type: string;
    start : Point;
    end: Point;
    draw(canvas:RoughCanvas):void;
}