#version 100
precision mediump float;

uniform samplerCube uSampler;
uniform mat4 uModelViewMatrix;

varying vec3 outPos;
varying vec3 outNorm;

void main() {
    vec3 worldNormal = normalize(outNorm);
    vec3 eyeToSurfaceDir = normalize(outPos - vec3(0.0, 0.0, 0.0));
    vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
 
    gl_FragColor = textureCube(uSampler, direction);
    
    
    // gl_FragColor = textureCube(uSampler, outTexCoord);
}