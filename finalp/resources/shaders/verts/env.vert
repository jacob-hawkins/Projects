#version 100
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
 
varying vec3 outPos;
varying vec3 outNorm;
 
void main() {
    outPos = (uModelViewMatrix * vec4(aVertexPosition, 0.1)).xyz;
    outNorm = aVertexNormal;
    
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}