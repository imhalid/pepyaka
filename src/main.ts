import * as THREE from 'three'
import { renderer, scene } from './core/renderer'
import { fpsGraph, gui } from './core/gui'
import camera from './core/camera'
import { controls } from './core/orbit-control'

// Shaders
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import vertexParticlesShader from './shaders/vertexParticles.glsl'
import fragmentParticlesShader from './shaders/fragmentParticles.glsl'


// Objects
const geometry = new THREE.SphereGeometry(1, 448, 448)

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('orange') },
    uFrequency: { value: new THREE.Vector2(10, 5) },
  },
  // wireframe: true,
})

// for golder ratio sphere https://bendwavy.org/pack/pack.htm
const count = 10000;
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
const offset = 2 / count;
const rad = 1.8;
let inc = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < count; i++) {
 let y = i * offset - 1 + (offset / 2);
  let radius = Math.sqrt(1 - y * y);
  let phi = inc * i;
  // Convert spherical coordinates to Cartesian coordinates
  positions[i * 3] = rad * Math.cos(phi) * radius;
  positions[i * 3 + 1] = rad * y;
  positions[i * 3 + 2] = rad * Math.sin(phi) * radius;
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particleObject = {
  particleColor: new THREE.Vector4(0.888, 0.963, 0.958, 0.4),
};

const particleFolder = gui.addFolder({
  title: "Particle",
  expanded: true
})

particleFolder.addBinding(particleObject, "particleColor",{view: "color", step: 0.001})

const particlesShaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexParticlesShader,
  fragmentShader: fragmentParticlesShader,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uParticleColor: {value: particleObject.particleColor}
  },
  // wireframe: true,
  transparent: true,
  blending: THREE.AddOperation,
  depthWrite: false,
  fog: true,
});

const particlesGeometry = new THREE.Points(
  particleGeometry,
  particlesShaderMaterial
);
scene.add(particlesGeometry)
const cube = new THREE.Mesh(geometry, shaderMaterial);
scene.add(cube)

camera.position.z = 5

const clock = new THREE.Clock()

const animate = () => {
  const elapsedTime = clock.getElapsedTime()
  // cube.rotation.y = elapsedTime
  // cube.rotation.x = elapsedTime

  // Update shader uniforms
  console.log(shaderMaterial.uniforms.uTime.value)
  
  fpsGraph.begin()
  
  shaderMaterial.uniforms.uTime.value = elapsedTime
  particlesShaderMaterial.uniforms.uTime.value = elapsedTime

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(animate)
}

animate()
