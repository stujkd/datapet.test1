import * as THREE from "https://unpkg.com/three@0.150.1/build/three.module.js";
import { VRButton } from "https://unpkg.com/three@0.150.1/examples/jsm/webxr/VRButton.js";
import { GLTFLoader } from "https://unpkg.com/three@0.150.1/examples/jsm/loaders/GLTFLoader.js";

// シーン
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// カメラ
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.6, 3);

// レンダラー
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// ライト
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

// テスト用ボックス（glbがなくても確認できる）
const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1.5, -1);
scene.add(cube);

// glb 読み込み（model.glb を同階層に置く）
const loader = new GLTFLoader();
loader.load(
  "./model.glb",
  (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 1.4, -1);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

// VR開始（ユーザー操作トリガー）
document.getElementById("enterVR").addEventListener("click", () => {
  document.body.appendChild(VRButton.createButton(renderer));
  document.getElementById("enterVR").style.display = "none";
});

// 描画ループ
renderer.setAnimationLoop(() => {
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});

// リサイズ対応
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
