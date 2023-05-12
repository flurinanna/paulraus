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
         <div className="w-screen h-screen modelViewerContainer">
            <model-viewer 
                className="w-screen h-screen"
                ref={(ref) => {
                    modelRef.current = ref;
                }}
                alt="Paul Hackt" src="/paul/4_paulraus.glb" ar auto-rotate rotation-per-second="30deg" shadow-intensity="1" camera-controls touch-action="pan-y">
                  <button slot="ar-button">
                      <div className="btn btn-primary absolute top-0 bottom-0 left-0 right-0 bg-accent">Woohoooooo!</div>
                  </button>

                </model-viewer>
        </div>
    </div>
  );
}