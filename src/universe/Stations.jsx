/* eslint-disable react-hooks/immutability -- uniforms/refs are mutated in useFrame (R3F pattern) */
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Planet, OrbitRing } from "./Bodies";
import { STATIONS, PROJECT_POSITIONS, PROJECT_RADII } from "./layout";
import { SKILLS, PROJECTS } from "../data/content";
import { galaxyVert, galaxyFrag, portalVert, portalFrag } from "./shaders";

/** Hides a station when the camera is far away: cleaner shots and fewer draw calls. */
export function Cull({ center, radius = 70, overview = false, children }) {
  const g = useRef();
  const c = useMemo(() => new THREE.Vector3(...center), [center]);
  useFrame(({ camera }) => { if (g.current) g.current.visible = overview || camera.position.distanceTo(c) < radius; });
  return <group ref={g}>{children}</group>;
}

function glowTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const ctx = c.getContext("2d"), g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.18, "rgba(170,200,255,0.55)"); g.addColorStop(1, "rgba(80,110,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/* ── Home ─────────────────────────────────────────────── */
export function HomeWorld({ quality, motion, onSelect, accent }) {
  const moon = useRef();
  useFrame((_, dt) => { if (moon.current) moon.current.rotation.y += dt * 0.18 * motion; });
  return (
    <group position={STATIONS.home.pos}>
      <Planet radius={2.6} colors={["#070d2b", "#2144c4", "#6fd9ff"]} glow="#4aa8ff" seed={2.3} cloud={0.55} spin={0.035}
        quality={quality} motion={motion} onClick={() => onSelect("home")}>
        <OrbitRing inner={3.5} outer={4.6} color={accent} rotation={[Math.PI / 2.2, 0.15, 0.35]} />
      </Planet>
      <group ref={moon} rotation={[0.25, 0, 0.1]}>
        <Planet position={[5.6, 0.4, 0]} radius={0.38} colors={["#1c2040", "#6b78b8", "#d4dcff"]} glow="#9db4ff" seed={9} spin={0.05}
          atmosphere={false} quality={quality} motion={motion} />
      </group>
    </group>
  );
}

/* ── About ────────────────────────────────────────────── */
export function AboutWorld({ quality, motion, onSelect }) {
  return (
    <Planet position={STATIONS.about.pos} radius={2.1} colors={["#150a38", "#5a2bc8", "#c4a3ff"]} glow="#9b6bff" seed={5.7}
      spin={0.05} quality={quality} motion={motion} onClick={() => onSelect("about")}>
      <OrbitRing inner={2.9} outer={3.15} color="#b79bff" rotation={[1.2, 0.3, 0.9]} />
    </Planet>
  );
}

/* ── Skills galaxy ────────────────────────────────────── */
export function SkillsWorld({ quality, motion, activeSkill, onSkill }) {
  const root = useRef(), arms = useRef();
  const glow = useMemo(() => glowTexture(), []);
  useEffect(() => () => glow.dispose(), [glow]);

  const geo = useMemo(() => {
    const n = quality.galaxy, pos = new Float32Array(n * 3), col = new Float32Array(n * 3), sz = new Float32Array(n);
    const inner = new THREE.Color("#bfe9ff"), mid = new THREE.Color("#5b7bff"), outer = new THREE.Color("#8b4dff");
    let s = 5; const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < n; i++) {
      const d = Math.pow(r(), 0.7) * 10.5, arm = (i % 3) * ((Math.PI * 2) / 3), a = arm + d * 0.55 + (r() - 0.5) * (0.5 + d * 0.06);
      pos.set([Math.cos(a) * d + (r() - 0.5) * 0.5, (r() - 0.5) * 0.35 * (1.2 - d / 12), Math.sin(a) * d + (r() - 0.5) * 0.5], i * 3);
      const c = d < 4 ? inner.clone().lerp(mid, d / 4) : mid.clone().lerp(outer, (d - 4) / 6.5);
      col.set([c.r, c.g, c.b], i * 3); sz[i] = 30 + r() * 80;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("aColor", new THREE.BufferAttribute(col, 3)); g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    return g;
  }, [quality.galaxy]);
  const u = useMemo(() => ({ uScale: { value: 1 } }), []);

  const pivots = useRef([]);
  useFrame((_, dt) => {
    if (arms.current) arms.current.rotation.y += dt * 0.03 * motion;
    pivots.current.forEach((p, i) => { if (p) p.rotation.y += dt * (0.32 - i * 0.045) * motion; });
  });

  const orbit = (i) => 3 + i * 1.7;
  const hues = [["#0a1a3a", "#2f7bff", "#9be7ff"], ["#1b0f45", "#6a3bff", "#d1b8ff"], ["#04283a", "#12a3d4", "#b8f6ff"], ["#151a4a", "#4457e8", "#b5c0ff"], ["#240a42", "#9a3fd6", "#efc7ff"]];

  return (
    <group ref={root} position={STATIONS.skills.pos} rotation={[-1.0, 0, 0.18]}>
      <group ref={arms}>
        <points geometry={geo} frustumCulled={false} raycast={() => null}>
          <shaderMaterial vertexShader={galaxyVert} fragmentShader={galaxyFrag} uniforms={u} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
      </group>
      <sprite scale={[7, 7, 1]} raycast={() => null}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
      </sprite>
      {SKILLS.map((cat, i) => (
        <group key={cat.id}>
          <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
            <torusGeometry args={[orbit(i), 0.012, 6, 128]} />
            <meshBasicMaterial color={activeSkill === cat.id ? "#9ec4ff" : "#4a5fb0"} transparent opacity={activeSkill === cat.id ? 0.7 : 0.28} />
          </mesh>
          <group ref={(el) => (pivots.current[i] = el)} rotation={[0, i * 1.3, 0]}>
            <Planet position={[orbit(i), 0, 0]} radius={0.5} colors={hues[i]} glow={hues[i][1]} seed={i * 3 + 1} bands={i % 2 === 1}
              spin={0.2} quality={quality} motion={motion} active={activeSkill === cat.id} onClick={() => onSkill(cat.id)} />
          </group>
        </group>
      ))}
    </group>
  );
}

/* ── Projects ─────────────────────────────────────────── */
const PROJECT_LOOKS = [
  [["#06102e", "#1f50d8", "#79e0ff"], "#4aa8ff", false],
  [["#140a38", "#5a2bd0", "#d0b4ff"], "#9b6bff", true],
  [["#03222e", "#0f9ac0", "#b9f7ff"], "#33d0f0", false],
  [["#0d1040", "#3c4fe0", "#aab8ff"], "#6f86ff", true],
  [["#071b3a", "#2a86e8", "#cfeaff"], "#58b4ff", false],
  [["#22083c", "#8a37d0", "#f0c8ff"], "#c27bff", true],
  [["#0b1a30", "#46688f", "#d5e4f5"], "#8fb1d8", false],
  [["#04142c", "#1d6fe0", "#7ff0ff"], "#3fc4ff", true],
  [["#1a0c44", "#6a45ee", "#bfd0ff"], "#8f84ff", false],
];

export function ProjectsWorld({ quality, motion, activeProject, onProject }) {
  return (
    <>
      {PROJECTS.map((p, i) => (
        <Planet key={p.id} position={PROJECT_POSITIONS[i]} radius={PROJECT_RADII[i]} colors={PROJECT_LOOKS[i][0]} glow={PROJECT_LOOKS[i][1]}
          seed={i * 4.1 + 0.7} bands={PROJECT_LOOKS[i][2]} spin={0.06 + (i % 3) * 0.02} quality={quality} motion={motion}
          active={activeProject === i} shrink={activeProject != null && activeProject !== i} onClick={() => onProject(i)} />
      ))}
    </>
  );
}

/* ── Journey station ──────────────────────────────────── */
export function JourneyWorld({ motion, activeNode, count = 3 }) {
  const ring = useRef(), ring2 = useRef();
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.z += dt * 0.12 * motion;
    if (ring2.current) ring2.current.rotation.z -= dt * 0.2 * motion;
  });
  const metal = { color: "#8fa4e8", metalness: 0.85, roughness: 0.32 };
  return (
    <group position={STATIONS.journey.pos} rotation={[0.55, 0.35, 0.1]}>
      <mesh><cylinderGeometry args={[0.28, 0.28, 3.4, 20]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh><sphereGeometry args={[0.7, 32, 32]} /><meshStandardMaterial color="#c8d6ff" emissive="#4e7cff" emissiveIntensity={0.9} metalness={0.4} roughness={0.35} /></mesh>
      <group ref={ring}>
        <mesh><torusGeometry args={[3.2, 0.09, 12, 120]} /><meshStandardMaterial {...metal} /></mesh>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]} position={[Math.cos((i / 6) * Math.PI * 2) * 1.9, Math.sin((i / 6) * Math.PI * 2) * 1.9, 0]}>
            <boxGeometry args={[2.5, 0.04, 0.05]} /><meshStandardMaterial {...metal} />
          </mesh>
        ))}
        {Array.from({ length: count }, (_, i) => {
          const a = (i / count) * Math.PI * 2 + 0.5, on = activeNode === i;
          return (
            <mesh key={i} position={[Math.cos(a) * 3.2, Math.sin(a) * 3.2, 0]} scale={on ? 1.8 : 1}>
              <sphereGeometry args={[0.2, 20, 20]} />
              <meshStandardMaterial color="#e6f1ff" emissive={on ? "#6fd9ff" : "#4e7cff"} emissiveIntensity={on ? 2.4 : 1.1} />
            </mesh>
          );
        })}
      </group>
      <group ref={ring2}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.2, 0.03, 8, 100]} /><meshBasicMaterial color="#6fd9ff" transparent opacity={0.55} /></mesh>
      </group>
      <pointLight color="#6a8cff" intensity={40} distance={20} />
    </group>
  );
}

/* ── Contact portal ───────────────────────────────────── */
export function ContactWorld({ motion, accent }) {
  const a = useRef(), b = useRef(), c = useRef();
  const u = useMemo(() => ({ uTime: { value: 0 }, uA: { value: new THREE.Color("#3a63ff") }, uB: { value: new THREE.Color("#9b6bff") } }), []);
  useFrame((_, dt) => {
    u.uTime.value += dt * motion;
    if (a.current) a.current.rotation.z += dt * 0.35 * motion;
    if (b.current) b.current.rotation.x += dt * 0.22 * motion;
    if (c.current) c.current.rotation.y -= dt * 0.28 * motion;
  });
  return (
    <group position={STATIONS.contact.pos}>
      <mesh><circleGeometry args={[2.1, 64]} /><shaderMaterial vertexShader={portalVert} fragmentShader={portalFrag} uniforms={u} transparent depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} /></mesh>
      <mesh ref={a}><torusGeometry args={[2.5, 0.07, 16, 120]} /><meshStandardMaterial color="#aebfff" metalness={0.85} roughness={0.3} emissive={accent} emissiveIntensity={0.25} /></mesh>
      <mesh ref={b}><torusGeometry args={[3.0, 0.025, 8, 120]} /><meshBasicMaterial color="#6fd9ff" transparent opacity={0.6} /></mesh>
      <mesh ref={c}><torusGeometry args={[3.5, 0.02, 8, 120]} /><meshBasicMaterial color="#b79bff" transparent opacity={0.45} /></mesh>
      <pointLight color="#6a8cff" intensity={30} distance={24} />
    </group>
  );
}
