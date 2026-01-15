import * as THREE from "./three/build/three.module.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";
import { VRButton } from "./three/examples/jsm/webxr/VRButton.js";

// シーン
const scene = new THREE.Scene();

// ★ 背景を透明にする（超重要）
scene.background = null;

// カメラ
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.6, 0);

// レンダラー（alpha:true が超重要）
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// VRボタン
document.body.appendChild(VRButton.createButton(renderer));

// ライト
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

// glb 読み込み
const loader = new GLTFLoader();
loader.load("./model.glb", (gltf) => {
  const model = gltf.scene;
  model.position.set(0, 1.3, -1);
  scene.add(model);
});

// ループ
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});

// リサイズ
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
