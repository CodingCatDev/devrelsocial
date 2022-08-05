import { Dispatch, SetStateAction, useState } from "react";
import { RgbaColorPicker } from "react-colorful";

export interface ColorPickerType {
  setColor: Dispatch<
    SetStateAction<{ r: number; g: number; b: number; a: number }>
  >;
  color: { r: number; g: number; b: number; a: number };
  colorPicker: () => JSX.Element;
}

export const useColorPicker = () => {
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 });

  const colorPicker = () => {
    return (
      <>
        <RgbaColorPicker color={color} onChange={setColor} />
      </>
    );
  };

  return { setColor, color, colorPicker };
};
