import { useState } from "react";
import { useTheme } from "../ThemeContext/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
 
export default function ThemeSwitcher() {
  const { theme, setTheme, THEMES } = useTheme();
  const [open, setOpen] = useState(false);
  const current = THEMES.find(t => t.id === theme) || THEMES[0];
 
  const menuStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "12px",
    background: "rgba(18, 18, 28, 0.95)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "8px",
    minWidth: "160px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  };
 
  const toggleBtnStyle = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: `1px solid ${current.accent}40`,
    background: "rgba(18, 18, 28, 0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: `0 0 20px ${current.accent}20`,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  };
 
  return (
    <div style={{
      position: "fixed",
      bottom: "32px",
      right: "32px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "10px",
    }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={menuStyle}
          >
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "6px",
              paddingLeft: "4px",
            }}>
              Theme
            </p>
 
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: theme === t.id
                    ? `1px solid ${t.accent}40`
                    : "1px solid transparent",
                  background: theme === t.id
                    ? `${t.accent}12`
                    : "transparent",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  if (theme !== t.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={e => {
                  if (theme !== t.id) e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Color dots */}
                <span style={{ display: "flex", gap: "4px" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.accent, display: "block" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: t.accent2, display: "block" }} />
                </span>
 
                {/* Label */}
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: theme === t.id ? "#fff" : "rgba(255,255,255,0.45)",
                  flex: 1,
                }}>
                  {t.label}
                </span>
 
                {/* Active dot */}
                {theme === t.id && (
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: t.accent, display: "block",
                  }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        style={toggleBtnStyle}
        title="Change Theme"
      >
        <span style={{ display: "flex", gap: "3px", alignItems: "center" }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: current.accent, display: "block" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: current.accent2, display: "block" }} />
        </span>
      </motion.button>
    </div>
  );
}
 