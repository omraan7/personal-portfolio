/* eslint-disable react-hooks/immutability -- uniforms/refs are mutated in useFrame (R3F pattern) */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LIGHT_DIR } from "./layout";
import { planetVert, planetFrag, atmoVert, atmoFrag } from "./shaders";

const L = new THREE.Vector3(...LIGHT_DIR).normalize();

/** Procedural planet: fbm surface, terminator lighting, fresnel rim, optional clouds, additive atmosphere. */
export function Planet({
  position = [0, 0, 0], radius = 1, colors, glow = "#4aa8ff", seed = 1, bands = false, cloud = 0,
  spin = 0.04, atmosphere = true, quality, motion = 1, onClick, onHover, active = false, shrink = false, children, label,
}) {
  const mesh = useRef();
  const group = useRef();
  const uniforms = useMemo(() => ({
    uA: { value: new THREE.Color(colors[0]) }, uB: { value: new THREE.Color(colors[1]) }, uC: { value: new THREE.Color(colors[2]) },
    uGlow: { value: new THREE.Color(glow) }, uLight: { value: L }, uSeed: { value: seed },
    uBands: { value: bands ? 1 : 0 }, uTime: { value: 0 }, uCloud: { value: cloud },
  }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const atmo = useMemo(() => ({
    uColor: { value: new THREE.Color(glow) }, uLight: { value: L }, uPower: { value: 2.2 },
  }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const seg = quality.mobile ? 40 : 72;

  useFrame((_, dt) => {
    if (mesh.current) mesh.current.rotation.y += spin * dt * motion;
    uniforms.uTime.value += dt * motion;
    if (group.current) {
      const s = THREE.MathUtils.damp(group.current.scale.x, shrink ? 0.4 : active ? 1.08 : 1, 5, dt);
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group position={position} ref={group}>
      <mesh
        ref={mesh}
        onClick={onClick ? (e) => { e.stopPropagation(); onClick(); } : undefined}
        onPointerOver={onClick ? (e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; onHover?.(true); } : undefined}
        onPointerOut={onClick ? () => { document.body.style.cursor = ""; onHover?.(false); } : undefined}
      >
        <sphereGeometry args={[radius, seg, seg]} />
        <shaderMaterial vertexShader={planetVert} fragmentShader={planetFrag} uniforms={uniforms} defines={{ OCT: quality.oct }} />
      </mesh>
      {atmosphere && (
        <mesh scale={1.14} raycast={() => null}>
          <sphereGeometry args={[radius, 48, 48]} />
          <shaderMaterial
            vertexShader={atmoVert} fragmentShader={atmoFrag} uniforms={atmo}
            side={THREE.BackSide} transparent depthWrite={false} blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
      {label}
      {children}
    </group>
  );
}

const ringFrag = /* glsl */ `
precision highp float;
varying vec3 vP; uniform vec3 uColor; uniform float uIn; uniform float uOut;
void main(){
  float r = (length(vP.xy) - uIn) / (uOut - uIn);
  float bands = 0.55 + 0.45 * sin(r * 38.0) * sin(r * 11.0 + 1.3);
  float a = smoothstep(0.0, 0.08, r) * smoothstep(1.0, 0.85, r) * bands * 0.55;
  gl_FragColor = vec4(uColor, a);
  #include <colorspace_fragment>
}`;
const ringVert = /* glsl */ `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;

export function OrbitRing({ inner, outer, color = "#7aa8ff", rotation = [Math.PI / 2.3, 0, 0.25] }) {
  const u = useMemo(() => ({ uColor: { value: new THREE.Color(color) }, uIn: { value: inner }, uOut: { value: outer } }), [color, inner, outer]);
  return (
    <mesh rotation={rotation} raycast={() => null}>
      <ringGeometry args={[inner, outer, 160, 1]} />
      <shaderMaterial vertexShader={ringVert} fragmentShader={ringFrag} uniforms={u} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}
