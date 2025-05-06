varying vec3 csm_vPositionW;
varying vec2 vUv;

void main() {
  csm_vPositionW = (modelMatrix * vec4(position, 1.0)).xyz;
  vUv = uv;
}