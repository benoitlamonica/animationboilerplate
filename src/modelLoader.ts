import { GLTFLoader, FBXLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export async function loadModelGlb(path: string, onProgress?: (progress: ProgressEvent) => void) {
  return new Promise<THREE.Group<THREE.Object3DEventMap>>((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(`models/${path}`, function (gltf) {
      resolve(gltf.scene);
    }, function(progress) {
      onProgress?.(progress);
    }, function (error) {
      reject(error);
    });
  });
}

export async function loadModelFbx(path: string, onProgress?: (progress: ProgressEvent) => void) {
  return new Promise<THREE.Group<THREE.Object3DEventMap>>((resolve, reject) => {
    const loader = new FBXLoader();
    loader.load(`models/${path}`, function (fbx) {
      resolve(fbx);
    }, function(progress) {
      onProgress?.(progress);
    }, function (error) {
      reject(error);
    });
  });
}