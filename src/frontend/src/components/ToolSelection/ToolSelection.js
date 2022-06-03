import React, { useState } from 'react';
import { SketchPicker } from 'react-color'
import './ToolSelection.css';


const ToolSelection = () => {
  const [show, setShow] = useState(false);
  return(
    <>
      <button id='Button' onClick={() => setShow(prev => !prev)}>Colour</button>
      {show && ColourPicker()}
    </>
  );
}

function ColourPicker() {
    return (
        <div className = "ColourPicker">
            <SketchPicker></SketchPicker>
        </div>
    );
}

export default ToolSelection