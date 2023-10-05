#version 100
precision mediump float;

uniform sampler2D uSampler;
uniform vec3 uLightPos;
uniform float uFogNear;
uniform float uFogFar;
uniform vec4 uFogColor;

varying vec4 outColor;
varying vec3 outPos;
varying vec3 outNorm;
varying vec2 outTexCoord;
varying float v_fogDepth;

void main() {
    if (texture2D(uSampler, outTexCoord).a < 0.1) { 
        discard;
    }
    
    vec3 viewPos = vec3(0.0, 0.0, 0.0);

    vec4 mat_specular = vec4(1.0, 1.0, 1.0, 1.0);
    float mat_shininess = 100.0;

    float distance = length(uLightPos - outPos);
    vec3 lightVector = normalize(uLightPos - outPos);

    // diffuse
    float diff = (max(dot(outNorm, lightVector), 0.0)) * 0.75;
    diff = diff * (5.0 / (1.0 + (0.25 * distance * distance)));

    // specular
    vec3 viewDir = normalize(viewPos - outPos);
    vec3 reflectDir = reflect(-lightVector, outNorm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), (mat_shininess / (5.0 / (1.0 + (0.25 * distance)))));
    vec4 specular = outColor * (spec * mat_specular); 

    float fogAmount = smoothstep(uFogNear, uFogFar, v_fogDepth);

    vec4 color = texture2D(uSampler, outTexCoord) + (texture2D(uSampler, outTexCoord) * diff) + specular;
    gl_FragColor = mix(color, uFogColor, fogAmount);
}