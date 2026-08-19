import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The moving part of the hero headline. Words swap on a mask, and the red
 * measure rule beneath resizes to each one — the studio's four disciplines
 * stated as one sentence instead of a list.
 */
export default function RotatingWord({
  words,
  interval = 2500,
}: {
  words: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const sizerRef = useRef<HTMLSpanElement>(null);

  // Measure every word up front so the rule and the box never resize late.
  const measure = () => {
    const sizer = sizerRef.current;
    if (!sizer) return;
    setWidths(Array.from(sizer.children).map((c) => c.getBoundingClientRect().width));
  };

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [words]);

  useEffect(() => {
    if (!document.fonts?.ready) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [words]);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  const width = widths[index];

  return (
    <span className="relative inline-block align-baseline">
      {/* Hidden sizer: same type, measured once, never painted. `invisible`
          keeps its text out of anything copied, but visibility alone does NOT
          keep its boxes out of selection *geometry*. It sat directly over the
          headline, so its five word boxes punched notches into the selection
          highlight. select-none takes it out of user selections and the offset
          parks any residual geometry off-screen. Width is unaffected: the row
          is nowrap, so position cannot change what it measures. */}
      <span
        ref={sizerRef}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 -left-[9999px] select-none whitespace-nowrap"
      >
        {words.map((w) => (
          <span key={w} className="accent inline-block">
            {w}
          </span>
        ))}
      </span>

      <span className="swap relative" style={width ? { width } : undefined}>
        <span
          key={index}
          className="accent block whitespace-nowrap text-signal"
          style={
            prefersReducedMotion()
              ? undefined
              : { animation: "word-up 0.72s cubic-bezier(0.16,1,0.3,1)" }
          }
        >
          {words[index]}
        </span>
      </span>

      {/* Measure rule */}
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 block h-[3px] bg-signal transition-[width] duration-[620ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: width ?? 0 }}
      />
    </span>
  );
}
