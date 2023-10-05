#version 100
precision mediump float;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uWorldViewMatrix;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aVertexTexCoord;

varying vec4 outColor;
varying vec2 outTexCoord;
varying vec3 outPos;
varying vec3 outNorm;
varying float v_fogDepth;

void main() {
    vec4 aColor = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 pos = vec4(aVertexPosition, 1.0);
    vec3 norm = vec3(normalize(aVertexNormal));

    outPos = vec3(uModelViewMatrix * pos);
    outColor = aColor;
    outNorm = vec3(uModelViewMatrix * vec4(norm, 0.0));
    outTexCoord = aVertexTexCoord;

    v_fogDepth = -(uModelViewMatrix * vec4(aVertexPosition, 0.0)).z;

    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}