import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Single observer for every `.rise` / `.wipe` element on the page.
 * `data-delay` (ms) staggers siblings.
 */
export function useRevealAll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rise, .wipe"));
    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          window.setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Attach to any element to learn when it first enters the viewport. */
export function useInViewRef<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Tracks a vertical list of elements against a reading line partway down the
 * viewport: which one is currently being read, and how far through the list we
 * are overall.
 *
 * Deliberately measures the elements themselves rather than deriving an index
 * from one container's scroll progress — a container only slightly taller than
 * the viewport gives almost no travel, which makes the index leap several
 * entries at once instead of advancing one at a time.
 */
export function useReadingIndex(count: number, linePosition = 0.42) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * linePosition;
      let current = 0;
      let within = 0;

      refs.current.slice(0, count).forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) {
          current = i;
          within = Math.min(1, Math.max(0, (line - rect.top) / Math.max(1, rect.height)));
        }
      });

      setActive(current);
      setProgress(Math.min(1, (current + within) / count));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, linePosition]);

  return { refs, active, progress };
}

/** Continuously reports whether an element is on screen (unlike useInViewRef). */
export function useOnScreen<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, onScreen };
}

/**
 * How far a tall element has travelled through the viewport, 0 → 1.
 * Used to drive the pinned horizontal rail and the approach spine.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, -rect.top / distance)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

/** Overall document scroll, 0 → 1, for the top progress bar. */
export function useDocumentProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

/** Which section id is currently occupying the middle of the screen. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight * 0.45;
      let current = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) current = id;
      });
      if (current) setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}

/**
 * Pointer-tracked light on `.spot` elements. One delegated listener rather than
 * one per card.
 */
export function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spot");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}

/** Counts to `target` once the element is on screen. */
export function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  duration = 1700,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const decimals = target % 1 === 0 ? 0 : 1;
    const write = (v: number) => {
      el.textContent = v.toFixed(decimals);
    };

    if (prefersReducedMotion()) {
      write(target);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          write(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, target, duration]);
}

/** Live wall clock in a fixed zone — cheap way to make the page feel awake. */
export function useClock(timeZone = "Asia/Karachi") {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

/**
 * Monotonic counter for looping UI. Pass `running: false` to stop it while the
 * consumer is off screen so nothing burns cycles unseen.
 */
export function useTick(ms: number, running = true) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [ms, running]);

  return tick;
}

/** Rotates an index on an interval; pauses when `paused` is true. */
export function useAutoRotate(length: number, ms: number, paused = false) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || length <= 1 || prefersReducedMotion()) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [length, ms, paused]);

  return [index, setIndex] as const;
}
