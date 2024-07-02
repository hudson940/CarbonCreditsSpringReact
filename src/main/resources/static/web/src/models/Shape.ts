import { Point } from "./Point";

export class Shape {
    id: number | undefined;
    start: Point;
    

    constructor(id: number | undefined,start: Point) {
        this.id = id
        this.start = start;
    }
}