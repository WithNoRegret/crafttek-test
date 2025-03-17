import { EditableFigure } from '@/types/figure';

import s from './shapeEditForm.module.scss'

export interface ShapeEditFormProps {
  figureParams: EditableFigure;
  setFigureParams: React.Dispatch<React.SetStateAction<EditableFigure>>;
}

export const ShapeEditForm = ({ figureParams, setFigureParams }: ShapeEditFormProps) => {
  const handleChange = (field: string, value: string | number) => {
    const newState = { ...figureParams };

    if (field === 'type') {
      newState.type = value as 'square' | 'triangle' | 'circle';
    } else if (field === 'width') {
      newState[field] = Number(value);
    } else if (field.startsWith('bgColor')) {
      const colorField = field.split('.')[1] as 'r' | 'g' | 'b';
      newState.bgColor[colorField] = Number(value);
    } else if (field.startsWith('borderColor')) {
      const colorField = field.split('.')[1] as 'r' | 'g' | 'b';
      newState.borderColor[colorField] = Number(value);
    }

    setFigureParams(newState);
  };

  return (
    <form className={s.shapeEditForm}>
      <h2>Настройка фигуры:</h2>

      <div className={s.formGroup}>
        <label>Форма</label>
        <div>
          <button 
            type="button"
            onClick={() => handleChange('type', 'square')}
            className={`${s.button} ${figureParams.type === 'square' && s.isActive}`}
          >
            Квадрат
          </button>
          <button 
            type="button" 
            onClick={() => handleChange('type', 'triangle')}
            className={`${s.button} ${figureParams.type === 'triangle' && s.isActive}`}
          >
            Треугольник
          </button>
          <button 
            type="button"
            onClick={() => handleChange('type', 'circle')}
            className={`${s.button} ${figureParams.type === 'circle' && s.isActive}`}
          >
            Круг
          </button>
        </div>
      </div>

      <div className={s.formGroup}>
        <label>Размер</label>
        <div>
          <input
            type="number"
            value={figureParams.width}
            onChange={(e) => {
              handleChange('width', e.target.value);
            }}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label>Заливка (RGB)</label>
        <div className={s.colorPicker}>
          <input
            type="number"
            value={figureParams.bgColor.r}
            onChange={(e) => handleChange('bgColor.r', e.target.value)}
          />
          <input
            type="number"
            value={figureParams.bgColor.g}
            onChange={(e) => handleChange('bgColor.g', e.target.value)}
          />
          <input
            type="number"
            value={figureParams.bgColor.b}
            onChange={(e) => handleChange('bgColor.b', e.target.value)}
          />
          <div
            style={{
              height: '20px',
              width: '20px',
              backgroundColor: `rgb(${figureParams.bgColor.r}, ${figureParams.bgColor.g}, ${figureParams.bgColor.b})`,
              borderRadius: '50%',
              border: '1px solid #000'
            }}
          ></div>
        </div>
      </div>

      <div className={s.formGroup}>
        <label>Граница (RGB)</label>
        <div className={s.colorPicker}>
          <input
            type="number"
            value={figureParams.borderColor.r}
            onChange={(e) => handleChange('borderColor.r', e.target.value)}
          />
          <input
            type="number"
            value={figureParams.borderColor.g}
            onChange={(e) => handleChange('borderColor.g', e.target.value)}
          />
          <input
            type="number"
            value={figureParams.borderColor.b}
            onChange={(e) => handleChange('borderColor.b', e.target.value)}
          />
          <div
            style={{
              height: '20px',
              width: '20px',
              backgroundColor: `rgb(${figureParams.borderColor.r}, ${figureParams.borderColor.g}, ${figureParams.borderColor.b})`,
              borderRadius: '50%',
              border: '1px solid #000'
            }}
          ></div>
        </div>
      </div>
    </form>
  );
}