import "./App.scss";

import { useRef, useState } from "react";

import Canvas from "./components/canvas/Canvas";
import Control from "./components/control/Control";
import { EditableFigure } from "./types/figure";
import { ToolType } from "./types/tool";

function App() {
  const [tool, setTool] = useState<ToolType>("cursor");
  const stageRef = useRef(null);

  const [figureParams, setFigureParams] = useState<EditableFigure>({
    width: 100,
    type: "square",
    bgColor: { r: 255, g: 255, b: 255},
    borderColor: { r: 0, g: 0, b: 0},
  });
  return (
    <>
      <Canvas tool={tool} stageRef={stageRef} figureParams={figureParams} />
      <Control tool={tool} setTool={setTool} figureParams={figureParams} setFigureParams={setFigureParams} />
    </>
  );
}

export default App;
