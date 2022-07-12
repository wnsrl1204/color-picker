import React, { useMemo, useRef } from "react";

const HUE_GRADIENT = ((direction, deg) => {
  const colorList = [];
  for (let i = 0; i < 360; i += deg) {
    colorList.push(`hsl(${i}, 100%, 50%)`);
  }
  colorList.push("hsl(0, 100%, 50%)");

  return `linear-gradient(to ${direction},${colorList.join(",")})`;
})("right", 60);

const ColorPicker = ({ modal, hsla, onColorChange, onClosed }) => {
  const slPicker = useRef();
  const hPicker = useRef();
  const handleOutSideClick = (e) => {
    const className = e.target.className;
    if (modal && className === "color-picker-outer") {
      onClosed();
    } else if (!modal && className === "color-picker-modal") {
      onClosed();
    }
  };

  const outSideStyle = useMemo(() => {
    const isModal = modal ?? true;
    if (isModal)
      return {
        zIndex: "1000",
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
      };
    else
      return {
        zIndex: "1000",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
  }, [modal]);

  const modalStyle = useMemo(
    () => ({
      width: "20vw",
      maxWidth: "400px",
      minWidth: "300px",
      boxSizing: "border-box",
      border: "2px solid gold",
      display: "flex",
      flexDirection: "column",
      borderRadius: "20px",
      padding: "20px",
    }),
    []
  );

  const saturationAndLightnessPickerStyle = useMemo(() => {
    return {
      width: "100%",
      paddingTop: "100%",
      border: "2px solid gold",
      boxSizing: "border-box",
      marginTop: "4%",
      background: `
      linear-gradient(to top, black, rgba(255,255,255,0) 50%, rgba(0,0,0,0) 50%, white),
      linear-gradient(to right, grey , hsl(${hsla[0]},100%,50%))
      `,
    };
  }, [hsla]);

  const huePickerStyle = useMemo(() => {
    return {
      width: "100%",
      marginTop: "20px",
      paddingTop: "5%",
      height: "100%",
      background: HUE_GRADIENT,
    };
  }, [hsla]);

  const handleSaturationAndLightnessChange = (e) => {
    const width = slPicker.current.offsetWidth;
    const height = slPicker.current.offsetHeight;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const saturation = Math.round((x / width) * 100);
    const lightness = Math.round((1 - y / height) * 100);

    const changedHsla = (() => {
      const tempHsla = [...hsla];
      tempHsla[1] = saturation;
      tempHsla[2] = lightness;
      return tempHsla;
    })();

    onColorChange(changedHsla);
  };

  const handleHueChange = (e) => {
    const width = hPicker.current.offsetWidth;
    const x = e.nativeEvent.offsetX;

    const hue = Math.round((x / width) * 360);

    const changedHsla = (() => {
      const tempHsla = [...hsla];
      tempHsla[0] = hue;
      return tempHsla;
    })();

    onColorChange(changedHsla);
  };

  const closeBtnStyle = {
    inline: "none",
    color: "red",
    backgroundColor: "white",
    border: "2px solid black",
    alignSelf: "flex-end",
  };

  return (
    <div
      style={outSideStyle}
      onClick={handleOutSideClick}
      className="color-picker-outer"
    >
      <div style={modalStyle} className="color-picker-modal">
        <button
          style={closeBtnStyle}
          className="color-picker-close-btn"
          onClick={() => {
            onClosed();
          }}
        >
          X
        </button>
        <div
          style={saturationAndLightnessPickerStyle}
          onClick={handleSaturationAndLightnessChange}
          ref={slPicker}
        ></div>
        <div
          style={huePickerStyle}
          onClick={handleHueChange}
          ref={hPicker}
        ></div>
      </div>
    </div>
  );
};

export default ColorPicker;
