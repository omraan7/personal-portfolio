import { motion } from "framer-motion";
import { useState } from "react";
import Clarity   from "../../assets/Clarity.png";
import Nutriplan from "../../assets/Nutriplan.png";
import games     from "../../assets/games.png";
import socialapp from "../../assets/sapp.png";
import jj        from "../../assets/jj.png";
import ee        from "../../assets/ee.png";
import portifolio from "../../assets/portifolio.png";
import Space     from "../../assets/Today in Space.png";
import ux        from "../../assets/UI UX Review.png";
 
const projects = [
  { id:1, name:"E-Commerce",    tag:"React · Next.js",  image:ee,         liveLink:"https://e-commerce-pied-psi-84.vercel.app",       gitLink:"https://github.com/omraan7/E-commerce" },
  { id:2, name:"Movie App",     tag:"React · API",       image:jj,         liveLink:"https://movie-app-lovat-two.vercel.app/",          gitLink:"https://github.com/omraan7/movie-app" },
  { id:3, name:"Social App",    tag:"React · CRUD",      image:socialapp,  liveLink:"https://social-app-nine-rho.vercel.app/",          gitLink:"https://github.com/omraan7/social-app" },
  { id:4, name:"Nutriplan",     tag:"React · Health",    image:Nutriplan,  liveLink:"https://omraan7.github.io/Nutriplan/#/home",        gitLink:"https://github.com/omraan7/Nutriplan" },
  { id:5, name:"Games Live",    tag:"Vanilla JS",        image:games,      liveLink:"https://omraan7.github.io/games-web/",             gitLink:"https://github.com/omraan7/games-web" },
  { id:6, name:"Today in Space",tag:"API · NASA",        image:Space,      liveLink:"https://omraan7.github.io/Api-Project/#",           gitLink:"https://github.com/omraan7/Api-Project/tree/main" },
  { id:7, name:"Clarity",       tag:"HTML · CSS",        image:Clarity,    liveLink:"https://omraan7.github.io/-Clarity/",              gitLink:"https://github.com/omraan7/-Clarity" },
  { id:8, name:"UX Review",     tag:"UI/UX · Design",    image:ux,         liveLink:"https://omraan7.github.io/UX-Review/",             gitLink:"https://github.com/omraan7/UX-Review" },
  { id:9, name:"Portfolio",     tag:"Vanilla JS",        image:portifolio, liveLink:"https://omraan7.github.io/Dom-project/",           gitLink:"https://github.com/omraan7/Dom-project" },
];
 
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt,    setTilt]    = useState({ x: 0, y: 0 });
 
  const onMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 18;
    const y = ((e.clientY - top)  / height - 0.5) * -18;
    setTilt({ x, y });
  };
 
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x:0, y:0 }); }}
      onMouseMove={onMove}
      className="relative overflow-hidden cursor-pointer"
      style={{
        background: "rgb(var(--base))",
        aspectRatio: "4/3",
        transformStyle: "preserve-3d",
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        boxShadow: hovered
          ? `0 20px 60px rgb(var(--accent) / 0.12), 0 0 0 1px rgb(var(--accent) / 0.12)`
          : "0 0 0 rgb(0 0 0 / 0)",
      }}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        style={{
          transform: hovered ? "scale(1.08)" : "scale(1)",
          filter:    hovered ? "brightness(0.2)" : "brightness(0.55)",
        }}
      />
 
      {/* Overlay */}
      <div className="absolute inset-0 transition-opacity duration-500"
           style={{
             background: "linear-gradient(to top, rgb(var(--base) / 0.92) 0%, rgb(var(--base) / 0.15) 60%, transparent 100%)",
             opacity: hovered ? 1 : 1,
           }} />
 
      {/* Tag — always visible */}
      <div className="absolute top-3 left-3 font-mono-custom text-[0.58rem] tracking-widest uppercase px-2 py-1 backdrop-blur-sm"
           style={{
             background: "rgb(var(--base) / 0.75)",
             border: "1px solid rgb(var(--accent) / 0.15)",
             color: "rgb(var(--accent) / 0.8)",
           }}>
        {project.tag}
      </div>
 
      {/* Name — always visible bottom */}
      <div className={`absolute bottom-4 left-4 font-display italic text-lg transition-all duration-400 ${hovered ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
           style={{ color: "rgb(var(--textpri))" }}>
        {project.name}
      </div>
 
      {/* Hover buttons */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-400 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="font-display italic text-xl mb-2" style={{ color: "rgb(var(--textpri))" }}>
          {project.name}
        </div>
        <div className="flex gap-3">
          <a href={project.liveLink} target="_blank" rel="noreferrer"
             className="clip-btn font-mono-custom text-[0.65rem] tracking-widest uppercase px-5 py-2.5 font-bold transition-opacity hover:opacity-80"
             style={{ background: "linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent2)))", color: "rgb(var(--base))" }}
             onClick={e => e.stopPropagation()}>
            Live Demo
          </a>
          <a href={project.gitLink} target="_blank" rel="noreferrer"
             className="clip-btn font-mono-custom text-[0.65rem] tracking-widest uppercase px-5 py-2.5 transition-all duration-200"
             style={{ background: "rgb(var(--surface2) / 0.9)", border: "1px solid rgb(var(--border) / 0.5)", color: "rgb(var(--textsec))" }}
             onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(var(--accent))"; e.currentTarget.style.color = "rgb(var(--accent))"; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = "rgb(var(--border) / 0.5)"; e.currentTarget.style.color = "rgb(var(--textsec))"; }}
             onClick={e => e.stopPropagation()}>
            GitHub
          </a>
        </div>
      </div>
 
      {/* Corner brackets on hover */}
      {hovered && (
        <>
          <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: "rgb(var(--accent))" }} />
          <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: "rgb(var(--accent))" }} />
          <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: "rgb(var(--accent))" }} />
          <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: "rgb(var(--accent))" }} />
        </>
      )}
    </motion.div>
  );
}
 
export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6" style={{ background: "rgb(var(--base))" }}>
      <div className="max-w-7xl mx-auto">
 
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-end justify-between flex-wrap gap-4 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono-custom text-[0.65rem] tracking-[0.25em] uppercase"
                    style={{ color: "rgb(var(--accent))" }}>
                04 — Selected Work
              </span>
              <div className="h-px w-10" style={{ background: "rgb(var(--accent))" }} />
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "rgb(var(--textpri))" }}>
              Projects &amp; <span className="italic" style={{ color: "rgb(var(--textsec) / 0.4)" }}>Experiments</span>
            </h2>
          </div>
          <span className="font-mono-custom text-[0.65rem] tracking-widest uppercase"
                style={{ color: "rgb(var(--textsec) / 0.3)" }}>
            {projects.length} projects
          </span>
        </motion.div>
 
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
             style={{ background: "rgb(var(--accent) / 0.05)", border: "1px solid rgb(var(--accent) / 0.05)" }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
 
        {/* Footer CTA */}
        <div className="flex justify-center mt-14">
          <a href="https://github.com/omraan7" target="_blank" rel="noreferrer"
             className="clip-btn inline-flex items-center gap-3 px-8 py-4 font-mono-custom text-[0.7rem] tracking-widest uppercase transition-all duration-300"
             style={{ border: "1px solid rgb(var(--border) / 0.4)", color: "rgb(var(--textsec))" }}
             onMouseEnter={e => { e.currentTarget.style.borderColor = "rgb(var(--accent) / 0.4)"; e.currentTarget.style.color = "rgb(var(--accent))"; e.currentTarget.style.background = "rgb(var(--accent) / 0.04)"; }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = "rgb(var(--border) / 0.4)"; e.currentTarget.style.color = "rgb(var(--textsec))"; e.currentTarget.style.background = "transparent"; }}>
            View All on GitHub
            <i className="fa-brands fa-github" />
          </a>
        </div>
      </div>
    </section>
  );
}