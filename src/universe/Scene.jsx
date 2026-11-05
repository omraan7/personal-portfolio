import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Stars, Nebulae, AsteroidBelt } from "./Backdrop";
import { Cull, HomeWorld, AboutWorld, SkillsWorld, ProjectsWorld, JourneyWorld, ContactWorld } from "./Stations";
import CameraRig from "./CameraRig";
import { computePose } from "./pose";
import { STATIONS, LIGHT_DIR } from "./layout";
import { SECTIONS } from "../data/content";

export default function Scene({ state, quality, motion, accent, onSelect, onSkill, onProject, onFirstFrame }) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const pose = useMemo(
    () => computePose({ section: state.section, project: state.project, overview: state.overview, aspect: Math.round(aspect * 20) / 20 }),
    [state.section, state.project, state.overview, aspect],
  );
  const l = LIGHT_DIR.map((v) => v * 80);

  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.32} color="#7b86ff" />
      <directionalLight position={l} intensity={2.4} color="#fff1e2" />

      <Stars quality={quality} motion={motion} />
      <Nebulae quality={quality} />

      <Cull center={STATIONS.home.pos} radius={62} overview={state.overview}><HomeWorld quality={quality} motion={motion} onSelect={onSelect} accent={accent} /></Cull>
      <Cull center={STATIONS.about.pos} radius={62} overview={state.overview}>
        <AboutWorld quality={quality} motion={motion} onSelect={onSelect} />
        <AsteroidBelt center={STATIONS.about.pos} count={quality.asteroids} radius={5.2} motion={motion} />
      </Cull>
      <Cull center={STATIONS.skills.pos} radius={55} overview={state.overview}><SkillsWorld quality={quality} motion={motion} activeSkill={state.skill} onSkill={onSkill} /></Cull>
      <Cull center={STATIONS.projects.pos} radius={60} overview={state.overview}>
        <ProjectsWorld quality={quality} motion={motion} activeProject={state.project} onProject={onProject} />
        <AsteroidBelt center={STATIONS.projects.pos} count={quality.asteroids} radius={11} spread={3} motion={motion} />
      </Cull>
      <Cull center={STATIONS.journey.pos} radius={55} overview={state.overview}><JourneyWorld motion={motion} activeNode={state.journey} /></Cull>
      <Cull center={STATIONS.contact.pos} radius={55} overview={state.overview}>
        <ContactWorld motion={motion} accent={accent} />
        <AsteroidBelt center={STATIONS.contact.pos} count={Math.round(quality.asteroids * 0.6)} radius={7.5} motion={motion} />
      </Cull>

      {state.overview &&
        SECTIONS.map((s) => (
          <Html key={s.id} position={STATIONS[s.id].pos} center zIndexRange={[10, 0]} style={{ pointerEvents: "auto" }}>
            <button className="station-label" onClick={() => onSelect(s.id)} aria-label={`Fly to ${s.world}`}>
              <span>{s.world}</span>
            </button>
          </Html>
        ))}

      <CameraRig pose={pose} motion={motion} mobile={quality.mobile} onSettled={onFirstFrame} />
    </>
  );
}
