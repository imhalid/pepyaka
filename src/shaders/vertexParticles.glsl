uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vNormal;


void main() {

    vec3 newPosition = position;

    newPosition.y += .2 * (sin((uTime * 2.) + 10. * newPosition.y) * .5 + .5);
    newPosition.y -= .1 * (sin((uTime * 1.) + 10. * newPosition.y) * .5 + .5);
    newPosition.z += .05 * (cos(uTime + 10. * newPosition.y ) * .2 + .5);
        
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0 );
    gl_PointSize = 1.0 * ( 20.0 / -mvPosition.z );
    vNormal = normal;
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;
}
