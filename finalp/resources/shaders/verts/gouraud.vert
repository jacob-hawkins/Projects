#version 100

// constants
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// input
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
 
// output
varying vec4 v_Color;

void main()
{
    vec3 u_LightPos = vec3(0.0, 0.0, 0.0);
    vec4 a_Color = vec4(1.0, 1.0, 1.0, 1.0);

    // Transform the vertex into eye space.
    vec3 modelViewVertex = vec3(uModelViewMatrix * aVertexPosition);
 
    // Transform the normal's orientation into eye space.
    vec3 modelViewNormal = vec3(uModelViewMatrix * vec4(aVertexNormal, 0.0));
 
    // Will be used for attenuation.
    float distance = length(u_LightPos - modelViewVertex);
 
    // Get a lighting direction vector from the light to the vertex.
    vec3 lightVector = normalize(u_LightPos - modelViewVertex);
 
    // Calculate the dot product of the light vector and vertex normal. If the normal and light vector are pointing in the same direction then it will get max illumination.
    float diffuse = max(dot(modelViewNormal, lightVector), 0.1);
 
    // Attenuate the light based on distance.
    diffuse = diffuse * (1.0 / (1.0 + (0.25 * distance * distance)));
 
    // Multiply the color by the illumination level. It will be interpolated across the triangle.
    v_Color = a_Color * diffuse;
 
    // gl_Position is a special variable used to store the final position.
    // Multiply the vertex by the matrix to get the final point in normalized screen coordinates.
    gl_Position = uProjectionMatrix * aVertexPosition;
}