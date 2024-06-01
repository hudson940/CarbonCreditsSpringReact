import { RoughCanvas } from "roughjs/bin/canvas";


export interface Drawable {
    draw(canvas:RoughCanvas):void
}