import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { starVert, starFrag } from "./shaders";

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

const PALETTE = [[1, 1, 1], [0.7, 0.82, 1], [0.78, 0.7, 1], [0.6, 0.9, 1], [1, 0.95, 0.88]];

/** Two layers: a deep shell that follows the camera, and a long field along the flight path for real parallax. */
export function Stars({ quality, motion }) {
  const deep = useRef();
  const field = useRef();
  const make = (count, seed, spread, size) => {
    const r = rng(seed);
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3), sz = new Float32Array(count), ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = spread.x(r); pos[i * 3 + 1] = spread.y(r); pos[i * 3 + 2] = spread.z(r);
      const c = PALETTE[Math.floor(r() * PALETTE.length)];
      const b = 0.55 + r() * 0.45;
      col.set([c[0] * b, c[1] * b, c[2] * b], i * 3);
      sz[i] = size * (0.4 + Math.pow(r(), 3) * 1.8); ph[i] = r() * 6.28;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(ph, 1));
    return g;
  };
  const deepGeo = useMemo(() => {
    const g = make(quality.stars, 7, { x: () => 0, y: () => 0, z: () => 0 }, 70);
    const r = rng(11), p = g.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) {
      const u = r() * 2 - 1, t = r() * Math.PI * 2, s = Math.sqrt(1 - u * u), R = 300;
      p[i] = Math.cos(t) * s * R; p[i + 1] = u * R; p[i + 2] = Math.sin(t) * s * R;
    }
    return g;
  }, [quality.stars]);
  const fieldGeo = useMemo(() => make(Math.round(quality.stars * 0.45), 23,
    { x: (r) => (r() - 0.5) * 140, y: (r) => (r() - 0.5) * 90, z: (r) => 40 - r() * 230 }, 55), [quality.stars]);

  const mats = useMemo(() => [0, 1].map(() => ({ uTime: { value: 0 }, uScale: { value: 300 }, uMotion: { value: 1 } })), []);
  useFrame(({ camera, clock }) => {
    mats.forEach((u) => { u.uTime.value = clock.elapsedTime; u.uMotion.value = motion; });
    if (deep.current) deep.current.position.copy(camera.position);
  });
  return (
    <>
      <points ref={deep} geometry={deepGeo} frustumCulled={false}>
        <shaderMaterial vertexShader={starVert} fragmentShader={starFrag} uniforms={mats[0]} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={field} geometry={fieldGeo} frustumCulled={false}>
        <shaderMaterial vertexShader={starVert} fragmentShader={starFrag} uniforms={mats[1]} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}

function nebulaTexture(seed, tints) {
  const size = 512, c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d"), r = rng(seed);
  for (let i = 0; i < 26; i++) {
    const x = size * (0.2 + r() * 0.6), y = size * (0.2 + r() * 0.6), rad = size * (0.12 + r() * 0.3);
    const t = tints[Math.floor(r() * tints.length)];
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, `rgba(${t},${0.1 + r() * 0.12})`); g.addColorStop(1, `rgba(${t},0)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
  }
  const mask = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size / 2);
  mask.addColorStop(0, "rgba(0,0,0,0)"); mask.addColorStop(1, "rgba(0,0,0,1)");
  ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = mask; ctx.fillRect(0, 0, size, size);
  const img = ctx.getImageData(0, 0, size, size), d = img.data;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 0) d[i] = Math.min(255, Math.max(0, d[i] + (r() - 0.5) * 5));
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}

const NEBULAE = [
  { pos: [-40, 18, -30], s: 110, seed: 3, tints: ["88,70,255", "50,120,255"] },
  { pos: [46, -12, -70], s: 130, seed: 9, tints: ["140,70,255", "70,90,255", "40,200,255"] },
  { pos: [-48, 10, -105], s: 120, seed: 14, tints: ["60,110,255", "40,210,255"] },
  { pos: [34, 14, -150], s: 140, seed: 21, tints: ["150,80,255", "80,110,255"] },
  { pos: [0, -24, -190], s: 150, seed: 33, tints: ["90,80,255", "40,180,255"] },
];

export function Nebulae({ quality }) {
  const mobile = quality.mobile;
  const list = mobile ? NEBULAE.slice(0, 3) : NEBULAE;
  const textures = useMemo(() => (mobile ? NEBULAE.slice(0, 3) : NEBULAE).map((n) => nebulaTexture(n.seed, n.tints)), [mobile]);
  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);
  return list.map((n, i) => (
    <sprite key={i} position={n.pos} scale={[n.s, n.s, 1]} raycast={() => null}>
      <spriteMaterial map={textures[i]} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  ));
}

export function AsteroidBelt({ center, count, radius = 9, spread = 2.2, motion }) {
  const group = useRef(), inst = useRef();
  useEffect(() => {
    const r = rng(Math.round(center[2]) + 99), m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2, d = radius + (r() - 0.5) * spread * 2;
      p.set(Math.cos(a) * d, (r() - 0.5) * spread * 1.2, Math.sin(a) * d * 0.55);
      e.set(r() * 6, r() * 6, r() * 6); q.setFromEuler(e);
      const k = 0.06 + Math.pow(r(), 2.2) * 0.3; s.set(k * (0.8 + r() * 0.6), k, k * (0.8 + r() * 0.6));
      m.compose(p, q, s); inst.current.setMatrixAt(i, m);
    }
    inst.current.instanceMatrix.needsUpdate = true;
  }, [center, count, radius, spread]);
  useFrame((_, dt) => { if (group.current) group.current.rotation.y += dt * 0.02 * motion; });
  return (
    <group ref={group} position={center} rotation={[0.18, 0, 0.1]}>
      <instancedMesh ref={inst} args={[undefined, undefined, count]} raycast={() => null}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#59607e" roughness={0.95} metalness={0.1} flatShading />
      </instancedMesh>
    </group>
  );
}
