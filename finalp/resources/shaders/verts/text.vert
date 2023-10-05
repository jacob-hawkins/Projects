#version 100
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aVertexPosition;
// attribute vec3 aVertexNormal;
attribute vec2 aVertexTexCoord;

varying vec2 outTexCoord;

void main() {
    outTexCoord = aVertexTexCoord;

    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}