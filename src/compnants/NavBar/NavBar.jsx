import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
 
const links = [
  { name: "Home",     id: "home",      num: "01" },
  { name: "Skills",   id: "skills",    num: "02" },
  { name: "About",    id: "about",     num: "03" },
  { name: "Projects", id: "portfolio", num: "04" },
];
 
export default function NavBar({ scrollToSection }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active,     setActive]     = useState("home");
 
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      links.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= 130 && r.bottom >= 130) setActive(id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  return (
    <nav
      className="fixed top-0 inset-x-0 z-40 transition-all duration-500"
      style={{
        height: scrolled ? 64 : 80,
        background: scrolled ? "rgb(var(--base) / 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgb(var(--accent) / 0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgb(0 0 0 / 0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
 
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="font-display font-bold text-2xl text-gradient tracking-widest hover:opacity-80 transition-opacity duration-200"
        >
          OMRAN
        </button>
 
        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          {links.map(link => (
            <li key={link.id} className="relative group">
              <button
                onClick={() => scrollToSection(link.id)}
                className="font-mono-custom text-[0.72rem] tracking-[0.14em] uppercase transition-colors duration-300 pb-1 relative"
                style={{ color: active === link.id ? "rgb(var(--textpri))" : "rgb(var(--textsec))" }}
              >
                <span className="mr-1.5 text-[0.62rem]" style={{ color: "rgb(var(--accent))" }}>
                  {link.num}.
                </span>
                {link.name}
                {/* Underline */}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300 origin-left"
                  style={{
                    width: active === link.id ? "100%" : "0%",
                    background: "linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent2)))",
                  }}
                />
              </button>
              {active !== link.id && (
                <span className="absolute bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 origin-left"
                      style={{ background: "rgb(var(--accent) / 0.35)" }} />
              )}
            </li>
          ))}
        </ul>
 
        {/* Hamburger */}
        <button
          className="md:hidden text-2xl transition-colors duration-300"
          style={{ color: "rgb(var(--accent))" }}
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>
 
      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: mobileOpen ? 360 : 0,
          background: "rgb(var(--base) / 0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: mobileOpen ? "1px solid rgb(var(--accent) / 0.1)" : "none",
        }}
      >
        <ul className="flex flex-col items-center gap-5 py-8 list-none m-0 p-0 pt-6 pb-8 px-4">
          {links.map(link => (
            <li key={link.id}>
              <button
                onClick={() => { scrollToSection(link.id); setMobileOpen(false); }}
                className="font-mono-custom text-sm tracking-widest uppercase transition-colors duration-300"
                style={{ color: active === link.id ? "rgb(var(--accent))" : "rgb(var(--textsec))" }}
              >
                <span className="mr-2 text-xs" style={{ color: "rgb(var(--accent))" }}>
                  {link.num}.
                </span>
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
 