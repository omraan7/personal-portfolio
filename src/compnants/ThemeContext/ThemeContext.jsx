import { createContext, useContext, useEffect, useState } from "react";
 
// accent / accent2 = hex (for inline styles in ThemeSwitcher dots)
// The CSS vars are set on :root by applyTheme()
export const THEMES = [
  {
    id: "gold",
    label: "Gold Noir",
    accent:  "#FFD264",
    accent2: "#FF9A3C",
    vars: {
      "--accent":   "255 210 100",
      "--accent2":  "255 154  60",
      "--base":     "6   6   10",
      "--surface":  "18  18  26",
      "--surface2": "28  28  38",
      "--textpri":  "255 255 255",
      "--textsec":  "171 178 191",
      "--border":   "60  60  80",
    },
  },
  {
    id: "cyber",
    label: "Cyber",
    accent:  "#00FFC8",
    accent2: "#00B4FF",
    vars: {
      "--accent":   "0 255 200",
      "--accent2":  "0 180 255",
      "--base":     "8   8  16",
      "--surface":  "14  22  38",
      "--surface2": "20  30  50",
      "--textpri":  "220 240 255",
      "--textsec":  "120 160 200",
      "--border":   "30  60  90",
    },
  },
  {
    id: "rose",
    label: "Rose",
    accent:  "#FF6482",
    accent2: "#DC3CB4",
    vars: {
      "--accent":   "255 100 130",
      "--accent2":  "220  60 180",
      "--base":     "12   6  10",
      "--surface":  "28  14  24",
      "--surface2": "40  20  36",
      "--textpri":  "255 240 245",
      "--textsec":  "200 150 170",
      "--border":   "80  40  60",
    },
  },
  {
    id: "emerald",
    label: "Emerald",
    accent:  "#50FF96",
    accent2: "#28C878",
    vars: {
      "--accent":   "80 255 150",
      "--accent2":  "40 200 120",
      "--base":     "6  12   8",
      "--surface":  "14  24  18",
      "--surface2": "20  36  26",
      "--textpri":  "230 255 240",
      "--textsec":  "140 200 160",
      "--border":   "40  80  56",
    },
  },
  {
    id: "slate",
    label: "Slate",
    accent:  "#B4C8FF",
    accent2: "#788CDC",
    vars: {
      "--accent":   "180 200 255",
      "--accent2":  "120 140 220",
      "--base":     "10  12  18",
      "--surface":  "18  22  32",
      "--surface2": "26  30  44",
      "--textpri":  "220 225 245",
      "--textsec":  "140 148 180",
      "--border":   "50  56  80",
    },
  },
];
 
function applyTheme(themeObj) {
  const root = document.documentElement;
  Object.entries(themeObj.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}
 
const ThemeCtx = createContext(null);
 
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "gold";
  });
 
  const setTheme = (id) => {
    const t = THEMES.find(x => x.id === id) || THEMES[0];
    applyTheme(t);
    localStorage.setItem("portfolio-theme", id);
    setThemeState(id);
  };
 
  // Apply on mount
  useEffect(() => {
    const t = THEMES.find(x => x.id === theme) || THEMES[0];
    applyTheme(t);
  }, []);
 
  return (
    <ThemeCtx.Provider value={{ theme, setTheme, THEMES }}>
      {children}
    </ThemeCtx.Provider>
  );
}
 
export const useTheme = () => useContext(ThemeCtx);
// export default ThemeProvider;
 