import * as THREE from "https://unpkg.com/three@0.150.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js";
import { VRButton } from "https://unpkg.com/three@0.150.1/examples/jsm/webxr/VRButton.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));


const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

// ▼ glb 読み込み
const loader = new GLTFLoader();
loader.load(
  "./model.glb",
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("GLB load error:", error);
  }
);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
