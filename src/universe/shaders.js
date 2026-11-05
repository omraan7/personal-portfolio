const NOISE = /* glsl */ `
float hash(vec3 p){ p = fract(p*0.3183099+.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float vnoise(vec3 x){
  vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x), mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x), mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p){ float a=.5,s=0.; for(int i=0;i<OCT;i++){ s+=a*vnoise(p); p=p*2.03+vec3(1.7,9.2,3.1); a*=.5; } return s; }
`;

export const planetVert = /* glsl */ `
varying vec3 vObj; varying vec3 vN; varying vec3 vW;
void main(){
  vObj = normalize(position);
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position,1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

export const planetFrag = /* glsl */ `
precision highp float;
varying vec3 vObj; varying vec3 vN; varying vec3 vW;
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform vec3 uGlow;
uniform vec3 uLight; uniform float uSeed; uniform float uBands; uniform float uTime; uniform float uCloud;
${NOISE}
void main(){
  vec3 p = vObj * 2.2 + uSeed;
  float n = fbm(p + fbm(p * 1.3) * 0.6);
  if (uBands > 0.5) {
    float lat = vObj.y * 7.0 + n * 2.4 + sin(vObj.y*21.0 + uSeed)*0.15;
    n = 0.5 + 0.5 * sin(lat * 3.14159);
    n = mix(n, fbm(p*2.0), 0.35);
  }
  vec3 col = mix(uA, uB, smoothstep(0.30, 0.55, n));
  col = mix(col, uC, smoothstep(0.58, 0.78, n));
  if (uCloud > 0.0) {
    float c = fbm(vObj*3.4 + vec3(uTime*0.01, uSeed, 0.0));
    col = mix(col, vec3(0.92,0.96,1.0), smoothstep(0.52,0.78,c) * uCloud);
  }
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  float ndl = dot(N, normalize(uLight));
  float lit = smoothstep(-0.12, 0.45, ndl);
  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  vec3 ambient = col * 0.07 + uGlow * 0.02;
  vec3 c = ambient + col * lit * 1.05 + uGlow * rim * (0.25 + 0.75*lit);
  float spec = pow(max(dot(reflect(-normalize(uLight), N), V), 0.0), 28.0) * 0.08 * lit;
  gl_FragColor = vec4(c + spec, 1.0);
  #include <colorspace_fragment>
}`;

export const atmoVert = /* glsl */ `
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`;

export const atmoFrag = /* glsl */ `
precision highp float;
varying vec3 vN; varying vec3 vW;
uniform vec3 uColor; uniform vec3 uLight; uniform float uPower;
void main(){
  vec3 V = normalize(cameraPosition - vW);
  float f = pow(clamp(-dot(normalize(vN), V) / 0.5, 0.0, 1.0), uPower);
  float lit = 0.35 + 0.65 * smoothstep(-0.4, 0.6, dot(normalize(vN), normalize(uLight)));
  gl_FragColor = vec4(uColor, f * lit * 1.5);
  #include <colorspace_fragment>
}`;

export const starVert = /* glsl */ `
attribute float aSize; attribute vec3 aColor; attribute float aPhase;
uniform float uTime; uniform float uScale; uniform float uMotion;
varying vec3 vC; varying float vT;
void main(){
  vC = aColor;
  vT = 0.75 + 0.25 * sin(uTime * 1.4 * uMotion + aPhase);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_PointSize = clamp(aSize * uScale / -mv.z, 1.0, 5.5);
  gl_Position = projectionMatrix * mv;
}`;

export const starFrag = /* glsl */ `
precision highp float;
varying vec3 vC; varying float vT;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vC, a * a * vT);
  #include <colorspace_fragment>
}`;

export const galaxyVert = /* glsl */ `
attribute float aSize; attribute vec3 aColor;
uniform float uScale; varying vec3 vC;
void main(){
  vC = aColor;
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_PointSize = clamp(aSize * uScale / -mv.z, 1.0, 9.0);
  gl_Position = projectionMatrix * mv;
}`;

export const galaxyFrag = /* glsl */ `
precision highp float;
varying vec3 vC;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vC, a * a * 0.9);
  #include <colorspace_fragment>
}`;

export const portalFrag = /* glsl */ `
precision highp float;
varying vec2 vUv; uniform float uTime; uniform vec3 uA; uniform vec3 uB;
void main(){
  vec2 p = vUv - 0.5; float r = length(p) * 2.0; float a = atan(p.y, p.x);
  float swirl = sin(a * 5.0 + r * 9.0 - uTime * 1.2) * 0.5 + 0.5;
  float swirl2 = sin(a * 3.0 - r * 14.0 + uTime * 0.8) * 0.5 + 0.5;
  float edge = smoothstep(1.0, 0.82, r) * smoothstep(0.0, 0.25, r);
  vec3 c = mix(uA, uB, swirl) * (0.35 + 0.65 * swirl2);
  float core = exp(-r * 3.2);
  gl_FragColor = vec4(c * edge + vec3(0.7,0.9,1.0) * core * 0.7, (edge * 0.75 + core) );
  #include <colorspace_fragment>
}`;

export const portalVert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;

export { NOISE };
