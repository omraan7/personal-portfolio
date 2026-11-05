import * as THREE from "three";
import { STATIONS, PROJECT_POSITIONS, PROJECT_RADII } from "./layout";

export const BASE_FOV = 50;

/** Where the camera should sit for a given state. The subject is pushed to the side (or the top on portrait screens) so the 2D panel gets clear space. */
export function computePose({ section, project, overview, aspect }) {
  if (overview) {
    const wide = aspect < 0.9;
    return { pos: new THREE.Vector3(wide ? 70 : 50, wide ? 62 : 36, wide ? 40 : 24), look: new THREE.Vector3(-2, 0, -72), fov: wide ? 62 : 50 };
  }
  const portrait = aspect < 0.95;
  let center, dist;
  if (section === "projects" && project != null) {
    center = new THREE.Vector3(...PROJECT_POSITIONS[project]);
    dist = 3.4 + PROJECT_RADII[project] * 2.4;
  } else {
    const st = STATIONS[section];
    center = new THREE.Vector3(...st.pos);
    dist = st.dist * (portrait ? 1.25 : 1);
    if (section === "projects") dist *= portrait ? 1.25 : 1;
  }
  const halfH = Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2)) * dist, halfW = halfH * aspect;
  const nx = portrait ? 0 : (STATIONS[section]?.nx ?? 0.38), ny = portrait ? 0.46 : 0;
  const look = center.clone().add(new THREE.Vector3(-nx * halfW, -ny * halfH, 0));
  const pos = look.clone().add(new THREE.Vector3(0, dist * 0.035, dist));
  return { pos, look, fov: BASE_FOV };
}

