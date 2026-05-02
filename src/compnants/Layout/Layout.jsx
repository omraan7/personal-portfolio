import { useRef } from "react";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import About from "../About/About";
import Portfolio from "../Portfolio/Portfolio";
import { ThemeProvider } from "../ThemeContext/ThemeContext";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
 
function Footer({ scrollToSection }) {
  const links = [
    { name: "Home",     id: "home" },
    { name: "Skills",   id: "skills" },
    { name: "About",    id: "about" },
    { name: "Projects", id: "portfolio" },
  ];
 
  return (
    <footer className="relative py-12 px-6"
            style={{ borderTop: "1px solid rgb(var(--accent) / 0.06)", background: "rgb(var(--base))" }}>
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-px"
           style={{ background: "linear-gradient(90deg, transparent, rgb(var(--accent) / 0.3), transparent)" }} />
 
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
 
          {/* Brand */}
          <div>
            <button onClick={() => scrollToSection("home")}
                    className="font-display font-bold text-2xl text-gradient tracking-widest mb-3 block">
              OMRAN
            </button>
            <p className="font-body font-light text-sm leading-relaxed max-w-xs"
               style={{ color: "rgb(var(--textsec) / 0.5)" }}>
              Front-End Developer crafting responsive, performant web experiences.
            </p>
          </div>
 
          {/* Nav links */}
          <div>
            <div className="font-mono-custom text-[0.6rem] tracking-[0.25em] uppercase mb-5"
                 style={{ color: "rgb(var(--accent) / 0.6)" }}>
              Navigation
            </div>
            <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
              {links.map((l, i) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToSection(l.id)}
                    className="font-mono-custom text-[0.7rem] tracking-widest uppercase transition-colors duration-200 group flex items-center gap-2"
                    style={{ color: "rgb(var(--textsec) / 0.4)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgb(var(--accent))"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgb(var(--textsec) / 0.4)"}
                  >
                    <span style={{ color: "rgb(var(--accent) / 0.35)" }}>0{i + 1}.</span>
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Socials */}
          <div>
            <div className="font-mono-custom text-[0.6rem] tracking-[0.25em] uppercase mb-5"
                 style={{ color: "rgb(var(--accent) / 0.6)" }}>
              Connect
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: "fa-github",      label: "GitHub",   href: "https://github.com/omraan7" },
                { icon: "fa-linkedin-in", label: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-omran-02800338a" },
              ].map(s => (
                <a key={s.icon} href={s.href} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-3 font-mono-custom text-[0.7rem] tracking-widest uppercase transition-colors duration-200"
                   style={{ color: "rgb(var(--textsec) / 0.4)" }}
                   onMouseEnter={e => e.currentTarget.style.color = "rgb(var(--accent))"}
                   onMouseLeave={e => e.currentTarget.style.color = "rgb(var(--textsec) / 0.4)"}>
                  <i className={`fa-brands ${s.icon} text-base`} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
 
        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
             style={{ borderTop: "1px solid rgb(var(--border) / 0.1)" }}>
          <span className="font-mono-custom text-[0.6rem] tracking-widest uppercase"
                style={{ color: "rgb(var(--textsec) / 0.2)" }}>
            © 2025 Mohamed Omran. All rights reserved.
          </span>
          <span className="font-mono-custom text-[0.6rem] tracking-widest uppercase"
                style={{ color: "rgb(var(--textsec) / 0.2)" }}>
            Built with React · Tailwind · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
 
function LayoutInner() {
  const homeRef      = useRef(null);
  const aboutRef     = useRef(null);
  const portfolioRef = useRef(null);
 
  const scrollToSection = (section) => {
    const options = { behavior: "smooth", block: "start" };
    if (section === "home"      && homeRef.current)      return homeRef.current.scrollIntoView(options);
    if (section === "about"     && aboutRef.current)     return aboutRef.current.scrollIntoView(options);
    if (section === "portfolio" && portfolioRef.current) return portfolioRef.current.scrollIntoView(options);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView(options);
  };
 
  return (
    <>
      <NavBar scrollToSection={scrollToSection} />
 
      <div style={{ paddingTop: 80 }}>
        <div ref={homeRef}>
          <Home />
        </div>
 
        <div ref={aboutRef}>
          <About />
        </div>
 
        <div ref={portfolioRef}>
          <Portfolio />
        </div>
 
        <Footer scrollToSection={scrollToSection} />
      </div>
 
      {/* Floating theme switcher */}
      <ThemeSwitcher />
    </>
  );
}
 
export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}