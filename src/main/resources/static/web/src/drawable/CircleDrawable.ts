import { RoughCanvas } from "roughjs/bin/canvas";
import { Point } from "../models/Point";
import { Drawable } from "./Drawable";
import { Circle } from "../models/Circle";

export class CircleDrawable extends Circle implements Drawable {

  type: string = 'Circle';
  color: string;
  end: Point;

  constructor(id: number | undefined, start: Point, radius: number,color: string) {
    super(id, start, radius);
    this.color = color;
    this.end = new Point(0,0)
  }

  draw(canvas: RoughCanvas): void {
    canvas.circle(this.start.x, this.start.y, this.radio, { stroke: this.color });
  }
}
