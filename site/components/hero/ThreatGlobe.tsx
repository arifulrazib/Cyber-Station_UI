"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const RADIUS = 2;
const SIGNAL = new THREE.Color("#38bdf8");
const PULSE = new THREE.Color("#34d399");
const THREAT = new THREE.Color("#fb7185");

/** Evenly distributed points on a sphere (Fibonacci lattice). */
function fibonacciSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    out[i * 3] = Math.cos(t) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(t) * r * radius;
  }
  return out;
}

function randomOnSphere(radius: number): THREE.Vector3 {
  const u = Math.random() * 2 - 1;
  const t = Math.random() * Math.PI * 2;
  const r = Math.sqrt(1 - u * u);
  return new THREE.Vector3(r * Math.cos(t), u, r * Math.sin(t)).multiplyScalar(radius);
}

interface Route {
  curve: THREE.QuadraticBezierCurve3;
  line: THREE.Line;
  packet: THREE.Mesh;
  offset: number;
  speed: number;
  hostile: boolean;
  /** Where along the arc a hostile packet gets intercepted (0–1). */
  stopAt: number;
}

function makeRoute(hostileChance: number): Route {
  const a = randomOnSphere(RADIUS);
  let b = randomOnSphere(RADIUS);
  while (a.distanceTo(b) < 1.6) b = randomOnSphere(RADIUS);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.setLength(RADIUS + a.distanceTo(b) * 0.38);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const hostile = Math.random() < hostileChance;

  const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
  const line = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ color: hostile ? THREAT : SIGNAL, transparent: true, opacity: 0.45 }),
  );
  const packet = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 12, 12),
    new THREE.MeshBasicMaterial({ color: hostile ? THREAT : PULSE, transparent: true }),
  );
  return { curve, line, packet, offset: Math.random(), speed: 0.12 + Math.random() * 0.16, hostile, stopAt: 0.45 + Math.random() * 0.3 };
}

function Globe({ quality }: { quality: "high" | "low" }) {
  const group = useRef<THREE.Group>(null);
  const shield = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const count = quality === "high" ? 2200 : 1100;
  const routeCount = quality === "high" ? 22 : 12;

  const positions = useMemo(() => fibonacciSphere(count, RADIUS), [count]);
  const routes = useMemo(() => Array.from({ length: routeCount }, () => makeRoute(0.3)), [routeCount]);

  useEffect(() => {
    return () => {
      routes.forEach((r) => {
        r.line.geometry.dispose();
        (r.line.material as THREE.Material).dispose();
        r.packet.geometry.dispose();
        (r.packet.material as THREE.Material).dispose();
      });
    };
  }, [routes]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    g.rotation.y += dt * 0.08;
    // Gentle pointer parallax.
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.25 + pointer.y * 0.15, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -pointer.x * 0.08, 0.04);

    const t = state.clock.elapsedTime;
    if (shield.current) {
      const m = shield.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.035 + Math.sin(t * 1.2) * 0.015;
    }

    for (const r of routes) {
      r.offset = (r.offset + dt * r.speed) % 1;
      const mat = r.packet.material as THREE.MeshBasicMaterial;
      if (r.hostile && r.offset > r.stopAt) {
        // Intercepted: packet freezes and flares out.
        const k = Math.min((r.offset - r.stopAt) / 0.12, 1);
        r.packet.position.copy(r.curve.getPoint(r.stopAt));
        r.packet.scale.setScalar(1 + k * 3);
        mat.opacity = 1 - k;
      } else {
        r.packet.position.copy(r.curve.getPoint(r.offset));
        r.packet.scale.setScalar(1);
        mat.opacity = 1;
      }
    }
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={SIGNAL} size={0.026} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color="#0b1530" transparent opacity={0.55} />
      </mesh>
      <mesh ref={shield}>
        <sphereGeometry args={[RADIUS * 1.18, 48, 48]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.05} wireframe />
      </mesh>
      {routes.map((r, i) => (
        <group key={i}>
          <primitive object={r.line} />
          <primitive object={r.packet} />
        </group>
      ))}
    </group>
  );
}

/** Pauses rendering while the canvas is off-screen to save GPU and battery. */
function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

export default function ThreatGlobe() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [quality, setQuality] = useState<"high" | "low">("high");

  useEffect(() => {
    const lowPower = window.matchMedia("(max-width: 767px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
    if (lowPower) setQuality("low");
  }, []);

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance" }}
      >
        <Globe quality={quality} />
      </Canvas>
    </div>
  );
}
