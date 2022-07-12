import React, { useMemo, useState } from "react";
import ColorPicker from "./components/ColorPicker";

export default (onClosed = () => {}, modal = false) => {
  const [hslaColor, setHslaColor] = useState([0, 0, 0, 1]);
  const hsla = useMemo(
    () =>
      `hsla(${hslaColor[0]},${hslaColor[1]}%,${hslaColor[2]}%,${hslaColor[3]})`,
    [hslaColor]
  );

  const handleColorChange = (hsla) => {
    setHslaColor(hsla);
  };

  return [
    hsla,
    () => (
      <ColorPicker
        modal={modal}
        hsla={hslaColor}
        onColorChange={handleColorChange}
        onClosed={onClosed}
      />
    ),
  ];
};
