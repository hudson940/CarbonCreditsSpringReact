import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable } from "./Drawable";
import { Point } from "../models/Point";
import { Rectangle } from "./../models/Rectangle";
export class RectangleDrawable extends Rectangle implements Drawable {
    start: Point;
    end: Point;
    color: string
    type: string = 'Rectangle';
  
  constructor(start: Point, end: Point,color:string) {
     super(start,end)
     this.start = start;
     this.end = end;
     this.color = color;
  }

  draw(canvas: RoughCanvas): void {
    canvas.rectangle(
      this.start.x,
      this.start.y,
      this.end.x - this.start.x,
      this.end.y - this.start.y,
      {stroke: this.color}
    );
  }
}
