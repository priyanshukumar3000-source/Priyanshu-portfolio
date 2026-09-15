import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import * as THREE from "three";
import { KatanaSlash, type SlashStrike } from "./KatanaSlash";
import { StarTrail } from "./StarTrail";

function useSceneMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

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
type MutableNum = React.MutableRefObject<number | null>;

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
  idleSpin: number,
  impactAt?: MutableNum
) {
  const startTime = useRef<number | null>(null);
  const landed = useRef(false);
  useFrame(({ clock }, d) => {
    const g = ref.current;
    if (!g) return;
    if (!active) {
      g.position.set(...start);
      g.visible = false;
      startTime.current = null;
      landed.current = false;
      if (impactAt) impactAt.current = null;
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
      if (!landed.current) {
        landed.current = true;
        if (impactAt) impactAt.current = clock.elapsedTime;
      }
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, landedZ, 4, d);
      g.rotation.y += d * idleSpin;
    } else {
      g.rotation.z += d * 11;
      g.rotation.y += d * 3;
    }
  });
}

const DUST_COUNT = 16;

function ImpactEffect({ at, position }: { at: MutableNum; position: Vec3 }) {
  const ring = useRef<THREE.Mesh>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const pts = useRef<THREE.Points>(null);
  const ptsMat = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => new Float32Array(DUST_COUNT * 3), []);
  const velocities = useMemo(
    () =>
      Array.from({ length: DUST_COUNT }, () => ({
        x: (Math.random() - 0.5) * 3.2,
        y: Math.random() * 2.4 + 0.6,
        z: (Math.random() - 0.5) * 1.6,
      })),
    []
  );
  const firedAt = useRef<number | null>(null);

  useFrame(({ clock }) => {
    const rm = ringMat.current;
    const pm = ptsMat.current;
    const r = ring.current;
    const p = pts.current;
    if (!rm || !pm || !r || !p) return;
    const t0 = at.current;
    if (t0 === null) {
      rm.opacity = 0;
      pm.opacity = 0;
      return;
    }
    const t = clock.elapsedTime - t0;
    if (t > 0.9) {
      rm.opacity = 0;
      pm.opacity = 0;
      return;
    }
    if (firedAt.current !== t0) {
      firedAt.current = t0;
      positions.fill(0);
    }
    const k = t / 0.9;
    r.scale.setScalar(0.3 + k * 2.8);
    rm.opacity = 0.85 * (1 - k);
    pm.opacity = 0.9 * (1 - k);
    for (let i = 0; i < velocities.length; i++) {
      const v = velocities[i];
      positions[i * 3] = v.x * t;
      positions[i * 3 + 1] = v.y * t - 2.6 * t * t;
      positions[i * 3 + 2] = v.z * t;
    }
    p.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={position}>
      <mesh ref={ring}>
        <ringGeometry args={[0.42, 0.54, 40]} />
        <meshBasicMaterial
          ref={ringMat}
          color="#c084fc"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <points ref={pts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={ptsMat}
          size={0.12}
          color="#e9d5ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function DropStar(props: DropProps & { landedZ: number }) {
  const group = useRef<THREE.Group>(null);
  const impactAt = useRef<number | null>(null);
  const geo = useMemo(makeStarGeo, []);
  useDropMotion(group, props, props.landedZ, 0.9, impactAt);
  return (
    <>
      <group ref={group}>
        <mesh geometry={geo} scale={0.72}>
          <meshStandardMaterial color="#c9c9de" metalness={0.75} roughness={0.3} emissive="#9333ea" emissiveIntensity={0.4} />
        </mesh>
      </group>
      <ImpactEffect at={impactAt} position={props.end} />
    </>
  );
}

interface KatanaProps extends DropProps {
  hitTarget: React.RefObject<HTMLButtonElement | null>;
  slashAction: React.MutableRefObject<(() => void) | null>;
  onSlash: (strike: SlashStrike) => void;
  reducedMotion: boolean;
}

function DropKatana(props: KatanaProps) {
  const group = useRef<THREE.Group>(null);
  const auraBlade = useRef<THREE.SpriteMaterial>(null);
  const auraGuard = useRef<THREE.SpriteMaterial>(null);
  const auraLight = useRef<THREE.PointLight>(null);
  const impactAt = useRef<number | null>(null);
  const auraTex = useMemo(makeAuraTexture, []);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const tipPos = useMemo(() => new THREE.Vector3(), []);
  const guardPos = useMemo(() => new THREE.Vector3(), []);
  const slashAt = useRef<number | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const flare = useRef(0);
  const { camera, gl } = useThree();
  const { hitTarget, slashAction, onSlash, active, reducedMotion } = props;

  useDropMotion(group, props, -1.05, 0.3, impactAt);

  useEffect(() => {
    slashAction.current = () => {
      const g = group.current;
      const now = performance.now();
      if (!active || !g?.visible || impactAt.current === null || (slashAt.current !== null && now - slashAt.current < 900)) return;
      const rect = gl.domElement.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      g.updateWorldMatrix(true, false);
      g.localToWorld(guardPos.set(0, 0.58, 0)).project(camera);
      g.localToWorld(tipPos.set(0, 3.22, 0)).project(camera);
      const x = rect.left + (guardPos.x + 1) * rect.width / 2;
      const y = rect.top + (1 - guardPos.y) * rect.height / 2;
      const dx = (tipPos.x - guardPos.x) * rect.width / 2;
      const dy = (guardPos.y - tipPos.y) * rect.height / 2;
      slashAt.current = now;
      onSlash({ at: now, x, y, radius: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) });
    };
    return () => { slashAction.current = null; };
  }, [active, camera, gl, guardPos, tipPos, onSlash, slashAction]);

  useEffect(() => {
    if (!active) slashAt.current = null;
    const target = hitTarget.current;
    return () => { if (target) target.hidden = true; };
  }, [active, hitTarget]);
  useEffect(() => () => auraTex.dispose(), [auraTex]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }, d) => {
    const g = group.current;
    if (!g) return;
    const vis = g.visible ? 1 : 0;
    const elapsed = slashAt.current === null ? 1 : (performance.now() - slashAt.current) / 1000;
    const slashing = elapsed < 0.9;
    if (slashing && !reducedMotion) {
      const sweep = elapsed < 0.065 ? -0.12 * elapsed / 0.065
        : elapsed < 0.32 ? THREE.MathUtils.lerp(-0.12, Math.PI * 7 / 6, 1 - (1 - (elapsed - 0.065) / 0.255) ** 3)
        : Math.PI * 7 / 6 * (1 - THREE.MathUtils.smoothstep(elapsed, 0.5, 0.9));
      g.rotation.z = -1.05 - sweep;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, 0, 22, d);
    }

    g.updateWorldMatrix(true, false);
    g.localToWorld(worldPos.set(0, 1.9, 0)).project(camera);
    g.localToWorld(guardPos.set(0, 0.58, 0)).project(camera);
    g.localToWorld(tipPos.set(0, 3.22, 0)).project(camera);
    const rect = gl.domElement.getBoundingClientRect();
    const sx = rect.left + ((worldPos.x + 1) / 2) * rect.width;
    const sy = rect.top + ((1 - worldPos.y) / 2) * rect.height;
    const target = hitTarget.current;
    if (target) {
      target.hidden = !active || !g.visible || impactAt.current === null;
      target.disabled = slashing || target.hidden;
      target.dataset.state = target.hidden ? "landing" : slashing ? "slashing" : "ready";
      if (!target.hidden && !slashing) {
        const dx = (tipPos.x - guardPos.x) * rect.width / 2;
        const dy = (guardPos.y - tipPos.y) * rect.height / 2;
        const angle = Math.atan2(dx, -dy);
        target.style.left = `${(worldPos.x + 1) * rect.width / 2}px`;
        target.style.top = `${(1 - worldPos.y) * rect.height / 2}px`;
        target.style.height = `${Math.hypot(dx, dy) + 28}px`;
        target.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
        target.style.setProperty("--katana-angle", `${angle}rad`);
      }
    }
    const dist = Math.hypot(mouse.current.x - sx, mouse.current.y - sy);
    flare.current = THREE.MathUtils.damp(flare.current, dist < 180 || target === document.activeElement ? 1 : 0, 6, d);

    const strikeGlow = slashing ? Math.sin(Math.min(1, elapsed / 0.9) * Math.PI) * (reducedMotion ? 0.5 : 2) : 0;
    const boost = 1 + flare.current * 1.7 + strikeGlow;
    const pulse = 0.55 + Math.sin(clock.elapsedTime * 3.2) * 0.25;
    if (auraBlade.current) auraBlade.current.opacity = pulse * 0.55 * vis * boost;
    if (auraGuard.current) auraGuard.current.opacity = pulse * 0.8 * vis * boost;
    if (auraLight.current)
      auraLight.current.intensity = (14 + Math.sin(clock.elapsedTime * 3.2) * 8) * vis * boost;
  });

  return (
    <>
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
      <ImpactEffect at={impactAt} position={props.end} />
    </>
  );
}

function OrbitStar({ progress, active, reducedMotion }: { progress: MotionValue<number>; active: boolean; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const aura = useRef<THREE.SpriteMaterial>(null);
  const geo = useMemo(makeStarGeo, []);
  const auraTex = useMemo(makeAuraTexture, []);
  const orbitAngle = useRef<number | null>(null);
  useEffect(() => () => { geo.dispose(); auraTex.dispose(); }, [geo, auraTex]);
  useFrame(({ clock }, d) => {
    const g = ref.current;
    if (!g) return;
    const targetAngle = progress.get() * Math.PI * 3 + clock.elapsedTime * 0.3;
    orbitAngle.current = reducedMotion ? 0.9 : orbitAngle.current === null ? targetAngle
      : THREE.MathUtils.damp(orbitAngle.current, targetAngle, 7, d);
    const a = orbitAngle.current;
    const z = Math.sin(a + Math.PI / 3) * 1.6 - 0.4;
    g.position.set(Math.cos(a) * 4.4, Math.sin(a) * 2.4 - 0.2, z);
    const depth = THREE.MathUtils.mapLinear(z, -2, 1.2, 0.6, 1.1);
    g.scale.setScalar(depth);
    if (!reducedMotion) g.rotation.z += d * 4.5;
    g.rotation.x = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.8) * 0.4;
    if (aura.current) aura.current.opacity = reducedMotion ? 0.4 : 0.5 + Math.sin(clock.elapsedTime * 2.5) * 0.2;
  }, -2);
  return (
    <>
      <group ref={ref}>
        <sprite position={[0, 0, -0.2]} scale={[2.6, 2.6, 1]}>
          <spriteMaterial ref={aura} map={auraTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.4} />
        </sprite>
        <mesh geometry={geo}>
          <meshStandardMaterial color="#c9c9de" metalness={0.75} roughness={0.3} emissive="#a855f7" emissiveIntensity={0.5} />
        </mesh>
      </group>
      {!reducedMotion && <StarTrail target={ref} active={active} />}
    </>
  );
}

export function OrbitStarScene({ progress, active }: { progress: MotionValue<number>; active: boolean }) {
  const enabled = useSceneMedia("(min-width: 768px)");
  const reducedMotion = useSceneMedia("(prefers-reduced-motion: reduce)");
  if (!enabled) return null;
  return (
    <Canvas
      data-testid="skills-star-trail-scene"
      data-trail={reducedMotion ? "reduced-motion" : active ? "active" : "paused"}
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={25} color="#a855f7" />
      <OrbitStar progress={progress} active={active} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

export function WeaponRain({ active }: { active: boolean }) {
  const enabled = useSceneMedia("(min-width: 768px)");
  const reducedMotion = useSceneMedia("(prefers-reduced-motion: reduce)");
  const hitTarget = useRef<HTMLButtonElement>(null);
  const slashAction = useRef<(() => void) | null>(null);
  const [strike, setStrike] = useState<SlashStrike | null>(null);
  useEffect(() => {
    if (!strike) return;
    const timeout = window.setTimeout(() => setStrike(null), 900);
    return () => window.clearTimeout(timeout);
  }, [strike]);
  useEffect(() => { if (!active || !enabled) setStrike(null); }, [active, enabled]);
  if (!enabled) return null;
  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[5, 4, 4]} intensity={30} color="#a855f7" />
        <pointLight position={[-5, -3, 3]} intensity={18} color="#22d3ee" />
        <DropStar active={active} delay={0} start={[-2.8, 7.5, -1]} end={[-2.7, 1.9, -1]} landedZ={0.4} />
        <DropStar active={active} delay={0.3} start={[-3.0, 8.5, -1.6]} end={[-2.9, -2.0, -1.6]} landedZ={-0.5} />
        <DropStar active={active} delay={0.55} start={[3.0, 8, -1.8]} end={[2.9, 1.5, -1.8]} landedZ={0.9} />
        <DropKatana active={active} delay={0.85} start={[2.7, 9, -0.6]} end={[2.6, -1.0, -0.6]}
          hitTarget={hitTarget} slashAction={slashAction} onSlash={setStrike} reducedMotion={reducedMotion} />
      </Canvas>
      <button
        ref={hitTarget}
        type="button"
        hidden
        data-testid="about-katana-slash-button"
        data-state="landing"
        aria-label="Slash with the About katana"
        className="katana-hit-target"
        onClick={() => slashAction.current?.()}
      >
        <span className="katana-hit-label" aria-hidden="true" data-testid="katana-slash-hint">CLICK TO SLASH</span>
      </button>
      {strike && <KatanaSlash key={strike.at} strike={strike} reducedMotion={reducedMotion} />}
    </>
  );
}
