import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Drawable } from "./drawable/Drawable";
import { Point } from "./models/Point";
import { RectangleDrawable } from "./drawable/RentangleDrawable";
import { CircleDrawable } from "./drawable/CircleDrawable";
import { EvaluationService } from "./services/EvaluationService";


type DrawableType = "line" | "rectangle" | "circle";

function App() {
  
 
  
  const [drawables, setDrawables] = useState<Drawable[]>([]);
  const [drawablesTemp, setDrawablesTemp] = useState<Drawable[]>([]);
  const [startPoint, setStartPoint] = useState<Point>(new Point(0, 0));
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [image, setImage] = useState<HTMLImageElement>();
  const [selectFigure,setFigureSelect] = useState("line")
  const drawType = useRef<DrawableType> ("line");
  const [color , setColor] = useState("none");


  const getStartPoint = (start: Point) => {
    if(!image){
      alert("Cargue una imagen")
      return;
    }
    if(color == "none"){
      alert("Selcione un tipo de area")
      return;
    }
    if(drawType.current == "line"){
      alert("Selcione una figura")
      return;
    }
    if (!isDraw) {
      setStartPoint(start);
      setIsDraw(true);
    }
    if (isDraw) {
      setIsDraw(false);
      setDrawables([...drawablesTemp]);
      setFigureSelect("line")
      drawType.current =  "line"
    }
  };

  

  const drawRentangle = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const rentangle = new RectangleDrawable(startPoint, endPoint,color);
    setDrawablesTemp([...drawables,rentangle]);
  };

  const drawCircle = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const circle = new CircleDrawable(
      startPoint,
      calculateDistance(endPoint, startPoint),
      color
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


  const setDrawFigure = (type: DrawableType) => {
    drawType.current = type
    setFigureSelect(type)
  }

  const mouseMove = (endPoint: Point) => {
    if(drawType.current == "circle"){
      drawCircle(endPoint);
    }
    if(drawType.current == "rectangle"){
      drawRentangle(endPoint);
    }
    if(drawType.current == "line"){
      return;
    }
    
  }
  useEffect(() => {
    const evaluationService = new EvaluationService()
    const evaluation = evaluationService.fetch_evaluation(1)

  }, [])
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
        mouseMove={mouseMove}
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
            onChange={(event) => setColor(event.target.value)}
          >
            <option value="none">Selecione</option>
            <option value="red">Evaluada</option>
            <option value="green">Bosque Nativo</option>
          </select>
        </div>
        <div>
          <h4>Selecionar Figura</h4>
          <select
            name="area-type"
            id="area-type"
            value={selectFigure}
            onChange={(event) => setDrawFigure(event.target.value as DrawableType)}
          >
            <option value="line">Selecione</option>
            <option value="circle">Circulo</option>
            <option value="rectangle">Rentangulo</option>
          </select>
        </div>
        <div>
          <h4>Borrar Figuras</h4>
          <button  onClick={() => setDrawables([])}>Borrar</button>
        </div>
      </section>
    </div>
  );
}

export default App;
