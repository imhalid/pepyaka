varying vec2 vUv;
varying vec3 vColor;
varying vec3 vNormal;

void main() 
{

    vec3 light = vec3(0., 0., .0);
    // top color is light orange
    vec3 topColor = vec3(1., 1., .547);
    // bottom color is dark blue
    vec3 bottomColor = vec3(.562, .275, .111);
    vec3 lightDirection = normalize(vec3(0., -1., -1.));

    light += dot(lightDirection, vNormal);
    light = mix(topColor,bottomColor, dot(lightDirection, vNormal));

    vec3 mixColorAndLight = mix(vColor, light, 0.5);
  gl_FragColor = vec4(light*vColor, 1.0);

}