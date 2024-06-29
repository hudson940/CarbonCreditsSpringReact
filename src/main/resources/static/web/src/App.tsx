import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Drawable } from "./drawable/Drawable";
import { Point } from "./models/Point";
import { RectangleDrawable } from "./drawable/RentangleDrawable";
import { CircleDrawable } from "./drawable/CircleDrawable";
import { EvaluationService } from "./services/EvaluationService";
import { Evaluation } from "./models/Evaluation";


type DrawableType = "line" | "rectangle" | "circle";

function App() {



  const [drawables, setDrawables] = useState<Drawable[]>([]);
  const [drawablesTemp, setDrawablesTemp] = useState<Drawable[]>([]);
  const [startPoint, setStartPoint] = useState<Point>(new Point(0, 0));
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [image, setImage] = useState<HTMLImageElement>();
  const [selectFigure, setFigureSelect] = useState("line")
  const drawType = useRef<DrawableType>("line");
  const [color, setColor] = useState("none");
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation>(new Evaluation(0,'',[],[],0,0,0))

  const evaluationService = new EvaluationService()

  const getStartPoint = (start: Point) => {
    if (!image) {
      alert("Cargue una imagen")
      return;
    }
    if (color == "none") {
      alert("Selcione un tipo de area")
      return;
    }
    if (drawType.current == "line") {
      alert("Selcione una figura")
      return;
    }
    if (!isDraw) {
      setStartPoint(start);
      setIsDraw(true);
    }
    if (isDraw) {
      setIsDraw(false);
    }

  };

  const mouseUp = () => {
    if (isDraw && drawablesTemp.length) {
      setDrawables([...drawablesTemp]);
      addArea(drawablesTemp[drawablesTemp.length-1], color)
      setDrawablesTemp([])
      save()
    }
    
  }



  const drawRentangle = (endPoint: Point) => {
    if (!isDraw) {
      return;
    }
    const rectangle = new RectangleDrawable(startPoint, endPoint, color);
    
    setDrawablesTemp([...drawables, rectangle]);
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

  const addArea = (figure: Drawable, type_area:string): void => {
    if (type_area == 'red') {
      currentEvaluation.evaluated_areas.push(figure)
    }
    else if (type_area == 'green') {
      currentEvaluation.native_forest_areas.push(figure)
    }
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
  function handleJsonUpload(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {

        const textFromFileLoaded = fileLoadedEvent.target?.result as string;
        const jsonData = JSON.parse(textFromFileLoaded)
        const newEvaluation = Evaluation.from_json(jsonData)
        setEvaluation(newEvaluation)
      };
      fileReader.readAsText(event.target.files[0], "UTF-8");

    }
  }

  function setEvaluation(evaluation: Evaluation) {
    setCurrentEvaluation(evaluation)
    setDrawables([])
    setDrawables(evaluation.get_all_areas())
    const image = new Image();
    image.src = evaluation.image_path;
    image.onload = () => {
      setImage(image!);
    };
  }

  function save() {
    evaluationService.save_evaluation(currentEvaluation).then((e)=>{
      console.log('evaluation saved')
    })
  }

  function exportJson() {
    //const evaluationService = new EvaluationService()
    evaluationService.save_evaluation(currentEvaluation)
    evaluationService.fetch_evaluation_blob(currentEvaluation.id)
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `evaluation.json`,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });

  }

  const setDrawFigure = (type: DrawableType) => {
    drawType.current = type
    setFigureSelect(type)
  }

  const mouseMove = (endPoint: Point) => {
    if (drawType.current == "circle") {
      drawCircle(endPoint);
    }
    if (drawType.current == "rectangle") {
      drawRentangle(endPoint);
    }
    if (drawType.current == "line") {
      return;
    }

  }
  useEffect(() => {
    if (drawables.length == 0) {
      //const evaluationService = new EvaluationService()
      if (currentEvaluation.id) {
        evaluationService.fetch_evaluation(currentEvaluation.id).then(evaluation => {
          setEvaluation(evaluation)
        })
      }

    }

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
        color: "black",
      }}
    >
      <Board
        figures={isDraw ? drawablesTemp : drawables}
        click={getStartPoint}
        mouseMove={mouseMove}
        mouseUp={mouseUp}
        isDraw={isDraw}
        image={image}

      />
      <section
        style={{
          backgroundColor: "white",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2>Menu</h2>
        <div>
          <h4>Cargar JSON</h4>
          <input type="file" onChange={handleJsonUpload} />
        </div>
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
          <h4>Exportar JSON</h4>
          <button onClick={() => exportJson()}>Exportar</button>
        </div>
        <div>
          <h4>Guardar</h4>
          <button onClick={() => save()}>Guardar</button>
        </div>
        <div>
          <h4>Borrar Figuras</h4>
          <button onClick={() => setDrawables([])}>Borrar</button>
        </div>



      </section>
    </div>
  );
}

export default App;
