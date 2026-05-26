"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Isotipo } from "@/components/primitives/Isotipo";

// ============================================================================
// Builds a 3D curve that traces the official Nucleo N+U isotype path:
// a single continuous line that draws an "n" (top arc) interlocked with a "u"
// (bottom arc). Source path in components/primitives/Isotipo.tsx — kept
// identical in shape so the 3D tube matches the 2D fallback exactly.
// ============================================================================
function buildIsotipoCurve(): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  // Center the path on the origin and flip Y (SVG → three.js).
  const toV3 = (x: number, y: number) => new THREE.Vector3(x - 48, 54 - y, 0);

  // Vertical left: (20, 78) → (20, 30)
  for (let i = 0; i <= 6; i++) {
    points.push(toV3(20, 78 - (48 * i) / 6));
  }

  // Top arc (n): (20, 30) → (48, 30), counter-clockwise (sweep=1 in SVG flipped Y).
  const arcSegments = 36;
  for (let i = 1; i <= arcSegments; i++) {
    const t = i / arcSegments;
    const angle = Math.PI - Math.PI * t;
    const cx = 34;
    const cy = 30;
    const r = 14;
    points.push(toV3(cx + r * Math.cos(angle), cy - r * Math.sin(angle)));
  }

  // Vertical middle: (48, 30) → (48, 78)
  for (let i = 1; i <= 6; i++) {
    points.push(toV3(48, 30 + (48 * i) / 6));
  }

  // Bottom arc (u): (48, 78) → (76, 78), inverted (sweep=0 in SVG → opens down).
  for (let i = 1; i <= arcSegments; i++) {
    const t = i / arcSegments;
    const angle = Math.PI - Math.PI * t;
    const cx = 62;
    const cy = 78;
    const r = 14;
    points.push(toV3(cx + r * Math.cos(angle), cy + r * Math.sin(angle)));
  }

  // Vertical right: (76, 78) → (76, 30)
  for (let i = 1; i <= 6; i++) {
    points.push(toV3(76, 78 - (48 * i) / 6));
  }

  return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
}

function IsotipoMesh({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const tubeGeometry = useMemo(() => {
    const curve = buildIsotipoCurve();
    return new THREE.TubeGeometry(curve, 360, 2.6, 24, false);
  }, []);

  const capGeometry = useMemo(() => new THREE.SphereGeometry(2.6, 24, 24), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = mouseRef.current;
    const targetRotX = target.y * 0.22;
    const targetRotY = target.x * 0.28;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      4.5,
      delta,
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      4.5,
      delta,
    );
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35} floatingRange={[-0.5, 0.5]}>
      <group ref={groupRef} scale={[0.025, 0.025, 0.025]}>
        <mesh geometry={tubeGeometry} castShadow>
          <meshStandardMaterial
            color="#3f356e"
            roughness={0.35}
            metalness={0.12}
          />
        </mesh>
        {/* End caps for the line — the SVG uses round line-caps. */}
        <mesh geometry={capGeometry} position={[-28, -24, 0]}>
          <meshStandardMaterial color="#3f356e" roughness={0.35} metalness={0.12} />
        </mesh>
        <mesh geometry={capGeometry} position={[28, 24, 0]}>
          <meshStandardMaterial color="#3f356e" roughness={0.35} metalness={0.12} />
        </mesh>
      </group>
    </Float>
  );
}

export function IsotipoLive() {
  const [enable, setEnable] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setEnable(!isMobile);
    // small delay so LCP is not blocked.
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!enable || reduced) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.x = Math.max(-1.2, Math.min(1.2, (e.clientX - cx) / (rect.width / 2)));
      mouseRef.current.y = Math.max(-1.2, Math.min(1.2, (e.clientY - cy) / (rect.height / 2)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enable, reduced]);

  if (!enable || reduced) {
    return (
      <div className="grid h-full w-full place-items-center">
        <Isotipo
          className="h-[min(64vh,520px)] w-[min(64vh,520px)] text-[color:var(--ink)] drop-shadow-[0_24px_60px_rgba(63,53,110,0.18)]"
          strokeWidth={11}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {/* Halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(223,126,53,0.12), transparent 65%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        <Canvas
          shadows
          dpr={[1, 1.6]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 3.4], fov: 36 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.45} />
          <directionalLight
            position={[3, 4, 3]}
            intensity={1.05}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-3, -2, 2]} intensity={0.4} color="#df7e35" />
          <Environment preset="studio" environmentIntensity={0.45} />
          <IsotipoMesh mouseRef={mouseRef} />
          <ContactShadows
            position={[0, -1.1, 0]}
            opacity={0.28}
            scale={5}
            blur={2.6}
            color="#3f356e"
          />
        </Canvas>
      </motion.div>

      {/* SVG fallback positioned underneath to guarantee LCP visual */}
      <noscript>
        <div className="absolute inset-0 grid place-items-center">
          <Isotipo
            className="h-[min(64vh,520px)] w-[min(64vh,520px)] text-[color:var(--ink)]"
            strokeWidth={11}
          />
        </div>
      </noscript>
    </div>
  );
}
