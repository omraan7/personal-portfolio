import home from "../../assets/Group 46.png";
import cv from "../../assets/Mohamed Omran CV.pdf";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
 
/* ─── Particle Canvas ────────────────────────────────────────── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
 
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.28,
      dy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.45 + 0.08,
    }));
 
    const getAccent = () => {
      const s = getComputedStyle(document.documentElement);
      return s.getPropertyValue("--accent").trim() || "255 210 100";
    };
 
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const col = getAccent();
      pts.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = c.width;
        if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height;
        if (p.y > c.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.replace(/ /g, ",")},${p.a})`;
        ctx.fill();
      });
      pts.forEach((p, i) => pts.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${col.replace(/ /g, ",")},${0.07 * (1 - d / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
 
/* ─── Skills Data ────────────────────────────────────────────── */
const SKILLS = [
  { num: "01", label: "Languages",  items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
  { num: "02", label: "Frameworks", items: ["React.js", "Next.js", "Tailwind", "Bootstrap"] },
  { num: "03", label: "Tools",      items: ["Git", "GitHub", "Figma", "VS Code"] },
  { num: "04", label: "Concepts",   items: ["REST APIs", "SSR", "Responsive", "CRUD"] },
];
 
/* ─── 3D Image with mouse-tilt ──────────────────────────────── */
function HeroImage() {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = ((e.clientY - top) / height - 0.5) * -14;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(12px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative cursor-pointer"
      initial={{ opacity: 0, scale: 0.88, rotateX: 20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.3s ease" }}
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
           style={{ background: "radial-gradient(circle, rgb(var(--accent)), transparent 70%)", transform: "scale(1.2)" }} />
 
      {/* Frame */}
      <div className="relative clip-hero p-4"
           style={{ background: "rgb(var(--accent) / 0.03)", border: "1px solid rgb(var(--accent) / 0.15)" }}>
        {/* Corner brackets */}
        {[["top-0 left-0","border-t-2 border-l-2"],["top-0 right-0","border-t-2 border-r-2"],
          ["bottom-0 left-0","border-b-2 border-l-2"],["bottom-0 right-0","border-b-2 border-r-2"]
        ].map(([pos, bdr]) => (
          <span key={pos} className={`absolute w-5 h-5 ${pos} ${bdr}`}
                style={{ borderColor: "rgb(var(--accent))" }} />
        ))}
        <img src={home} alt="Mohamed Omran Front-End Developer"
             className="w-full block max-w-xs mx-auto" style={{ filter: "brightness(0.96)" }} />
 
        {/* Floating badge */}
        <div className="absolute -bottom-4 -right-4 clip-btn px-3 py-2 backdrop-blur-xl"
             style={{ background: "rgb(var(--surface))", border: "1px solid rgb(var(--accent) / 0.2)" }}>
          <div className="font-display text-xl text-gradient font-bold leading-none">9+</div>
          <div className="font-mono-custom text-[0.55rem] tracking-widest uppercase mt-0.5"
               style={{ color: "rgb(var(--textsec))" }}>Projects</div>
        </div>
      </div>
    </motion.div>
  );
}
 
export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden noise"
               style={{ background: `radial-gradient(ellipse 80% 60% at 60% 40%, rgb(var(--accent) / 0.06) 0%, transparent 70%), rgb(var(--base))` }}>
        <Particles />
        <div className="grid-bg absolute inset-0 pointer-events-none" />
 
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-[48px_1fr_1fr] gap-8 items-center py-24 md:py-0 md:min-h-screen">
 
          {/* Social sidebar */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <div className="w-px h-16 opacity-20" style={{ background: "rgb(var(--accent))" }} />
            {[
              { icon: "fa-github",     href: "https://github.com/omraan7" },
              { icon: "fa-linkedin-in",href: "https://www.linkedin.com/in/mohamed-omran-02800338a" },
            ].map(s => (
              <a key={s.icon} href={s.href} target="_blank" rel="noreferrer"
                 className="w-9 h-9 clip-btn flex items-center justify-center text-sm transition-all duration-300 group"
                 style={{ border: "1px solid rgb(var(--border) / 0.5)", color: "rgb(var(--textsec))" }}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(var(--accent))"; e.currentTarget.style.color = "rgb(var(--accent))"; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = "rgb(var(--border) / 0.5)"; e.currentTarget.style.color = "rgb(var(--textsec))"; }}>
                <i className={`fa-brands ${s.icon}`} />
              </a>
            ))}
            <div className="w-px h-16 opacity-20" style={{ background: "rgb(var(--accent))" }} />
          </div>
 
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-custom text-[0.65rem] tracking-[0.25em] uppercase"
                    style={{ color: "rgb(var(--accent))" }}>
                01 — Portfolio 2025
              </span>
              <div className="h-px w-10" style={{ background: "rgb(var(--accent))" }} />
            </div>
 
            <h1 className="font-display font-bold leading-[0.95] mb-3"
                style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "rgb(var(--textpri))", letterSpacing: "-0.02em" }}>
              Mohamed<br />Omran
            </h1>
 
            <p className="font-display italic mb-6 text-gradient"
               style={{ fontSize: "clamp(1.4rem,3.5vw,2.6rem)", lineHeight: 1.1 }}>
              Front-End Developer
            </p>
 
            <p className="mb-10 font-body font-light leading-relaxed max-w-sm"
               style={{ color: "rgb(var(--textsec))", fontSize: "0.95rem" }}>
              Crafting responsive, performant web experiences where modern technology meets thoughtful design.
            </p>
 
            <div className="flex flex-wrap gap-3">
              <a href={cv} target="_blank"
                 className="clip-btn inline-flex items-center gap-2 px-6 py-3 font-mono-custom text-[0.72rem] tracking-widest uppercase font-bold transition-opacity duration-200 hover:opacity-80"
                 style={{ background: "linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent2)))", color: "rgb(var(--base))" }}>
                Download CV
              </a>
              <a href="https://omraan7.github.io/Omran/" target="_blank" rel="noreferrer"
                 className="clip-btn inline-flex items-center gap-2 px-6 py-3 font-mono-custom text-[0.72rem] tracking-widest uppercase transition-all duration-300"
                 style={{ border: "1px solid rgb(var(--border) / 0.5)", color: "rgb(var(--textsec))" }}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(var(--accent))"; e.currentTarget.style.color = "rgb(var(--accent))"; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = "rgb(var(--border) / 0.5)"; e.currentTarget.style.color = "rgb(var(--textsec))"; }}>
                Social Media
              </a>
            </div>
          </motion.div>
 
          {/* 3D Hero Image */}
          <div className="flex justify-center md:justify-end">
            <HeroImage />
          </div>
        </div>
 
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 animate-scroll-pulse origin-top"
               style={{ background: "linear-gradient(to bottom, rgb(var(--accent) / 0.6), transparent)" }} />
          <span className="font-mono-custom text-[0.55rem] tracking-[0.2em] uppercase"
                style={{ color: "rgb(var(--textsec))" }}>Scroll</span>
        </div>
      </section>
 
      {/* ── SKILLS ───────────────────────────────────────────── */}
      <section id="skills" className="relative py-24 px-6 overflow-hidden"
               style={{ background: "rgb(var(--base))" }}>
        {/* Decorative big text */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold pointer-events-none select-none"
             style={{ fontSize: "14rem", color: "rgb(var(--textpri) / 0.015)", lineHeight: 1 }}>
          SKILLS
        </div>
 
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono-custom text-[0.65rem] tracking-[0.25em] uppercase"
                    style={{ color: "rgb(var(--accent))" }}>
                02 — My Arsenal
              </span>
              <div className="h-px w-10" style={{ background: "rgb(var(--accent))" }} />
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "rgb(var(--textpri))" }}>
              Skills &amp; <span style={{ color: "rgb(var(--textsec) / 0.4)", fontStyle: "italic" }}>Tools</span>
            </h2>
          </motion.div>
 
          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
               style={{ background: "rgb(var(--accent) / 0.06)", border: "1px solid rgb(var(--accent) / 0.06)" }}>
            {SKILLS.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="relative p-8 group cursor-default overflow-hidden"
                style={{ background: "rgb(var(--base))" }}
              >
                {/* Top shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                     style={{ background: "linear-gradient(90deg, transparent, rgb(var(--accent)), transparent)" }} />
                {/* Hover bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{ background: "rgb(var(--accent) / 0.02)" }} />
 
                <div className="relative z-10">
                  <div className="font-mono-custom text-[0.6rem] tracking-widest mb-4"
                       style={{ color: "rgb(var(--accent) / 0.45)" }}>
                    {cat.num}
                  </div>
                  <div className="font-display italic text-lg mb-5"
                       style={{ color: "rgb(var(--textpri) / 0.9)" }}>
                    {cat.label}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map(item => (
                      <span key={item}
                            className="font-mono-custom text-[0.68rem] tracking-wide px-2.5 py-1 transition-all duration-200 cursor-default"
                            style={{
                              background: "rgb(var(--accent) / 0.06)",
                              border: "1px solid rgb(var(--accent) / 0.12)",
                              color: "rgb(var(--textsec))",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgb(var(--accent) / 0.12)"; e.currentTarget.style.color = "rgb(var(--accent))"; e.currentTarget.style.borderColor = "rgb(var(--accent) / 0.3)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "rgb(var(--accent) / 0.06)"; e.currentTarget.style.color = "rgb(var(--textsec))"; e.currentTarget.style.borderColor = "rgb(var(--accent) / 0.12)"; }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
 