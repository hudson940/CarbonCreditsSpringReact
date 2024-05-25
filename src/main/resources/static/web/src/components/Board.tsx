import { useEffect, useRef } from "react"

import rough from 'roughjs';
import { LineDrawable } from "../drawable/LineDrawable";
import { Point } from "../models/Point";


export const Board = () => {


    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        ctx.current = ctx
        const g = rough.canvas(canvas)
        const line = new LineDrawable(new Point(2,100), new Point(4,400))
        line.draw(g)
    })

    return (
        <canvas ref={canvasRef}></canvas>
    )
}