import React, { useEffect, useState } from "react";
import useColorPicker from "./useColorPicker";

const App = () => {
  const [color, Picker] = useColorPicker(() => {
    setOpen(false);
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(color);
  }, [color]);

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        모달 열기
      </button>
      {open && <Picker />}
      <div
        style={{ width: "100px", height: "100px", backgroundColor: color }}
      ></div>
    </div>
  );
};

export default App;
