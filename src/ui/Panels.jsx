import { useEffect, useState } from "react";
import { PROFILE, SOCIALS, EMAIL, SKILLS, PROJECTS, JOURNEY } from "../data/content";

function Pane({ id, active, children, label }) {
  return (
    <section id={`uv-${id}`} className={`uv-pane uv-pane--${id} ${active ? "is-active" : ""}`} inert={!active} aria-labelledby={`uv-${id}-h`} aria-label={undefined} data-label={label}>
      <div className="uv-pane__scroll">{children}</div>
    </section>
  );
}

const PHRASES = ["Responsive interfaces", "React & Next.js applications", "Clean, maintainable code"];
function Cycler({ motion }) {
  const [i, setI] = useState(0);
  useEffect(() => { if (!motion) return; const t = setInterval(() => setI((n) => (n + 1) % PHRASES.length), 3200); return () => clearInterval(t); }, [motion]);
  return <span key={i} className="uv-cycle" aria-hidden="true">{PHRASES[i]}</span>;
}

function Socials() {
  return (
    <ul className="uv-socials">
      {SOCIALS.map((s) => (
        <li key={s.id}><a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}><i className={`${s.solid ? "fa-solid" : "fa-brands"} ${s.icon}`} aria-hidden="true" /></a></li>
      ))}
    </ul>
  );
}

export function HomePane({ active, motion, onMap }) {
  return (
    <Pane id="home" active={active}>
      <div className="uv-who">
        <img src={PROFILE.heroPhoto} alt="Portrait of Mohamed Omran" width="44" height="44" />
        <span>Cairo, Egypt</span>
      </div>
      <h1 id="uv-home-h" className="uv-name">Mohamed<br />Omran</h1>
      <p className="uv-role">{PROFILE.title}</p>
      <p className="uv-lede">{PROFILE.intro}</p>
      <p className="uv-cycle-row" aria-hidden="true"><Cycler motion={motion} /></p>
      <div className="uv-cta">
        <button className="uv-btn uv-btn--primary" onClick={onMap}>Explore my universe</button>
        <a className="uv-btn" href={PROFILE.cv} target="_blank" rel="noreferrer">Download CV</a>
      </div>
      <Socials />
    </Pane>
  );
}

export function AboutPane({ active }) {
  return (
    <Pane id="about" active={active}>
      <h2 id="uv-about-h" className="uv-h2">The story behind the code</h2>
      <div className="uv-about">
        <figure className="uv-frame"><img src={PROFILE.aboutPhoto} alt="Mohamed Omran" loading="lazy" /></figure>
        <div>
          <p className="uv-body">{PROFILE.story}</p>
          <p className="uv-body uv-quote">{PROFILE.objective}</p>
        </div>
      </div>
      <dl className="uv-traits">
        {PROFILE.traits.map((t) => (<div key={t.title}><dt>{t.title}</dt><dd>{t.desc}</dd></div>))}
      </dl>
      <p className="uv-meta">{PROFILE.stats.map((s) => `${s.value} ${s.label}`).join("  ·  ")}  ·  {PROFILE.languages}</p>
    </Pane>
  );
}

export function SkillsPane({ active, skill, onSkill }) {
  return (
    <Pane id="skills" active={active}>
      <h2 id="uv-skills-h" className="uv-h2">Skills &amp; tools</h2>
      <p className="uv-hint">Pick a moon in the galaxy, or a group below.</p>
      <div className="uv-skill-list">
        {SKILLS.map((c) => (
          <div key={c.id} className={`uv-skill ${skill === c.id ? "is-on" : ""}`}>
            <button onClick={() => onSkill(c.id)} aria-pressed={skill === c.id}>{c.label}<small>{c.items.length}</small></button>
            <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </Pane>
  );
}

export function ProjectsPane({ active, index, onOpen, onClose }) {
  const p = index != null ? PROJECTS[index] : null;
  const go = (d) => onOpen((index + d + PROJECTS.length) % PROJECTS.length);
  return (
    <Pane id="projects" active={active}>
      <h2 id="uv-projects-h" className="uv-h2">{p ? p.name : "Project constellation"}</h2>
      {!p ? (
        <>
          <p className="uv-hint">{PROJECTS.length} projects — choose one to fly there.</p>
          <ol className="uv-plist">
            {PROJECTS.map((q, i) => (
              <li key={q.id}><button onClick={() => onOpen(i)}><span>{q.name}</span><small>{q.tag}</small></button></li>
            ))}
          </ol>
          <a className="uv-link" href="https://github.com/omraan7" target="_blank" rel="noreferrer">View all on GitHub</a>
        </>
      ) : (
        <article className="uv-detail">
          <img src={p.image} alt={`${p.name} project screenshot`} width="1100" height="640" decoding="async" />
          <p className="uv-tag">{p.tag}</p>
          {p.summary && <p className="uv-body">{p.summary}</p>}
          {p.stack && <ul className="uv-chips" aria-label="Technologies used">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>}
          <div className="uv-cta">
            <a className="uv-btn uv-btn--primary" href={p.live} target="_blank" rel="noreferrer">Live demo</a>
            <a className="uv-btn" href={p.git} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="uv-pager">
            <button onClick={onClose}>All projects</button>
            <span><button onClick={() => go(-1)} aria-label="Previous project">←</button><button onClick={() => go(1)} aria-label="Next project">→</button></span>
          </div>
        </article>
      )}
    </Pane>
  );
}

export function JourneyPane({ active, node, onNode }) {
  return (
    <Pane id="journey" active={active}>
      <h2 id="uv-journey-h" className="uv-h2">Journey</h2>
      <ol className="uv-timeline">
        {JOURNEY.map((j, i) => (
          <li key={j.id} className={node === i ? "is-on" : ""} tabIndex={0} onMouseEnter={() => onNode(i)} onFocus={() => onNode(i)}>
            <p className="uv-tag">{j.kind}{j.when ? ` · ${j.when}` : ""}</p>
            <h3>{j.title}</h3>
            <p className="uv-place">{j.place}</p>
            <p className="uv-body">{j.detail}</p>
          </li>
        ))}
      </ol>
    </Pane>
  );
}

export function ContactPane({ active }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { window.location.href = `mailto:${EMAIL}`; }
  };
  return (
    <Pane id="contact" active={active}>
      <h2 id="uv-contact-h" className="uv-h2">Open a channel</h2>
      <a className="uv-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <div className="uv-cta">
        <a className="uv-btn uv-btn--primary" href={`mailto:${EMAIL}`}>Send an email</a>
        <button className="uv-btn" onClick={copy}>{copied ? "Copied ✓" : "Copy address"}</button>
      </div>
      <span className="uv-sr" role="status" aria-live="polite">{copied ? "Email address copied to clipboard" : ""}</span>
      <ul className="uv-contact-links">
        {SOCIALS.map((s) => (<li key={s.id}><a href={s.href} target="_blank" rel="noreferrer"><i className={`${s.solid ? "fa-solid" : "fa-brands"} ${s.icon}`} aria-hidden="true" />{s.label}</a></li>))}
        <li><a href={PROFILE.cv} target="_blank" rel="noreferrer"><i className="fa-solid fa-file-lines" aria-hidden="true" />Curriculum vitae (PDF)</a></li>
      </ul>
    </Pane>
  );
}
