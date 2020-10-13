import React, { useRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import { CirclePicker } from "react-color";
import "../../App.css";

const SketchPad = ({ word, round, roundInputs, handleSave, players }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [reRender, setReRender] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 1000;
    canvas.style.width = `${500}px`;
    canvas.style.height = `${500}px`;
    canvas.style.background = "white";
    canvas.style.borderRadius = `${1}rem ${1}rem ${1}rem`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 8;
    contextRef.current = context;

    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, 500, 500);
    };
    img.src = reRender;
  }, [round, color, reRender]);

  const handleColor = (color) => {
    setColor(color.hex);
  };

  const startDrawing = ({ nativeEvent }) => {
    if (nativeEvent.type === "mousedown") {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
    if (nativeEvent.type === "touchstart") {
      const { clientX, clientY } = nativeEvent.touches[0];
      const { offsetLeft, offsetTop } = canvasRef.current;
      contextRef.current.beginPath();
      contextRef.current.moveTo(clientX - offsetLeft, clientY - offsetTop);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    setReRender(imageData);
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    if (nativeEvent.type === "mousemove") {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
    if (nativeEvent.type === "touchmove") {
      const { clientX, clientY } = nativeEvent.touches[0];
      const { offsetLeft, offsetTop } = canvasRef.current;
      contextRef.current.lineTo(clientX - offsetLeft, clientY - offsetTop);
      contextRef.current.stroke();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    handleSave(round, imageData);
  };

  return (
    <div className="container-global">
      <div className="container-sketchpad">
        <div className="container-header">
          {round === 1 ? (
            <>
              <h2>{word}</h2>
              <p className="player-word">{players[0]}</p>
            </>
          ) : (
            <>
              <h2>{roundInputs[1]}</h2>
              <p className="player-word">{players[2]}</p>
            </>
          )}
        </div>
        <div className="container-grid-sketchpad">
          <canvas
            className="border border-primary"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={finishDrawing}
            onTouchMove={draw}
            ref={canvasRef}
          />
          <div className="container-sketchpad-buttons">
            <CirclePicker
              className="buttons-colour-pick"
              color={color}
              onChangeComplete={handleColor}
              colors={[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#03a9f4",
                "#00bcd4",
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
                "#ffffff",
                "#000000",
              ]}
              circleSize={60}
            />
            <Button
              buttonClass="pulse button button-sketchpad"
              handleClick={(e) => handleSubmit(e)}
              label="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SketchPad;
