import { useEffect, useRef } from "react";

import rough from "roughjs";

import { Drawable } from "../drawable/Drawable";
import { Point } from "../models/Point";

interface Props {
  figures: Drawable[];
  isDraw: boolean;
  click: (point: Point) => void;
  mouseMove: (point: Point) => void;
}

export const Board = ({ figures, isDraw, click, mouseMove }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>();

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    click(new Point(event.clientX - rect?.left!, event.clientY - rect?.top!));
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (isDraw) {
      ctx.current?.clearRect(
        0,
        0,
        canvasRef.current?.width!,
        canvasRef.current?.height!
      );
    }

    mouseMove(
      new Point(event.clientX - rect?.left!, event.clientY - rect?.top!)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas?.getContext("2d");
    const rn = rough.canvas(canvas!);
    for (const figure of figures) {
      figure.draw(rn);
    }
  }, [figures]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={1000}
        height={1000}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      ></canvas>
    </>
  );
};
