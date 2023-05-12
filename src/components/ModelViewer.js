import React, { useState } from "react";

export default function ModelViewer() {
  const modelRef = React.useRef();

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "environment" 
  };

  return (
    <div onClick={() => {
        //console.log("modelRef", modelRef, modelRef.current.canActivateAR);
        modelRef.current.activateAR();
    }}>
        
         <div className="w-full h-full modelViewerContainer">
            <model-viewer 
                ref={(ref) => {
                    modelRef.current = ref;
                }}
                alt="Paul Hackt" src="/4_paulraus.glb" ar auto-rotate rotation-per-second="30deg" shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
        </div>
    </div>
  );
}