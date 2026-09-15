import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const SAMPLES = 64;
const LIFETIME = 2.1;

export function StarTrail({ target, active }: { target: React.RefObject<THREE.Group | null>; active: boolean }) {
  const count = useRef(0);
  const lastSample = useRef(0);
  const history = useMemo(() => Array.from({ length: SAMPLES }, () => new THREE.Vector3()), []);
  const times = useMemo(() => new Float64Array(SAMPLES), []);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SAMPLES * 6), 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(SAMPLES * 6), 3).setUsage(THREE.DynamicDrawUsage));
    const indices: number[] = [];
    for (let i = 0; i < SAMPLES - 1; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 2, a + 1, a + 3);
    }
    geo.setIndex(indices);
    geo.setDrawRange(0, 0);
    return geo;
  }, []);
  const colors = useMemo(() => ({
    head: new THREE.Color("#ede9fe"), middle: new THREE.Color("#a855f7"), tail: new THREE.Color("#22d3ee"), mixed: new THREE.Color(),
  }), []);

  useEffect(() => {
    count.current = 0;
    geometry.setDrawRange(0, 0);
  }, [active, geometry]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  // Runs after OrbitStar's movement callback, keeping the newest point attached to the star.
  useFrame(({ clock }, delta) => {
    const star = target.current;
    if (!active || !star) return;
    const now = clock.elapsedTime;
    if (delta > 0.25 || (count.current > 0 && history[0].distanceToSquared(star.position) > 16)) count.current = 0;
    if (count.current === 0) {
      history[0].copy(star.position);
      times[0] = now;
      lastSample.current = now;
      count.current = 1;
    }
    if (now - lastSample.current >= 1 / 30) {
      const end = Math.min(count.current, SAMPLES - 1);
      for (let i = end; i > 0; i--) {
        history[i].copy(history[i - 1]);
        times[i] = times[i - 1];
      }
      count.current = Math.min(count.current + 1, SAMPLES);
      lastSample.current = now;
    }
    history[0].copy(star.position);
    times[0] = now;
    while (count.current > 1 && now - times[count.current - 1] > LIFETIME) count.current--;

    const positions = geometry.getAttribute("position") as THREE.BufferAttribute;
    const tint = geometry.getAttribute("color") as THREE.BufferAttribute;
    for (let i = 0; i < count.current; i++) {
      const p = history[i];
      const ahead = history[Math.max(0, i - 1)];
      const behind = history[Math.min(count.current - 1, i + 1)];
      const dx = ahead.x - behind.x;
      const dy = ahead.y - behind.y;
      const length = Math.hypot(dx, dy) || 1;
      const age = THREE.MathUtils.clamp((now - times[i]) / LIFETIME, 0, 1);
      const fade = (1 - age) ** 1.8;
      const width = 0.18 * fade;
      colors.mixed.copy(age < 0.4 ? colors.head : colors.middle)
        .lerp(age < 0.4 ? colors.middle : colors.tail, age < 0.4 ? age / 0.4 : (age - 0.4) / 0.6)
        .multiplyScalar(fade);
      for (let side = 0; side < 2; side++) {
        const sign = side === 0 ? -1 : 1;
        positions.setXYZ(i * 2 + side, p.x - dy / length * width * sign, p.y + dx / length * width * sign, p.z - 0.12);
        tint.setXYZ(i * 2 + side, colors.mixed.r, colors.mixed.g, colors.mixed.b);
      }
    }
    positions.needsUpdate = true;
    tint.needsUpdate = true;
    geometry.setDrawRange(0, Math.max(0, count.current - 1) * 6);
  }, -1);

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <meshBasicMaterial vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}
