varying vec3 csm_vPositionW;

uniform float uTime;


void main() {
    vec3 baseColor = csm_DiffuseColor.rgb;
    csm_DiffuseColor = vec4(baseColor, 1.0);
}