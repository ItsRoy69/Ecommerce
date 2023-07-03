import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    decals: ['react', 'three2', 'pmndrs'],
    color: '#EFBD4E',
    decal: 'three2'
  })

const ThreeDModelViewer = ({ glbSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(glbSrc, (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = 1.5 / maxDim;
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
      model.position.sub(center.multiplyScalar(scaleFactor));
    });

    // Set up initial camera position and renderer settings
    camera.position.z = 2;
    renderer.setSize(100, 100);

    // Render the model
    renderer.render(scene, camera);
  }, [glbSrc]);

  return <canvas ref={canvasRef} />;
};

export default ThreeDModelViewer;
