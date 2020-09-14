import React, { useRef, useEffect, useState } from 'react';

const SketchPad = ({ handleSave }) => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 1000;
    canvas.style.width = `${500}px`;
    canvas.style.height = `${500}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const handleSubmit = () => {

    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    handleSave(dataURL);
  }

  return (
    <>
      <canvas
        className="border border-primary"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <button
        className="container btn btn-success"
        onClick={handleSubmit}
      >
        Save
        </button>
      {/* <img 
            className="container border border-primary"
            src={ saved }
        /> */}
    </>
  );
};

export default SketchPad;