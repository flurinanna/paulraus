import React, { useEffect, useRef, useState } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js'
import ModelViewer from './ModelViewer';

export default () => {
  const sceneRef = useRef(null);
  const [arFound, setArFound] = useState(false);

  useEffect(() => {
    if(sceneRef.current) {   
      const sceneEl = sceneRef.current;
      const arSystem = sceneEl.systems["mindar-image-system"];
      
      const exampleTarget = document.querySelector('#example-target');
      console.log("adding event to ", exampleTarget);
      exampleTarget.addEventListener("targetFound", event => {
          console.log("target found");
          setArFound(true);
      });

      if(arSystem) {
        sceneEl.addEventListener('renderstart', () => {
          console.log("yooooo");
          arSystem.start(); // start AR           
        });
        

        return () => {
          arSystem.stop();
        }
      }
    }
  }, [sceneRef.current]);

  return arFound ? 
      <ModelViewer/>
      : <a-scene ref={(ref) => {
      sceneRef.current = ref;
    }} mindar-image="imageTargetSrc: /paul/paulklee_bw.mind;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        <a-asset-item id="avatarModel" src="/paul/4_paulraus.glb"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      <a-entity mindar-image-target="targetIndex: 0" id="example-target">
        <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
        <a-gltf-model rotation="0 0 0 " position="0 0 0.1" scale="1 1 1" src="#avatarModel" animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"/>
      </a-entity>
    </a-scene>
  
}