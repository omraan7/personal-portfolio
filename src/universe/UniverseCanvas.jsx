import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import Scene from "./Scene";

/** Default export so it can be React.lazy()-loaded: three.js never enters the initial bundle. */
export default function UniverseCanvas({ quality, onReady, onContextLost, ...sceneProps }) {
  const [dpr, setDpr] = useState(Math.min(quality.dprMax, window.devicePixelRatio || 1));
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  return (
    <Canvas
      dpr={dpr}
      camera={{ fov: 50, near: 0.1, far: 520, position: [0, 3, 50] }}
      gl={{ antialias: !quality.mobile, powerPreference: "high-performance", alpha: false, stencil: false }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => { if (!alive.current) return; e.preventDefault(); onContextLost?.(); });
        requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
      }}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor onDecline={() => setDpr((d) => Math.max(1, d - 0.5))} flipflops={3} />
      <Scene quality={quality} {...sceneProps} />
    </Canvas>
  );
}
