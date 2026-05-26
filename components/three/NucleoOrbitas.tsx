"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INDIGO = "#3f356e";
const ORANGE = "#df7e35";
const BEIGE = "#f5f1e0";

type OrbitConfig = {
  radius: number;
  particles: number;
  speed: number;
  tilt: [number, number, number];
  accent?: boolean;
};

const ORBITS: OrbitConfig[] = [
  { radius: 1.4, particles: 14, speed: 0.18, tilt: [0.4, 0.2, 0.05] },
  { radius: 2.0, particles: 22, speed: -0.12, tilt: [-0.25, 0.6, -0.15], accent: true },
  { radius: 2.8, particles: 36, speed: 0.08, tilt: [0.6, -0.35, 0.1] },
  { radius: 3.6, particles: 48, speed: -0.05, tilt: [0.1, 0.9, 0.0] },
];

function OrbitRing({ config, scrollRef }: { config: OrbitConfig; scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  const torusGeo = useMemo(() => new THREE.TorusGeometry(config.radius, 0.003, 6, 180), [config.radius]);

  const particlePositions = useMemo(() => {
    const arr: { x: number; y: number; size: number }[] = [];
    for (let i = 0; i < config.particles; i++) {
      const angle = (i / config.particles) * Math.PI * 2;
      const x = Math.cos(angle) * config.radius;
      const y = Math.sin(angle) * config.radius;
      const size = 0.018 + Math.random() * 0.026;
      arr.push({ x, y, size });
    }
    return arr;
  }, [config.particles, config.radius]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // scrollRef.current is 0→1 across the section. Convert to a continuous
    // rotation by adding the scrolling delta to a running angle.
    ref.current.rotation.z += delta * config.speed;
    ref.current.rotation.x = config.tilt[0] + scrollRef.current * 0.4 * config.tilt[2] * 8;
    ref.current.rotation.y = config.tilt[1] + scrollRef.current * Math.PI * 0.5;
  });

  return (
    <group ref={ref}>
      <mesh geometry={torusGeo}>
        <meshBasicMaterial color={BEIGE} transparent opacity={0.18} />
      </mesh>
      {particlePositions.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, 0]}>
          <sphereGeometry args={[p.size, 12, 12]} />
          <meshBasicMaterial
            color={config.accent && i % 5 === 0 ? ORANGE : BEIGE}
            transparent
            opacity={config.accent && i % 5 === 0 ? 0.95 : 0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function Nucleus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.04);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 64, 64]} />
      <meshStandardMaterial color={INDIGO} roughness={0.4} emissive={ORANGE} emissiveIntensity={0.18} />
    </mesh>
  );
}

function Scene({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.4} color={ORANGE} distance={4} decay={1.5} />
      <Nucleus />
      {ORBITS.map((o, i) => (
        <OrbitRing key={i} config={o} scrollRef={scrollRef} />
      ))}
    </>
  );
}

export function NucleoOrbitas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [enable, setEnable] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setEnable(!window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (!enable) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section is just below viewport, 1 when it has passed the top.
      const total = rect.height + vh;
      const progress = (vh - rect.top) / total;
      scrollRef.current = Math.max(0, Math.min(1, progress));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enable]);

  if (!enable || reduced) {
    // Static CSS fallback used by mobile and reduced-motion.
    return (
      <div className="absolute inset-0 grid place-items-center" aria-hidden>
        <div className="relative h-[80vh] w-[80vh] opacity-30">
          <span
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--accent)]"
            style={{ boxShadow: "0 0 60px 10px rgba(223,126,53,0.35)" }}
          />
          {[35, 60, 85].map((s, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--ink-inverse)]/15"
              style={{ width: `${s}%`, height: `${s}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
