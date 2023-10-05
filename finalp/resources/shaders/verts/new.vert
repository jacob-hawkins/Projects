#version 300 es

in vec3 aVertexPosition;
in vec3 aBarycentricCoord;
in vec3 aVertexNormal;

out vec3 outColor;
out vec3 outBary;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
  outColor = normalize(aVertexNormal);
  outBary = aBarycentricCoord;
}