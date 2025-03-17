import { HtmlText } from "@components/htmlText/HtmlText";
import { TextEditor } from "@components/TextEditor/TextEditor";
import type { EditorEvents } from '@tiptap/react';
import Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Group } from "react-konva";
import { Html } from "react-konva-utils";

import type { ColorType } from "@/types/color";
import type { Figure } from "@/types/figure";
import type { ShapeType } from "@/types/shape";
import type { ToolType } from "@/types/tool";

import s from './shape.module.scss'

export interface ShapeProps {
  figure: Figure;
  stageRef: React.LegacyRef<Konva.Stage>;
  tool: ToolType;
}

export const Shape = ({ figure, tool }: ShapeProps) => {
  const { x, y, width, id, text, type, bgColor, borderColor } = figure;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const groupRef = useRef<Konva.Group | null>(null);
  const htmlRef = useRef<HTMLDivElement | null>(null);

  const renderImage = async (
    type: ShapeType = 'square',
    width: number = 40,
    bgColor: ColorType = { r: 255, g: 255, b: 255},
    borderColor: ColorType = { r: 0, g: 0, b: 0}
  ) => {

    let konvaShape;
    switch (type) {
      case 'square':
        konvaShape = new Konva.Rect({
          width: width,
          height: width,
          fill: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
          stroke: `rgb(${borderColor.r}, ${borderColor.g}, ${borderColor.b})`,
          strokeWidth: 2,
        });
        break;
  
      case 'triangle':
        konvaShape = new Konva.RegularPolygon({
          sides: 3,
          radius: Math.min(width, width) / 2,
          fill: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
          stroke: `rgb(${borderColor.r}, ${borderColor.g}, ${borderColor.b})`,
          strokeWidth: 2,
          offset: {
            x: - Math.min(width, width) / 2,
            y: - Math.min(width, width) / 2,
          },
        });
        break;
  
      case 'circle':
        konvaShape = new Konva.Circle({
          radius: Math.min(width, width) / 2,
          fill: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
          stroke: `rgb(${borderColor.r}, ${borderColor.g}, ${borderColor.b})`,
          strokeWidth: 2,
          offset: {
            x: - Math.min(width, width) / 2,
            y: - Math.min(width, width) / 2,
          },
        });
        break;
  
      default:
        throw new Error(`Unknown shape: ${type}`);
    }
  
    groupRef.current?.add(konvaShape);
  };

  useEffect(() => {
    renderImage(type, width, bgColor, borderColor);
  }, [type, width, bgColor, borderColor]);

  const handleInput = (props: EditorEvents["update"]) => {
      const textContent = props.editor.getHTML();
      setValue(textContent);
  };

  const handleClick = () => {
    if(tool === 'cursor' && isEditing === false) {
      setIsEditing(true);
    }
  }

  return (
    <>
      <Group x={x} y={y} ref={groupRef} onClick={handleClick} draggable>
        {isEditing ? (
          <Html>
            <TextEditor content={value} onUpdate={handleInput} setIsEditing={setIsEditing} />
          </Html>
        ) : (
        <Html>
          <HtmlText ref={htmlRef} html={value} id={id} className={s.text} />
        </Html>
        )}
      </Group>
    </>
  );
};