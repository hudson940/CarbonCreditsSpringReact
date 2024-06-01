import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable } from "./Drawable";
import { Point } from "../models/Point";

export class RectangleDrawable implements Drawable {
    start: Point;
    end: Point;
  
  
  constructor(start: Point, end: Point) {
     this.start = start;
     this.end = end;
  }
  draw(canvas: RoughCanvas): void {
    canvas.rectangle(
      this.start.x,
      this.start.y,
      this.end.x - this.start.x,
      this.end.y - this.start.y
    );
  }
}
