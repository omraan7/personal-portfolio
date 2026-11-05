import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
/* eslint-disable react-hooks/immutability -- mutating camera/refs inside useFrame is the R3F render-loop pattern */

export default function CameraRig({ pose, motion, mobile, onSettled }) {
  const { camera, size } = useThree();
  const cur = useRef(null);
  const settled = useRef(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => { settled.current = false; }, [pose]);

  useFrame((state, dt) => {
    dt = Math.min(dt, 0.05);
    if (!cur.current) {
      // Cinematic intro: start far back and glide in.
      cur.current = { pos: pose.pos.clone().add(new THREE.Vector3(0, 3, motion ? 38 : 0)), look: pose.look.clone(), fov: pose.fov };
    }
    const c = cur.current, k = motion ? 1.35 : 60;
    const f = 1 - Math.exp(-k * dt), fl = 1 - Math.exp(-k * 1.7 * dt);
    const before = tmp.copy(c.pos);
    c.pos.lerp(pose.pos, f); c.look.lerp(pose.look, fl);
    const speed = before.distanceTo(c.pos) / Math.max(dt, 1e-4);
    c.fov = THREE.MathUtils.damp(c.fov, pose.fov + (motion ? Math.min(speed * 0.06, 9) : 0), 4, dt);

    const amp = motion ? (mobile ? 0.12 : 0.55) : 0;
    const px = state.pointer.x * amp, py = state.pointer.y * amp * 0.6;
    camera.position.set(c.pos.x + px, c.pos.y + py, c.pos.z);
    camera.lookAt(c.look);
    if (Math.abs(camera.fov - c.fov) > 0.01) { camera.fov = c.fov; camera.updateProjectionMatrix(); }

    if (!settled.current && c.pos.distanceTo(pose.pos) < 0.08 * Math.max(1, pose.pos.distanceTo(pose.look) / 10)) {
      settled.current = true; onSettled?.();
    }
  });
  void size;
  return null;
}
