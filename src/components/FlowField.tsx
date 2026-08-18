import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The backdrop for the name reveal, driven by the same scroll.
 *
 * Particles drift along a vector field. Early in the section that field is pure
 * turbulence — every particle wandering on its own heading, going nowhere. As
 * the scroll advances the turbulence gives way to a coherent orbit around the
 * centre of the stage, so the drift organises itself into streams circling the
 * point where `ai` resolves.
 *
 * Nothing here draws the logo or spells anything. It is the behaviour that
 * carries the meaning: undirected motion becoming structured motion, with the
 * middle of the name as the thing it organises around.
 */

const COUNT = 760;
const INK = "10, 10, 10";
const CLEAR_RADIUS = 96;

type Particle = { x: number; y: number; age: number; life: number; seed: number };

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number) => Math.min(1, Math.max(0, v));

export default function FlowField({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      age: 0,
      life: 140 + Math.random() * 320,
      seed: Math.random() * Math.PI * 2,
    });

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${INK})`;
      ctx.fillRect(0, 0, width, height);
      particles = Array.from({ length: COUNT }, spawn);
    };

    build();
    window.addEventListener("resize", build);

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const p = progressRef.current;

      // How much of the motion is organised rather than turbulent.
      const coherence = smooth(clamp((p - 0.05) / 0.75));

      // Trails: veil the previous frame instead of clearing it, so movement
      // leaves streaks rather than dots.
      ctx.fillStyle = `rgba(${INK}, ${0.13 - coherence * 0.05})`;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < particles.length; i++) {
        const q = particles[i];

        // Turbulent heading — cheap layered trig standing in for curl noise.
        const angle =
          Math.sin(q.x * 0.0031 + t * 0.11) * 2.3 +
          Math.cos(q.y * 0.0026 - t * 0.09) * 2.3 +
          Math.sin((q.x + q.y) * 0.0014 + q.seed) * 1.7;
        const tx = Math.cos(angle);
        const ty = Math.sin(angle);

        // Organised heading — orbit the centre with a gentle inward pull.
        const dx = cx - q.x;
        const dy = cy - q.y;
        const r = Math.hypot(dx, dy) || 1;
        const ox = -dy / r + (dx / r) * 0.26;
        const oy = dx / r + (dy / r) * 0.26;
        const on = Math.hypot(ox, oy) || 1;

        let vx = tx + (ox / on - tx) * coherence;
        let vy = ty + (oy / on - ty) * coherence;
        const vn = Math.hypot(vx, vy) || 1;

        const speed = (reduce ? 0 : 0.9 + coherence * 0.85) * (0.8 + (i % 7) * 0.05);
        vx = (vx / vn) * speed;
        vy = (vy / vn) * speed;

        q.x += vx;
        q.y += vy;
        q.age += 1;

        // Recycle anything that leaves, expires, or reaches the middle — the
        // centre stays clear so the type never sits on a hot spot.
        if (
          q.age > q.life ||
          q.x < -40 ||
          q.x > width + 40 ||
          q.y < -40 ||
          q.y > height + 40 ||
          Math.hypot(cx - q.x, cy - q.y) < CLEAR_RADIUS
        ) {
          particles[i] = spawn();
          continue;
        }

        // Fade in and out across a particle's life so nothing pops.
        const fade = Math.min(1, Math.min(q.age, q.life - q.age) / 45);
        // Ease off near the middle so the clearing has a soft edge.
        const edge = clamp((Math.hypot(cx - q.x, cy - q.y) - CLEAR_RADIUS) / 130);
        const a = fade * edge * (0.16 + coherence * 0.5);
        const flare = i % 23 === 0 ? 1.9 : 1;

        ctx.fillStyle =
          coherence > 0.04
            ? `rgba(232, 8, 8, ${a * flare})`
            : `rgba(226, 226, 226, ${a * 0.75 * flare})`;
        ctx.fillRect(q.x, q.y, 1.6, 1.6);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
