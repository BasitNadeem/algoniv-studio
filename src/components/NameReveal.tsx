import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/lib/motion";
import FlowField from "./FlowField";

const LETTERS = "algoniv".split("");
const KEEP = new Set([0, 5]); // the a and the i

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// #efedea → #e80808
const PAPER = [239, 237, 234];
const SIGNAL = [232, 8, 8];

type Metrics = { left: number; width: number };

/**
 * Scroll-driven brand statement: the word `algoniv` is set out in full, then
 * the letters that aren't the a or the i fall away while those two travel
 * together into the centre and turn red — leaving `ai` sitting in the middle
 * of the name it was always inside.
 *
 * Set in the site's display face, deliberately unlike the outlined Quicksand
 * wordmark, so this reads as a typographic device and never as the logo.
 */
export default function NameReveal() {
  const { ref: trackRef, progress } = useScrollProgress<HTMLDivElement>();
  const rowRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [metrics, setMetrics] = useState<Metrics[]>([]);

  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const rowBox = row.getBoundingClientRect();
    const next = letterRefs.current.map((el) => {
      if (!el) return { left: 0, width: 0 };
      const box = el.getBoundingClientRect();
      return { left: box.left - rowBox.left, width: box.width };
    });
    setMetrics(next);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    // Widths shift once the display face swaps in, so measure again after it lands.
    if (!document.fonts?.ready) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [measure]);

  // Phases, deliberately overlapping so it reads as one continuous move.
  const tint = clamp((progress - 0.04) / 0.26);
  const dissolve = clamp((progress - 0.1) / 0.34);
  const converge = easeInOut(clamp((progress - 0.28) / 0.44));
  const caption = clamp((progress - 0.74) / 0.22);

  // Where the a and the i end up: side by side, centred in the row.
  let deltaA = 0;
  let deltaI = 0;
  if (metrics.length === LETTERS.length && metrics[5].width > 0) {
    const rowWidth = rowRef.current?.getBoundingClientRect().width ?? 0;
    const pairWidth = metrics[0].width + metrics[5].width;
    const pairLeft = (rowWidth - pairWidth) / 2;
    deltaA = pairLeft - metrics[0].left;
    deltaI = pairLeft + metrics[0].width - metrics[5].left;
  }

  const pairColor = `rgb(${Math.round(lerp(PAPER[0], SIGNAL[0], tint))}, ${Math.round(
    lerp(PAPER[1], SIGNAL[1], tint),
  )}, ${Math.round(lerp(PAPER[2], SIGNAL[2], tint))})`;

  return (
    <div ref={trackRef} className="relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        {/* Turbulence finding coherence, on the same scroll as the word. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <FlowField progress={progress} />
        </div>

        <div
          className="pointer-events-none absolute h-[620px] w-[900px] bleed-signal transition-opacity duration-700"
          style={{ opacity: 0.25 + converge * 0.55 }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8">
          <div className="rise flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-signal/50" />
            <span className="micro text-signal">Brand philosophy</span>
            <span className="h-px w-10 bg-signal/50" />
          </div>

          {/* The word */}
          <div
            ref={rowRef}
            className="relative mt-12 flex w-full items-baseline justify-center select-none"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(3.4rem, 14vw, 12rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
            aria-label="algoniv"
          >
            {LETTERS.map((letter, i) => {
              const keep = KEEP.has(i);
              const delta = i === 0 ? deltaA : i === 5 ? deltaI : 0;

              // Non-ai letters leave in place, staggered outward from the pair.
              const stagger = 1 + Math.abs(i - 2.5) * 0.06;
              const gone = clamp(dissolve * stagger);

              return (
                <span
                  key={`${letter}-${i}`}
                  ref={(el) => {
                    letterRefs.current[i] = el;
                  }}
                  aria-hidden
                  className="inline-block will-change-transform"
                  style={
                    keep
                      ? {
                          color: pairColor,
                          transform: `translateX(${delta * converge}px)`,
                          textShadow:
                            converge > 0.1
                              ? `0 0 ${34 * converge}px rgba(232,8,8,${0.42 * converge})`
                              : "none",
                        }
                      : {
                          opacity: 1 - gone,
                          transform: `translateY(${gone * -18}px) scale(${1 - gone * 0.22})`,
                          filter: `blur(${gone * 7}px)`,
                        }
                  }
                >
                  {letter}
                </span>
              );
            })}
          </div>

          {/* Resolve */}
          <div
            className="mx-auto mt-14 max-w-2xl text-center"
            style={{
              opacity: caption,
              transform: `translateY(${(1 - caption) * 22}px)`,
            }}
          >
            <p className="d4 text-paper">There is an ai in the middle of the name.</p>
            <p className="mt-4 text-[15px] leading-relaxed text-dim md:text-[16px]">
              It was there before it was fashionable and it will be there afterwards. AI is not a
              service line bolted onto the front of this studio — it sits in the middle of how the
              work gets made.
            </p>
          </div>
        </div>

        {/* Progress of the reveal itself */}
        <div className="absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden bg-line">
          <div className="h-full bg-signal" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      </div>
    </div>
  );
}
