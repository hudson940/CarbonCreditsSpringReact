import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Drawable } from "./drawable/Drawable";
import { Point } from "./models/Point";
import { LineDrawable } from "./drawable/LineDrawable";
import { RectangleDrawable } from "./drawable/RentangleDrawable";

function App() {
  const [drawables, setDrawables] = useState<Drawable[]>([]);
  const [drawablesTemp, setDrawablesTemp] = useState<Drawable[]>([]);
  const [startPoint, setStartPoint] = useState<Point>(new Point(0, 0));
  const [isDraw, setDraw] = useState<boolean>(false);

  const getStartPoint = (start: Point) => {
    if (!isDraw) {
      setStartPoint(start);
      setDraw(true);
    }
    if (isDraw) {
      setDraw(false);
      setDrawables([...drawablesTemp,  ...drawables, ...drawablesTemp]);
    }
  };

  const drawLine = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const line = new LineDrawable(startPoint, endPoint);
    setDrawablesTemp([line]);
  };

  const drawRentangle = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const rentangle = new RectangleDrawable(startPoint, endPoint);
    setDrawablesTemp([rentangle]);
  };

  return (
    <>
      <Board
        figures={isDraw ? drawablesTemp : drawables}
        click={getStartPoint}
        mouseMove={drawRentangle}
        isDraw={isDraw}
      />
    </>
  );
}

export default App;
