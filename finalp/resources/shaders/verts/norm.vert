precision highp float;

attribute vec3 aVertexPosition;
attribute vec2 aVertexTexCoord;
attribute vec3 aVertexNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uLightPos;

varying vec2 frag_uv;
varying vec3 ts_light_pos;
varying vec3 ts_view_pos;
varying vec3 ts_frag_pos;

varying vec4 outColor;
varying vec2 outTexCoord;
varying vec3 outPos;
varying vec3 outNorm;

void main(void)
{
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);

    ts_frag_pos = vec3(uModelViewMatrix * vec4(aVertexPosition, 1.0));
    ts_light_pos = uLightPos; 
    frag_uv = aVertexTexCoord;

    ts_view_pos = vec3(0.0, 0.0, 0.0);
    ts_frag_pos =  vec3(uModelViewMatrix * vec4(aVertexPosition, 1.0));


    vec4 aColor = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 pos = vec4(aVertexPosition, 1.0);
    vec3 norm = vec3(normalize(aVertexNormal));

    outPos = vec3(uModelViewMatrix * pos);
    outColor = aColor;
    outNorm = vec3(uModelViewMatrix * vec4(norm, 0.0));
    outTexCoord = aVertexTexCoord;
}