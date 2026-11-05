import { Component, useEffect, useState } from "react";
import { HiOutlineHome, HiOutlineUser, HiOutlineSparkles, HiOutlineSquares2X2, HiOutlineClock, HiOutlineEnvelope, HiOutlineGlobeAlt } from "react-icons/hi2";
import { SECTIONS } from "../data/content";

const ICONS = { home: HiOutlineHome, about: HiOutlineUser, skills: HiOutlineSparkles, projects: HiOutlineSquares2X2, journey: HiOutlineClock, contact: HiOutlineEnvelope };

export class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e) { console.warn("3D universe failed, falling back to classic view:", e); this.props.onError?.(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function Loader({ done }) {
  const [gone, setGone] = useState(false);
  useEffect(() => { if (done) { const t = setTimeout(() => setGone(true), 1100); return () => clearTimeout(t); } }, [done]);
  if (gone) return null;
  return (
    <div className={`uv-loader ${done ? "is-done" : ""}`} role="status" aria-live="polite">
      <div className="uv-loader__orbit" aria-hidden="true"><i /><i /><b /></div>
      <p className="uv-loader__name">Mohamed Omran</p>
      <p className="uv-loader__hint">{done ? "Ready" : "Charting the universe…"}</p>
      <div className="uv-loader__bar" aria-hidden="true"><span /></div>
    </div>
  );
}

export function TopBar({ onHome, onClassic }) {
  return (
    <header className="uv-top">
      <button className="uv-mark" onClick={onHome} aria-label="Mohamed Omran — back to Home planet">OMRAN</button>
      <button className="uv-ghost" onClick={onClassic}><HiOutlineGlobeAlt aria-hidden="true" /> <span>Classic view</span></button>
    </header>
  );
}

export function Dock({ section, overview, onGo, onMap }) {
  return (
    <nav className="uv-dock" aria-label="Universe navigation">
      {SECTIONS.map((s) => {
        const I = ICONS[s.id], on = !overview && section === s.id;
        return (
          <button key={s.id} onClick={() => onGo(s.id)} aria-current={on ? "page" : undefined} className={on ? "is-on" : ""} title={s.world}>
            <I aria-hidden="true" /><span>{s.label}</span>
          </button>
        );
      })}
      <i className="uv-dock__sep" aria-hidden="true" />
      <button onClick={onMap} className={overview ? "is-on" : ""} aria-pressed={overview} title="Zoom out to the whole universe">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2.2" /><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-25 12 12)" /></svg>
        <span>Map</span>
      </button>
    </nav>
  );
}
