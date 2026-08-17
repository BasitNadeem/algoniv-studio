import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The hero's idea, made literal: noise resolving into signal.
 *
 * The field is a grid of bars at pseudo-random heights — visual noise. Wherever
 * the pointer goes, the bars inside its reach snap into the Algoniv mark's own
 * rhythm (medium, tall, short, repeating, at the proportions from the brand
 * guide) and warm to Signal Red. Pattern found, complexity crossed out.
 *
 * With no pointer yet — first load, or a touch device — a scan sweeps across on
 * its own so the effect introduces itself.
 */

/* Rows are spaced wider than columns so a fully resolved bar still clears the
   row beneath it — otherwise the rhythm smears into continuous streaks. */
const SPACING_X = 26;
const SPACING_Y = 48;
const BAR_W = 3;
const REACH = 250;
const TRAIL = 16;

// Brand bar proportions: 25.04 · 35.51 · 16.74 pt, normalised to the tallest.
const RHYTHM = [0.705, 1, 0.471];

/** Stable per-cell noise, so the resting field doesn't shimmer randomly. */
function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export default function CursorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let originX = 0;
    let originY = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING_X) + 1;
      rows = Math.ceil(height / SPACING_Y) + 1;
      originX = (width - (cols - 1) * SPACING_X) / 2;
      originY = (height - (rows - 1) * SPACING_Y) / 2;
    };
    resize();

    const trail: { x: number; y: number; life: number }[] = [];
    const pointer = { x: 0, y: 0, live: false };
    let idleSince = performance.now();

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.live = pointer.y > -240 && pointer.y < rect.height + 240;
      idleSince = performance.now();
      if (pointer.live) {
        trail.unshift({ x: pointer.x, y: pointer.y, life: 1 });
        if (trail.length > TRAIL) trail.pop();
      }
    };
    const onPointerLeave = () => {
      pointer.live = false;
      idleSince = performance.now();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = reduce ? 0 : (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Self-demonstrating sweep until the pointer takes over.
      const idle = now - idleSince > 2200 || !pointer.live;
      const scanX = ((t * 0.19) % 1.4) * width - width * 0.2;
      const scanY = height * (0.46 + Math.sin(t * 0.31) * 0.12);

      for (let i = 0; i < trail.length; i++) trail[i].life *= 0.912;

      for (let cx = 0; cx < cols; cx++) {
        const x = originX + cx * SPACING_X;

        for (let cy = 0; cy < rows; cy++) {
          const y = originY + cy * SPACING_Y;

          // Resting state: noise. Heights are unrelated cell to cell.
          const noise = hash(cx, cy);
          const drift = reduce ? 0 : Math.sin(t * 0.6 + noise * 12) * 0.12;
          const noiseH = 3 + (noise * 0.8 + drift) * 13;

          // Resolved state: the mark's rhythm, in phase across the whole grid.
          const orderedH = 6 + RHYTHM[cx % 3] * 32;

          let resolve = 0;

          if (pointer.live) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            if (d < REACH) resolve += Math.pow(1 - d / REACH, 1.9);
          }

          for (let i = 0; i < trail.length; i++) {
            const p = trail[i];
            if (p.life < 0.05) continue;
            const d = Math.hypot(x - p.x, y - p.y);
            const r = REACH * 0.72;
            if (d < r) resolve += Math.pow(1 - d / r, 2.3) * 0.42 * p.life;
          }

          if (idle && !reduce) {
            const d = Math.hypot((x - scanX) * 0.62, y - scanY);
            const r = REACH * 1.05;
            if (d < r) resolve += Math.pow(1 - d / r, 2) * 0.85;
          }

          resolve = Math.min(1, resolve);
          if (resolve < 0.004 && noiseH < 4) continue;

          const barH = noiseH + (orderedH - noiseH) * resolve;

          if (resolve > 0.03) {
            ctx.fillStyle = `rgba(232, 8, 8, ${0.12 + resolve * 0.82})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + noise * 0.09})`;
          }

          ctx.fillRect(x - BAR_W / 2, y - barH / 2, BAR_W, barH);
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}
