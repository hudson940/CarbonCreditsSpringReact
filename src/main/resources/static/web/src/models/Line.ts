import { Point } from "./Point";
import { Shape } from "./Shape";

export class Line extends Shape{
    end:Point;
    constructor(start:Point, end:Point) {
        super(start)
       this.end = end; 
    }

    public length():number{
        const x=Math.pow((this.end.x-this.start.x), 2);
        const y=Math.pow((this.end.y-this.start.y), 2);
        return Math.sqrt(x+y);
    }
}