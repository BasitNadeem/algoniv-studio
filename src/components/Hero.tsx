import CursorField from "./CursorField";
import RotatingWord from "./RotatingWord";
import SplitWords from "./SplitWords";
import { useClock } from "@/lib/motion";

const WORDS = ["software", "models", "agents", "data", "ideas"];

const tracks = ["Client work", "Custom solutions", "In-house products"];

/** Viewfinder brackets — the frame reads as an instrument, not a box. */
function Corners() {
  const corners = [
    "left-0 top-0 border-l border-t",
    "right-0 top-0 border-r border-t",
    "left-0 bottom-0 border-l border-b",
    "right-0 bottom-0 border-r border-b",
  ];
  return (
    <>
      {corners.map((c) => (
        <span
          key={c}
          aria-hidden
          className={`pointer-events-none absolute h-7 w-7 border-white/20 ${c}`}
        />
      ))}
    </>
  );
}

export default function Hero() {
  const clock = useClock();

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-10 md:pt-28">
      {/* Noise resolving into signal, live under everything. */}
      <div className="absolute inset-0" aria-hidden>
        <CursorField />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/92" />
        <div className="absolute -right-[14%] top-[4%] h-[700px] w-[700px] bleed-signal opacity-60" />
        <div className="vignette absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8">
        <div className="relative flex min-h-[calc(100svh-9.5rem)] flex-col justify-between px-5 py-9 md:px-10 md:py-12">
          <Corners />

          {/* Instrument header */}
          <div className="flex items-start justify-between gap-6">
            <span className="rise flex items-center gap-2.5">
              <span className="breathe inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="micro text-paper">AI-first software production lab</span>
            </span>

            <span className="rise hidden items-center gap-5 sm:flex" data-delay="140">
              <span className="micro text-faint">Lahore</span>
              <span className="h-3 w-px bg-line" />
              <span className="text-[11px] tracking-[0.1em] tnum text-faint">{clock}</span>
            </span>
          </div>

          {/* The line */}
          <div className="py-10 md:py-14">
            <h1 className="d1">
              <span className="block">
                {/* No {" "} needed here: SplitWords already emits a trailing
                    space after every word, including the last one. */}
                <SplitWords segments={[{ text: "We put" }]} delay={120} />
                <RotatingWord words={WORDS} />
              </span>
              <span className="mt-1 block md:mt-2">
                <SplitWords segments={[{ text: "into production." }]} delay={260} />
              </span>
            </h1>

            <div className="mt-12 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
              <p className="lede rise max-w-md" data-delay="520">
                A small senior team. We take on client work, build custom systems to order, and run
                products of our own.
              </p>

              <div className="rise flex flex-wrap items-center gap-3" data-delay="620">
                <a
                  href="#contact"
                  className="btn btn-signal inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[14px] font-semibold"
                >
                  Start a project
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#work"
                  className="btn btn-line inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[14px] font-semibold"
                >
                  See what we do
                </a>
              </div>
            </div>
          </div>

          {/* Instrument footer */}
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {tracks.map((t, i) => (
                <span
                  key={t}
                  className="rise flex items-center gap-6"
                  data-delay={`${700 + i * 80}`}
                >
                  {i > 0 && <span className="hidden h-3 w-px bg-line sm:block" aria-hidden />}
                  <span className="text-[13px] text-dim">{t}</span>
                </span>
              ))}
            </div>

            <div className="rise flex items-center gap-3" data-delay="940">
              <span className="text-[11px] tracking-[0.18em] text-faint uppercase">
                Move to resolve
              </span>
              <span className="block h-8 w-px overflow-hidden bg-line">
                <span
                  className="block h-3 w-px bg-signal"
                  style={{ animation: "scroll-cue 2.4s cubic-bezier(0.65,0,0.35,1) infinite" }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
