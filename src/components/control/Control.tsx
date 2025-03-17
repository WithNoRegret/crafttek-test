import { ShapeEditForm } from "@components/shapeEditForm/ShapeEditForm";

import type { EditableFigure } from "@/types/figure";
import type { ToolType } from "@/types/tool";

import s from './control.module.scss';

export interface ControlProps {
  tool: ToolType;
  setTool: React.Dispatch<React.SetStateAction<ToolType>>;
  figureParams: EditableFigure;
  setFigureParams: React.Dispatch<React.SetStateAction<EditableFigure>>;
}

const Control = ({ tool, setTool, figureParams, setFigureParams }: ControlProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value as ToolType);
  };

  return (
    <div className={s.control}>
      <div className={s.inputBox}>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === "cursor"}
          onChange={handleOnChange}
          className={s.input}
        />
        <label htmlFor="cursor" className={s.label}>Взаимодействие</label>
      </div>

      <div className={s.inputBox}>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === "shape"}
          onChange={handleOnChange}
          className={s.input}
        />
        <label htmlFor="shape" className={s.label}>Добавление</label>
      </div>
      <ShapeEditForm figureParams={figureParams} setFigureParams={setFigureParams} />
    </div>
  );
};

export default Control;
