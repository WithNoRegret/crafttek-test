import { ColorType } from "./color";
import { ShapeType } from "./shape";

export interface Figure {
  id: string;
  width: number;
  type: ShapeType;
  bgColor: ColorType;
  borderColor: ColorType;
  x: number;
  y: number;
  html: string;
  text: string;
}

export interface EditableFigure {
  width: number;
  type: ShapeType;
  bgColor: ColorType;
  borderColor: ColorType;
}