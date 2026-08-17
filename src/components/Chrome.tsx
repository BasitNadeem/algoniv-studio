import { useEffect, useRef, useState } from "react";
import { useDocumentProgress, prefersReducedMotion } from "@/lib/motion";

/** Thin signal bar across the top, tied to document scroll. */
export function ScrollProgress() {
  const progress = useDocumentProgress();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px]">
      <div
        className="h-full origin-left bg-signal"
        style={{
          transform: `scaleX(${progress})`,
          boxShadow: "0 0 12px rgba(232,8,8,0.9)",
        }}
      />
    </div>
  );
}

/**
 * A soft red spotlight trailing the pointer, plus a dot that swells over
 * anything interactive. Desktop pointers only — never on touch.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches || prefersReducedMotion()) return;
    setEnabled(true);

    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const hot = !!(e.target as HTMLElement | null)?.closest(
        "a, button, input, textarea, select, [data-hot]",
      );
      dot.dataset.hot = String(hot);
    };

    const loop = () => {
      eased.x += (target.x - eased.x) * 0.14;
      eased.y += (target.y - eased.y) * 0.14;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      aura.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={auraRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[64] h-[320px] w-[320px] rounded-full bleed-signal opacity-50 blur-[6px]"
      />
      <div ref={dotRef} aria-hidden className="cursor-dot" />
    </>
  );
}

/**
 * Short intro: the three insight bars rise, then the panel lifts away.
 * Runs once per tab session so it never becomes an obstacle.
 */
export function Intro() {
  const [state, setState] = useState<"hidden" | "playing" | "lifting">(() => {
    if (typeof window === "undefined") return "hidden";
    if (prefersReducedMotion()) return "hidden";
    // Loading in a background tab throttles timers, which would leave the
    // curtain sitting there. Skip it entirely rather than risk that.
    if (document.visibilityState !== "visible") return "hidden";
    return sessionStorage.getItem("algoniv-intro") ? "hidden" : "playing";
  });

  useEffect(() => {
    if (state !== "playing") return;
    sessionStorage.setItem("algoniv-intro", "1");
    const lift = window.setTimeout(() => setState("lifting"), 1050);
    const done = window.setTimeout(() => setState("hidden"), 1900);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(done);
    };
  }, [state]);

  if (state === "hidden") return null;

  const heights = [46, 66, 30];

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: state === "lifting" ? "translateY(-101%)" : "none" }}
    >
      <div className="flex items-end gap-[7px]">
        {heights.map((h, i) => (
          <span
            key={i}
            className="w-[13px] origin-bottom rounded-full bg-signal"
            style={{
              height: h,
              animation: `bar-rise 620ms cubic-bezier(0.16,1,0.3,1) ${i * 110}ms both`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
