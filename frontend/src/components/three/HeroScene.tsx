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

function Shuriken({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    const pts: [number, number][] = [
      [0, 1.15], [0.24, 0.24], [1.15, 0], [0.24, -0.24],
      [0, -1.15], [-0.24, -0.24], [-1.15, 0], [-0.24, 0.24],
    ];
    s.moveTo(pts[0][0], pts[0][1]);
    pts.slice(1).forEach(([px, py]) => s.lineTo(px, py));
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: false });
  }, []);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.z = clock.elapsedTime * 1.9;
    m.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.55;
    m.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8) * 0.3;
  });
  return (
    <mesh ref={ref} geometry={geo} position={position}>
      <meshStandardMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={1.7} wireframe />
    </mesh>
  );
}

function EnergyOrb({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.18;
    m.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.28, 24, 24]} />
      <meshBasicMaterial color="#e9d5ff" transparent opacity={0.85} />
    </mesh>
  );
}

function NinjaStar({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const blades = 4;
    const polar = (a: number, r: number): [number, number] => [Math.cos(a) * r, Math.sin(a) * r];
    for (let i = 0; i < blades; i++) {
      const a = (i / blades) * Math.PI * 2;
      const [tx, ty] = polar(a, 0.95);
      const [cx1, cy1] = polar(a - 0.35, 0.52);
      const [px, py] = polar(a + 1.15, 0.24);
      const [cx2, cy2] = polar(a + 0.75, 0.3);
      if (i === 0) shape.moveTo(tx, ty);
      else shape.quadraticCurveTo(cx1, cy1, tx, ty);
      shape.quadraticCurveTo(cx2, cy2, px, py);
    }
    shape.closePath();
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.1, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.09, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 });
  }, []);
  useFrame(({ clock }, d) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.z += d * 3.2;
    m.rotation.x = Math.sin(clock.elapsedTime * 0.6) * 0.5;
    m.position.y = position[1] + Math.sin(clock.elapsedTime * 0.9) * 0.28;
  });
  return (
    <mesh ref={ref} geometry={geo} position={position}>
      <meshStandardMaterial color="#c9c9de" metalness={0.75} roughness={0.3} emissive="#9333ea" emissiveIntensity={0.35} />
    </mesh>
  );
}

function Katana({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const blade = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const g = group.current;
    if (!g) return;
    g.rotation.z = -0.9 + Math.sin(t * 0.4) * 0.12;
    g.rotation.y = t * 0.35;
    g.position.y = position[1] + Math.sin(t * 0.7) * 0.25;
    const cycle = t % 7;
    const draw = cycle < 1 ? Math.sin(cycle * Math.PI) : 0;
    if (blade.current) blade.current.position.y = draw * 0.55;
  });
  return (
    <group ref={group} position={position}>
      <group ref={blade}>
        <mesh position={[0, 1.9, 0]}>
          <boxGeometry args={[0.055, 2.6, 0.016]} />
          <meshStandardMaterial color="#dfe3f2" metalness={0.85} roughness={0.25} emissive="#8ab4ff" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0.032, 1.9, 0]}>
          <boxGeometry args={[0.008, 2.6, 0.018]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 3.22, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.055, 0.08, 0.016]} />
          <meshStandardMaterial color="#dfe3f2" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.035, 24]} />
        <meshStandardMaterial color="#1c1428" metalness={0.6} roughness={0.4} emissive="#9333ea" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.055, 0.06, 0.75, 16]} />
        <meshStandardMaterial color="#3b1d63" roughness={0.7} />
      </mesh>
      {[0.02, 0.2, 0.38].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.062, 0.012, 8, 20]} />
          <meshStandardMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={0.6} />
        </mesh>
      ))}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.08, 16]} />
        <meshStandardMaterial color="#1c1428" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
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
        <Shuriken position={[6.2, -0.8, -3.5]} />
        <NinjaStar position={[-5.2, 2.3, -1.4]} />
        <Katana position={[-5.8, -1.6, -1.8]} />
        <EnergyOrb position={[-2.2, 2.8, -2]} />
        <EnergyOrb position={[2.6, -2.9, -1]} />
        <GlowRing radius={2.6} y={0.2} speed={0.25} color="#a855f7" />
        <GlowRing radius={3.4} y={0.2} speed={-0.18} color="#22d3ee" />
      </Rig>
    </Canvas>
  );
}
