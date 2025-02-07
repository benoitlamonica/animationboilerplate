import * as THREE from "three";

export type Build = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  model: THREE.Object3D;
};

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows for light effects
renderer.setClearAlpha(0); // Transparent background
document.body.appendChild(renderer.domElement);

export default async function build(
  onProgress?: (progress: ProgressEvent) => void
): Promise<Build> {
  // Use onProgress only when loading large assets
  console.log(onProgress);

  // Scene and Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, // Adjusted field of view to a more typical value
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  // Camera Position
  camera.position.z = 4;

  // Create Model 
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    roughness: 0.5,
    metalness: 0.5,
  });
  const model = new THREE.Mesh(geometry, material);

  model.castShadow = true; // Enable shadows for the model
  model.receiveShadow = true; // Enable shadows for the model

  // Directional Light 1
  const light = new THREE.DirectionalLight(0xffffff, 5); // Increased intensity
  light.position.set(-3, 1, 0);
  light.castShadow = true; // Enable shadows for the light

  // Additional light for the opposite direction
  const light2 = new THREE.DirectionalLight(0xffffff, 5);
  light2.position.set(3, 1, 0);
  light2.castShadow = true;

  // Last light for the front 
  const light3 = new THREE.DirectionalLight(0xffffff, 2);
  light3.position.set(0, -1, 2);

  // Ambient Light
  const ambientLight = new THREE.AmbientLight(0x404040, 5);

  // Optional: Add helper to visualize light position and direction
  const lightHelper = new THREE.DirectionalLightHelper(light, 1);
  scene.add(lightHelper);

  const lightHelper2 = new THREE.DirectionalLightHelper(light2, 1);
  scene.add(lightHelper2);

  const lightHelper3 = new THREE.DirectionalLightHelper(light3, 1);
  scene.add(lightHelper3);

  scene.add(
    model,
    light,
    light2,
    light3,
    ambientLight
  )

  // Render function
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();

  // Resize event listener
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, model };
}
