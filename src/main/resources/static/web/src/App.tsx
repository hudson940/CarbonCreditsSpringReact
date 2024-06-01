import { ChangeEvent, useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Drawable } from "./drawable/Drawable";
import { Point } from "./models/Point";
import { LineDrawable } from "./drawable/LineDrawable";
import { RectangleDrawable } from "./drawable/RentangleDrawable";
import { CircleDrawable } from "./drawable/CircleDrawable";

function App() {
  const [drawables, setDrawables] = useState<Drawable[]>([]);
  const [drawablesTemp, setDrawablesTemp] = useState<Drawable[]>([]);
  const [startPoint, setStartPoint] = useState<Point>(new Point(0, 0));
  const [isDraw, setDraw] = useState<boolean>(false);
  const [image, setImage] = useState<HTMLImageElement>();

  const getStartPoint = (start: Point) => {
    if (!isDraw) {
      setStartPoint(start);
      setDraw(true);
    }
    if (isDraw) {
      setDraw(false);
      setDrawables([...drawablesTemp]);
    }
  };

  const drawLine = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const line = new LineDrawable(startPoint, endPoint);
    setDrawablesTemp([...drawables, line]);
  };

  const drawRentangle = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const rentangle = new RectangleDrawable(startPoint, endPoint);
    setDrawablesTemp([rentangle]);
  };

  const drawCircle = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const circle = new CircleDrawable(
      startPoint,
      calculateDistance(endPoint, startPoint)
    );
    setDrawablesTemp([...drawables, circle]);
  };

  const calculateDistance = (point1: Point, point2: Point): number => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files[0]) {
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => {
        setImage(image!);
      };
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <Board
        figures={isDraw ? drawablesTemp : drawables}
        click={getStartPoint}
        mouseMove={drawCircle}
        isDraw={isDraw}
        image={image}
      />
      <section
        style={{
          backgroundColor: "white",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <h2>Menu</h2>
        <div>
          <h4>Cargar Imagen</h4>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div>
          <h4>Selcionar Tipo de Area</h4>
          <select
            name="area-type"
            id="area-type"
            onChange={() => {}}
          >
            <option value="evaluada">Evaluada</option>
            <option value="bosque-nativo">Bosque Nativo</option>
          </select>
        </div>
        <div>
          <h4>Selecionar Figura</h4>
          <select
            name="area-type"
            id="area-type"
            onChange={() => {}}
          >
            <option value="evaluada">Circulo</option>
            <option value="bosque-nativo">Rentangulo</option>
          </select>
        </div>
      </section>
    </div>
  );
}

export default App;
