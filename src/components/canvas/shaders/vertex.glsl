varying vec3 csm_vPositionW;

void main() {
  csm_vPositionW = (modelMatrix * vec4(position, 1.0)).xyz;
}