import React, { useState } from 'react';
import MindARViewer from './mindar-viewer.js';
import MindARThreeViewer from './mindar-three-viewer.js';
import ModelViewer from './ModelViewer.js';

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
            <video></video>
            <MindARViewer/>

          </div>
        )}

      </div>
    );
}