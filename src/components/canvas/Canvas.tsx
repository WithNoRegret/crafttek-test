import { Shape } from "@components/shape/Shape";
import Konva from "konva";
import type { Vector2d } from "konva/lib/types";
import React, { useState } from "react";
import { Layer, Stage } from "react-konva";

import type { EditableFigure, Figure } from "@/types/figure";
import type { ToolType } from "@/types/tool";

import s from './canvas.module.scss';

export interface CanvasProps {
  tool: ToolType;
  stageRef: React.LegacyRef<Konva.Stage>;
  figureParams: EditableFigure;
}

const Canvas = ({ tool, stageRef, figureParams }: CanvasProps) => {
  const [figures, setFigures] = useState<Figure[]>([]);

  const handleOnClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool === "cursor") return;
    const stage = e.target.getStage() as Konva.Stage;
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition() as Vector2d;
    setFigures((prev: Figure[]) => [
      ...prev,
      {
        id: Date.now().toString(36),
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: "",
        text: "",
        ...figureParams
      }
    ]);
  };

  return (
    <div className={s.canvas}>
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable={tool === "cursor"}
            onClick={handleOnClick}
            ref={stageRef}
            className={s.stage}
        >
            <Layer>
                {figures.map((figure: Figure, i: number) => {
                    return <Shape key={i} figure={figure} stageRef={stageRef} tool={tool} />;
                })}
            </Layer>
        </Stage>
    </div>
  );
};

export default Canvas;
