import React, { useState } from 'react';
import MindARViewer from './mindar-viewer';
import MindARThreeViewer from './mindar-three-viewer';
import ModelViewer from './ModelViewer';

export default function ARPage({children}) {
    const [started, setStarted] = useState("aframe");

    return (
      <div className="App">

        <div className="control-buttons">
          {started === null && <button onClick={() => {setStarted('aframe')}}>Start AFRAME version</button>}
          {started === null && <button onClick={() => {setStarted('three')}}>Start ThreeJS version</button>}
          {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
        </div>
  
        {started === 'aframe' && (
          <div className="container">
            <MindARViewer/>
            <video></video>
          </div>
        )}

      </div>
    );
}