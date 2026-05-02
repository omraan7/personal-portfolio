import about from "../../assets/about_photo.jpeg";
import { motion } from "framer-motion";
import { useRef } from "react";
 
const TRAITS = [
  { num: "01", title: "Clean Code",      desc: "Maintainable, readable, scalable architecture that stands the test of time." },
  { num: "02", title: "Modern Stack",    desc: "React, Next.js, TypeScript — always learning what's next in the ecosystem." },
  { num: "03", title: "Detail Obsessed", desc: "Pixel-perfect UI, smooth animations, and polished user experiences." },
];
 
function TiltImage() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 16;
    const y = ((e.clientY - top) / height - 0.5) * -16;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative inline-block cursor-pointer"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.35s ease" }}
    >
      {/* Glow orb */}
      <div className="absolute -inset-8 rounded-full blur-3xl pointer-events-none opacity-10"
           style={{ background: "radial-gradient(circle, rgb(var(--accent)), transparent 70%)" }} />
 
      {/* Main frame */}
      <div className="relative" style={{
        clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        border: "1px solid rgb(var(--accent) / 0.18)",
        background: "rgb(var(--accent) / 0.02)",
        padding: "10px",
      }}>
        {/* Corners */}
        {[
          { s:{ top:-1, left:-1 },    bw:"2px 0 0 2px" },
          { s:{ top:-1, right:-1 },   bw:"2px 2px 0 0" },
          { s:{ bottom:-1, left:-1 }, bw:"0 0 2px 2px" },
          { s:{ bottom:-1, right:-1 },bw:"0 2px 2px 0" },
        ].map((c, i) => (
          <span key={i} style={{
            position:"absolute", width:22, height:22,
            ...c.s, borderStyle:"solid", borderWidth:c.bw,
            borderColor:"rgb(var(--accent))",
          }} />
        ))}
 
        <img
          src={about}
          alt="Mohamed Omran"
          style={{
            display:"block", width:"100%", maxWidth:360,
            objectFit:"cover", objectPosition:"top center",
            boxShadow: "0 0 40px 8px rgb(var(--accent) / 0.35), 0 0 80px 20px rgb(var(--accent) / 0.15)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: "linear-gradient(to bottom, transparent 65%, rgb(var(--base) / 0.55) 100%)" }} />
      </div>
 
      {/* Stat cards */}
      <div className="absolute z-10" style={{ top:-14, right:-20, clipPath:"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))", padding:"8px 14px", backdropFilter:"blur(16px)", background:"rgb(var(--surface))", border:"1px solid rgb(var(--accent) / 0.2)" }}>
        <div className="font-display text-2xl text-gradient font-bold leading-none">9+</div>
        <div className="font-mono-custom text-[0.55rem] tracking-widest uppercase mt-0.5"
             style={{ color: "rgb(var(--textsec))" }}>Projects</div>
      </div>
 
      <div className="absolute z-10" style={{ bottom:-14, left:-20, clipPath:"polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))", padding:"8px 14px", backdropFilter:"blur(16px)", background:"rgb(var(--surface))", border:"1px solid rgb(var(--accent) / 0.2)" }}>
        <div className="font-display text-2xl text-gradient font-bold leading-none">2+</div>
        <div className="font-mono-custom text-[0.55rem] tracking-widest uppercase mt-0.5"
             style={{ color: "rgb(var(--textsec))" }}>Years</div>
      </div>
    </motion.div>
  );
}
 
export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden"
             style={{ background: "rgb(var(--base))" }}>
      {/* Right glow */}
      <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none"
           style={{ background: "radial-gradient(ellipse 100% 100% at 100% 50%, rgb(var(--accent) / 0.04) 0%, transparent 70%)" }} />
 
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
 
        {/* Image */}
        <div className="flex justify-center lg:justify-start pt-8">
          <TiltImage />
        </div>
 
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="pt-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono-custom text-[0.65rem] tracking-[0.25em] uppercase"
                  style={{ color: "rgb(var(--accent))" }}>
              03 — The Developer
            </span>
            <div className="h-px w-10" style={{ background: "rgb(var(--accent))" }} />
          </div>
 
          <h2 className="font-display font-bold mb-8 leading-[1.05]"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "rgb(var(--textpri))" }}>
            The Story<br />
            <span className="italic" style={{ color: "rgb(var(--textsec) / 0.4)" }}>
              Behind The Code
            </span>
          </h2>
 
          {/* Divider */}
          <div className="w-10 h-0.5 mb-8"
               style={{ background: "linear-gradient(90deg, rgb(var(--accent)), transparent)" }} />
 
          <p className="font-body font-light leading-[1.9] mb-12 pl-5"
             style={{
               color: "rgb(var(--textsec))",
               fontSize: "0.9rem",
               borderLeft: "1px solid rgb(var(--accent) / 0.18)",
             }}>
            From my first line of HTML to building full-scale React applications with server-side rendering in Next.js — every step has been driven by genuine curiosity and the thrill of bringing ideas to life on screen. I obsess over clean architecture, responsive design, and the kind of subtle details users feel but never notice.
          </p>
 
          {/* Traits */}
          <div className="flex flex-col divide-y"
               style={{ borderColor: "rgb(var(--border) / 0.1)" }}>
            {TRAITS.map((t, i) => (
              <motion.div
                key={t.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="grid gap-4 py-5 group cursor-default"
                style={{ gridTemplateColumns: "44px 1fr", borderColor: "rgb(var(--border) / 0.1)" }}
              >
                <div className="font-mono-custom text-[0.6rem] tracking-widest pt-0.5"
                     style={{ color: "rgb(var(--accent) / 0.45)" }}>
                  {t.num}
                </div>
                <div>
                  <div className="font-display text-base mb-1.5 transition-colors duration-300"
                       style={{ color: "rgb(var(--textpri) / 0.85)" }}
                       onMouseEnter={e => e.currentTarget.style.color = "rgb(var(--accent))"}
                       onMouseLeave={e => e.currentTarget.style.color = "rgb(var(--textpri) / 0.85)"}>
                    {t.title}
                  </div>
                  <div className="font-body font-light leading-relaxed text-sm"
                       style={{ color: "rgb(var(--textsec) / 0.6)" }}>
                    {t.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
 