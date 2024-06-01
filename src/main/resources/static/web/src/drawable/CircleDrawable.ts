import { RoughCanvas } from "roughjs/bin/canvas";
import { Point } from "../models/Point";
import { Drawable } from "./Drawable";
import { Circle } from "../models/Circle";

export class CircleDrawable extends Circle implements Drawable {


  color: string;
  constructor(start: Point, radius: number,color: string) {
    super(start, radius);
    this.color = color;
  }

  draw(canvas: RoughCanvas): void {
    canvas.circle(this.start.x, this.start.y, this.radio, { stroke: this.color });
  }
}
