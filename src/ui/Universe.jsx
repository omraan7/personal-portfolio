import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider, useTheme } from "../compnants/ThemeContext/ThemeContext";
import ThemeSwitcher from "../compnants/ThemeSwitcher/ThemeSwitcher";
import { LayoutInner } from "../compnants/Layout/Layout";
import { SECTIONS, PROJECTS } from "../data/content";
import { Boundary, Dock, Loader, TopBar } from "./Chrome";
import { AboutPane, ContactPane, HomePane, JourneyPane, ProjectsPane, SkillsPane } from "./Panels";
import "./universe.css";

const UniverseCanvas = lazy(() => import("../universe/UniverseCanvas"));
const IDS = SECTIONS.map((s) => s.id);

const hasWebGL = () => {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
};
function useMedia(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => { const mq = window.matchMedia(q), f = () => setM(mq.matches); mq.addEventListener("change", f); return () => mq.removeEventListener("change", f); }, [q]);
  return m;
}
/** #map · #about · #projects · #projects/movie-app — the URL hash is the single source of truth. */
function parseHash() {
  const [a, b] = decodeURIComponent(window.location.hash.slice(1)).split("/");
  if (a === "map") return { section: "home", project: null, overview: true };
  if (!IDS.includes(a)) return { section: "home", project: null, overview: false };
  const pi = a === "projects" ? PROJECTS.findIndex((p) => p.id === b) : -1;
  return { section: a, project: pi >= 0 ? pi : null, overview: false };
}
const go = (h) => { if (window.location.hash !== `#${h}`) window.location.hash = h; };

function Inner() {
  const { theme, THEMES } = useTheme();
  const accent = (THEMES.find((t) => t.id === theme) || THEMES[0]).accent;
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [route, setRoute] = useState(parseHash);
  const [skill, setSkill] = useState(null);
  const [node, setNode] = useState(null);
  const [ready, setReady] = useState(false);
  const [webgl] = useState(hasWebGL);
  const [classic, setClassic] = useState(() => !hasWebGL() || localStorage.getItem("portfolio-view") === "classic");
  const [lost, setLost] = useState(false);

  useEffect(() => { const f = () => setRoute(parseHash()); window.addEventListener("hashchange", f); return () => window.removeEventListener("hashchange", f); }, []);

  const quality = useMemo(() => {
    const mobile = window.innerWidth < 820 || window.matchMedia("(pointer: coarse)").matches;
    const weak = mobile || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    return { mobile, oct: weak ? 3 : 5, stars: weak ? 1100 : 2600, galaxy: weak ? 3500 : 9000, asteroids: weak ? 22 : 60, dprMax: mobile ? 1.5 : 2 };
  }, []);

  const select = useCallback((id) => go(id), []);
  const openProject = useCallback((i) => go(`projects/${PROJECTS[i].id}`), []);
  const pickSkill = useCallback((id) => { setSkill(id); go("skills"); }, []);
  const toggleView = (c) => { setClassic(c); localStorage.setItem("portfolio-view", c ? "classic" : "3d"); if (!c) setReady(false); };

  useEffect(() => {
    if (classic) return;
    const k = (e) => {
      if (e.target.closest?.("input,textarea,select")) return;
      const i = IDS.indexOf(route.section);
      if (e.key === "Escape") {
        if (route.project != null) go("projects"); else if (!route.overview) go("map"); else go("home");
      } else if (e.key === "ArrowRight" && !e.altKey) go(IDS[Math.min(i + 1, IDS.length - 1)]);
      else if (e.key === "ArrowLeft" && !e.altKey) go(IDS[Math.max(i - 1, 0)]);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [classic, route]);

  useEffect(() => {
    const names = { home: "Front-End Developer", about: "About", skills: "Skills", projects: "Projects", journey: "Journey", contact: "Contact" };
    document.title = route.overview ? "Universe map · Mohamed Omran" : `${names[route.section]} · Mohamed Omran`;
  }, [route]);

  if (classic || lost) {
    return (
      <>
        <LayoutInner />
        {webgl && !lost && (
          <button className="uv-ghost uv-ghost--float" onClick={() => toggleView(false)}>✦ Enter 3D universe</button>
        )}
      </>
    );
  }

  const active = (id) => !route.overview && route.section === id && !(id === "projects" && false);
  const state = { ...route, skill, journey: node };

  return (
    <div className="uv-root" data-section={route.overview ? "map" : route.section} data-detail={route.project != null ? "1" : "0"}>
      <a className="uv-skip" href="#uv-main">Skip to content</a>
      <div className="uv-stage">
        <Boundary onError={() => setLost(true)}>
          <Suspense fallback={null}>
            <UniverseCanvas quality={quality} motion={reduced ? 0 : 1} accent={accent} state={state}
              onSelect={select} onSkill={pickSkill} onProject={openProject} onReady={() => setReady(true)} onContextLost={() => setLost(true)} />
          </Suspense>
        </Boundary>
        <div className="uv-vignette" aria-hidden="true" />
      </div>

      <TopBar onHome={() => go("home")} onClassic={() => toggleView(true)} />
      <main id="uv-main" tabIndex={-1}>
        <HomePane active={active("home")} motion={!reduced} onMap={() => go("map")} />
        <AboutPane active={active("about")} />
        <SkillsPane active={active("skills")} skill={skill} onSkill={setSkill} />
        <ProjectsPane active={active("projects")} index={route.project} onOpen={openProject} onClose={() => go("projects")} />
        <JourneyPane active={active("journey")} node={node} onNode={setNode} />
        <ContactPane active={active("contact")} />
      </main>
      {route.overview && (
        <div className="uv-maptip" role="status">Select a world, or use the dock. <kbd>Esc</kbd> returns home.</div>
      )}
      <Dock section={route.section} overview={route.overview} onGo={select} onMap={() => go(route.overview ? "home" : "map")} />
      <div className="uv-theme"><ThemeSwitcher /></div>
      <Loader done={ready} />
    </div>
  );
}

export default function Universe() {
  return (<ThemeProvider><Inner /></ThemeProvider>);
}
