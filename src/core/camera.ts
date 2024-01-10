import { PerspectiveCamera } from 'three'
import { scene, sizes } from './renderer'
import { gui } from './gui'

const VERTICAL_FIELD_OF_VIEW = 45 // degrees 45 is the normal
const ASPECT_RATIO = sizes.width / sizes.height

let cameraPosition = {
  x: 7,
  y: 2,
  z: 0,
}
const cameraControls = gui.addFolder({
  title: 'Camera',
  expanded: false,
})
cameraControls.addBinding(cameraPosition, 'x', { min: -10, max: 10, step: 0.1 }).on('change', () => { camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z) })
cameraControls.addBinding(cameraPosition, 'y', { min: -10, max: 10, step: 0.1 }).on('change', () => { camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z) })
cameraControls.addBinding(cameraPosition, 'z', { min: -10, max: 10, step: 0.1 }).on('change', () => { camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z) })

export const camera = new PerspectiveCamera(VERTICAL_FIELD_OF_VIEW, ASPECT_RATIO)

camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
})

scene.add(camera)

export default camera
