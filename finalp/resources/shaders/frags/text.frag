#version 100
precision mediump float;

varying vec2 outTexCoord;
uniform sampler2D uSampler;

void main() {
    gl_FragColor = texture2D(uSampler, outTexCoord);
}