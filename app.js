import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;
let xrSession;
let model;

init();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera();

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // モデル読み込み
  const loader = new GLTFLoader();
  loader.load('./model.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3);
    model.position.set(0, -0.5, -1); // 目の前に配置
    scene.add(model);
  });

  document.getElementById('enter-ar').addEventListener('click', startAR);
}

async function startAR() {
  if (!navigator.xr) {
    alert('WebXR not supported');
    return;
  }

  xrSession = await navigator.xr.requestSession('immersive-ar', {
    requiredFeatures: ['local-floor'],
    optionalFeatures: ['dom-overlay'],
    domOverlay: { root: document.body }
  });

  renderer.xr.setSession(xrSession);

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
