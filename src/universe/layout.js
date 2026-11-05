import { PROJECTS } from "../data/content";

/** World-space anchors of every station. The camera always travels −z, like a slow voyage out. */
export const STATIONS = {
  home: { pos: [0, 0, 0], dist: 9.5, r: 2.6 },
  about: { pos: [20, 4, -26], dist: 8, r: 2.1 },
  skills: { pos: [-22, -2, -54], dist: 16, r: 1, nx: 0.5 },
  projects: { pos: [16, -3, -86], dist: 17, r: 1 },
  journey: { pos: [-16, 5, -118], dist: 12, r: 1 },
  contact: { pos: [4, 0, -148], dist: 10, r: 2.2 },
  overview: { pos: [0, 4, -70], dist: 118, r: 1 },
};

/** Project planets sit on a loose helix around the constellation centre. */
export const PROJECT_POSITIONS = PROJECTS.map((_, i) => {
  const [cx, cy, cz] = STATIONS.projects.pos;
  const a = (i / PROJECTS.length) * Math.PI * 2 + 0.4;
  const ring = i % 2 === 0 ? 6.2 : 4.2;
  return [cx + Math.cos(a) * ring * 1.25, cy + Math.sin(a) * ring * 0.62 + ((i % 3) - 1) * 0.9, cz + Math.sin(a) * 3.2 - ((i % 3) - 1) * 1.2];
});

export const PROJECT_RADII = PROJECTS.map((_, i) => 0.78 + ((i * 37) % 5) * 0.07);

export const LIGHT_DIR = [-0.55, 0.45, 0.7];
