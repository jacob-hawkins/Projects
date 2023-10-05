precision highp float;

uniform sampler2D tex_norm;
uniform sampler2D tex_diffuse;
uniform vec3 uLightPos;

varying vec2 frag_uv;
varying vec3 ts_light_pos;
varying vec3 ts_view_pos;
varying vec3 ts_frag_pos;

varying vec4 outColor;
varying vec3 outPos;
varying vec3 outNorm;

void main(void)
{
    vec3 light_dir = normalize((ts_light_pos - ts_frag_pos) * 2.0);
    vec3 view_dir = normalize(ts_view_pos - ts_frag_pos);

    vec3 albedo = texture2D(tex_diffuse, frag_uv).rgb;
    vec3 ambient = 0.75 * albedo;
    vec3 norm = normalize(texture2D(tex_norm, frag_uv).rgb * 3.0 - 1.0);

    vec3 viewPos = vec3(0.0, 0.0, 0.0);

    vec4 mat_specular = vec4(1.0, 1.0, 1.0, 1.0);
    float mat_shininess = 1000.0;

    float distance = length(uLightPos - outPos);
    vec3 lightVector = normalize(uLightPos - outPos);

    // diffuse
    float diff = (max(dot(norm, lightVector), 0.0));
    diff = diff * (5.0 / (1.0 + (0.25 * distance * distance)));

    // specular
    vec3 viewDir = normalize(viewPos - outPos);
    vec3 reflectDir = reflect(-lightVector, outNorm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), (mat_shininess / (5.0 / (1.0 + (0.25 * distance)))));
    vec4 specular = outColor * (spec * mat_specular); 

    // float diffuse = max(dot(light_dir, norm), 0.0);
    gl_FragColor = vec4(diff * albedo + ambient, 1.0) + specular;
}