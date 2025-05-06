varying vec3 csm_vPositionW;
varying vec2 vUv;

uniform float iTime;
uniform float iTimeDelta;
uniform vec2 iResolution;
uniform vec3 iMouse;

mat2 rotate2D(float r) {
    return mat2(cos(r), sin(r), -sin(r), cos(r));
}

// based on the follow tweet:
// https://twitter.com/zozuar/status/1621229990267310081
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;
    vec3 col = vec3(0);
    float t = iTime;
    
    vec2 n = vec2(0);
    vec2 q = vec2(0);
    vec2 p = uv;
    float d = dot(p,p);
    float S = 12.;
    float a = 0.0;
    mat2 m = rotate2D(5.);

    for (float j = 0.; j < 20.; j++) {
        p *= m;
        n *= m;
        q = p * S + t * 4. + sin(t * 4. - d * 6.) * .8 + j + n; // wtf???
        a += dot(cos(q)/S, vec2(.2));
        n -= sin(q);
        S *= 1.2;
    }

    col = vec3(4, 2, 1) * (a + .2) + a + a - d;
    
    
    // Output to screen
    fragColor = vec4(col,1.0);
}
void main() {
  vec2 fragCoord = vUv *  iResolution;
  mainImage(csm_FragColor, fragCoord);
}