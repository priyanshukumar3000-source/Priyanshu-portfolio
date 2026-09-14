import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 550 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#c084fc" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

interface ShapeProps {
  position: [number, number, number];
  kind: "icosa" | "torus" | "octa";
  speed: number;
  color?: string;
}

function FloatingShape({ position, kind, speed, color = "#9333ea" }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);
  const base = position[1];
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const t = clock.elapsedTime * speed;
    m.rotation.x = t * 0.4;
    m.rotation.y = t * 0.6;
    m.position.y = base + Math.sin(t) * 0.35;
  });
  return (
    <mesh ref={ref} position={position}>
      {kind === "icosa" && <icosahedronGeometry args={[0.55, 0]} />}
      {kind === "octa" && <octahedronGeometry args={[0.5, 0]} />}
      {kind === "torus" && <torusGeometry args={[0.5, 0.18, 12, 32]} />}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} wireframe />
    </mesh>
  );
}

function GlowRing({ radius, y, speed, color }: { radius: number; y: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.z = clock.elapsedTime * speed;
    m.rotation.x = Math.PI / 2.4 + Math.sin(clock.elapsedTime * 0.3) * 0.12;
  });
  return (
    <mesh ref={ref} position={[3.4, y, -2.5]}>
      <torusGeometry args={[radius, 0.015, 8, 90]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, d) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.12, 2.5, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.08, 2.5, d);
  });
  return <group ref={ref}>{children}</group>;
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 4, 4]} intensity={40} color="#a855f7" />
      <pointLight position={[-6, -3, 2]} intensity={25} color="#22d3ee" />
      <Rig>
        <Particles />
        <FloatingShape position={[-4.4, 1.8, -3]} kind="icosa" speed={0.5} />
        <FloatingShape position={[4.8, -2.2, -2]} kind="octa" speed={0.7} color="#22d3ee" />
        <FloatingShape position={[-3.2, -2.6, -4]} kind="torus" speed={0.4} color="#7c3aed" />
        <FloatingShape position={[5.6, 2.6, -5]} kind="icosa" speed={0.6} color="#c084fc" />
        <GlowRing radius={2.6} y={0.2} speed={0.25} color="#a855f7" />
        <GlowRing radius={3.4} y={0.2} speed={-0.18} color="#22d3ee" />
      </Rig>
    </Canvas>
  );
}
