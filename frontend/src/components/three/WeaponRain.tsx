import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

function makeStarGeo() {
  const shape = new THREE.Shape();
  const polar = (a: number, r: number): [number, number] => [Math.cos(a) * r, Math.sin(a) * r];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
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
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.09,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
}

function makeAuraTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(216,180,254,0.95)");
    grad.addColorStop(0.35, "rgba(168,85,247,0.4)");
    grad.addColorStop(1, "rgba(147,51,234,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(c);
}

type Vec3 = [number, number, number];

interface DropProps {
  active: boolean;
  delay: number;
  start: Vec3;
  end: Vec3;
}

function useDropMotion(
  ref: React.RefObject<THREE.Group | null>,
  { active, delay, start, end }: DropProps,
  landedZ: number,
  idleSpin: number
) {
  const startTime = useRef<number | null>(null);
  useFrame(({ clock }, d) => {
    const g = ref.current;
    if (!g) return;
    if (!active) {
      g.position.set(...start);
      g.visible = false;
      startTime.current = null;
      return;
    }
    if (startTime.current === null) startTime.current = clock.elapsedTime;
    const t = clock.elapsedTime - startTime.current - delay;
    const p = Math.min(1, Math.max(0, t / 1.15));
    const e = easeOutBounce(p);
    g.visible = t > 0;
    g.position.set(
      THREE.MathUtils.lerp(start[0], end[0], e) + (p < 1 ? Math.sin(t * 6) * 0.15 : 0),
      THREE.MathUtils.lerp(start[1], end[1], e) +
        (p >= 1 ? Math.sin(clock.elapsedTime * 1.3 + delay * 7) * 0.14 : 0),
      THREE.MathUtils.lerp(start[2], end[2], e)
    );
    if (p >= 1) {
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, landedZ, 4, d);
      g.rotation.y += d * idleSpin;
    } else {
      g.rotation.z += d * 11;
      g.rotation.y += d * 3;
    }
  });
}

function DropStar(props: DropProps & { landedZ: number }) {
  const group = useRef<THREE.Group>(null);
  const geo = useMemo(makeStarGeo, []);
  useDropMotion(group, props, props.landedZ, 0.9);
  return (
    <group ref={group}>
      <mesh geometry={geo} scale={0.72}>
        <meshStandardMaterial color="#c9c9de" metalness={0.75} roughness={0.3} emissive="#9333ea" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function DropKatana(props: DropProps) {
  const group = useRef<THREE.Group>(null);
  const auraBlade = useRef<THREE.SpriteMaterial>(null);
  const auraGuard = useRef<THREE.SpriteMaterial>(null);
  const auraLight = useRef<THREE.PointLight>(null);
  const auraTex = useMemo(makeAuraTexture, []);
  const progress = useRef(0);

  useDropMotion(group, props, -1.05, 0.3);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const vis = g.visible ? 1 : 0;
    const pulse = 0.55 + Math.sin(clock.elapsedTime * 3.2) * 0.25;
    if (auraBlade.current) auraBlade.current.opacity = pulse * 0.55 * vis;
    if (auraGuard.current) auraGuard.current.opacity = pulse * 0.8 * vis;
    if (auraLight.current) auraLight.current.intensity = (14 + Math.sin(clock.elapsedTime * 3.2) * 8) * vis;
    progress.current = pulse;
  });

  return (
    <group ref={group}>
      <sprite position={[0, 1.9, -0.15]} scale={[1.7, 5.4, 1]}>
        <spriteMaterial ref={auraBlade} map={auraTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0} />
      </sprite>
      <sprite position={[0, 0.5, -0.1]} scale={[1.4, 1.4, 1]}>
        <spriteMaterial ref={auraGuard} map={auraTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0} />
      </sprite>
      <pointLight ref={auraLight} position={[0, 1.6, 0.6]} color="#a855f7" intensity={0} distance={7} />
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[0.055, 2.6, 0.016]} />
        <meshStandardMaterial color="#e6e9f7" metalness={0.85} roughness={0.2} emissive="#a855f7" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0.032, 1.9, 0]}>
        <boxGeometry args={[0.008, 2.6, 0.018]} />
        <meshBasicMaterial color="#d8b4fe" transparent opacity={0.95} />
      </mesh>
      <mesh position={[0, 3.22, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.055, 0.08, 0.016]} />
        <meshStandardMaterial color="#e6e9f7" metalness={0.85} roughness={0.2} emissive="#a855f7" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.035, 24]} />
        <meshStandardMaterial color="#1c1428" metalness={0.6} roughness={0.4} emissive="#9333ea" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.055, 0.06, 0.75, 16]} />
        <meshStandardMaterial color="#3b1d63" roughness={0.7} />
      </mesh>
      {[0.02, 0.2, 0.38].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.062, 0.012, 8, 20]} />
          <meshStandardMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={0.8} />
        </mesh>
      ))}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.05, 0.08, 16]} />
        <meshStandardMaterial color="#1c1428" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function WeaponRain({ active }: { active: boolean }) {
  const [enabled] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  if (!enabled) return null;
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 4, 4]} intensity={30} color="#a855f7" />
      <pointLight position={[-5, -3, 3]} intensity={18} color="#22d3ee" />
      <DropStar active={active} delay={0} start={[-2.8, 7.5, -1]} end={[-2.7, 1.9, -1]} landedZ={0.4} />
      <DropStar active={active} delay={0.3} start={[-3.0, 8.5, -1.6]} end={[-2.9, -2.0, -1.6]} landedZ={-0.5} />
      <DropStar active={active} delay={0.55} start={[3.0, 8, -1.8]} end={[2.9, 1.5, -1.8]} landedZ={0.9} />
      <DropKatana active={active} delay={0.85} start={[2.7, 9, -0.6]} end={[2.6, -1.0, -0.6]} />
    </Canvas>
  );
}
