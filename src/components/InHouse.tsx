import SplitWords from "./SplitWords";

/** Innflo carries its own accent so it reads as a product, not a section heading. */
const INNFLO = "#E0532B";

const lessons = [
  "Reliability is not a feature you add later.",
  "Offline is a requirement, not an edge case.",
  "The real spec comes from watching the work happen.",
];

/** How it is built, not what it sells. */
const properties = [
  "Multi-tenant",
  "Role-based access",
  "Offline-capable mobile",
  "Two-way OTA sync",
  "Tax & invoicing rules",
];

export default function InHouse() {
  return (
    <section id="in-house" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-[12%] top-1/3 h-[560px] w-[560px] bleed-signal opacity-25"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* The argument — this is about Algoniv */}
          <div className="lg:col-span-6">
            <div className="rise flex items-center gap-3">
              <span className="micro text-signal">In-house</span>
              <span className="h-px w-10 bg-signal/50" />
            </div>

            <h2 className="d2 mt-6 max-w-[16ch]">
              <SplitWords
                segments={[{ text: "We keep one foot" }, { text: " in production.", accent: true }]}
              />
            </h2>

            <p className="lede rise mt-7 max-w-lg" data-delay="140">
              A studio that only ever hands work over never finds out what it got wrong. So we build
              and operate products of our own, on our own budget, and carry the pager for them.
              Client work is sharper because of it.
            </p>

            <ul className="mt-10 max-w-lg">
              {lessons.map((l, i) => (
                <li
                  key={l}
                  className="rise flex items-baseline gap-5 border-t border-line py-5"
                  data-delay={`${220 + i * 80}`}
                >
                  <span className="font-display text-[12px] font-semibold tracking-[0.18em] text-faint">
                    0{i + 1}
                  </span>
                  <span className="text-[15px] leading-relaxed text-dim">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The product */}
          <div className="lg:col-span-6">
            <div className="spot panel rise relative overflow-hidden rounded-3xl p-7 md:p-10">
              {/* Slow sweep — a sign of life, not a readout. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${INNFLO}, transparent)`,
                  animation: "scan 7s ease-in-out infinite",
                }}
              />

              <div className="flex items-center justify-between gap-4">
                <span className="micro text-faint">Product 01</span>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium"
                  style={{ background: "rgba(224,83,43,0.12)", color: "#f0a184" }}
                >
                  <span
                    className="breathe inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: INNFLO }}
                  />
                  Live in production
                </span>
              </div>

              {/* Innflo's own lockup: the original mark asset beside the word. */}
              <h3 className="mt-7 flex items-center gap-4">
                <img
                  src="/brand/innflo-mark.svg"
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="h-11 w-11 shrink-0 md:h-14 md:w-14"
                />
                <span className="innflo-word text-5xl text-paper md:text-6xl">Innflo</span>
              </h3>

              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-dim">
                An operations platform for independent hotels — reservations, billing, housekeeping
                and dining running off one set of live data. Designed, built and operated by us, in
                daily use by properties that cannot afford downtime.
              </p>

              <div className="mt-8">
                <div className="micro text-faint">How it is built</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {properties.map((p) => (
                    <span
                      key={p}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[12px] text-dim"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <span className="text-[12.5px] text-faint">Built and operated by Algoniv</span>
                <a
                  href="https://innflo.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ul inline-flex items-center gap-2 text-[13.5px] font-semibold text-paper"
                >
                  innflo.co
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            <p className="rise mt-5 text-[13px] leading-relaxed text-faint" data-delay="160">
              Innflo is ours to run, not something we are selling you. It is here because it is the
              honest answer to &ldquo;what have you actually shipped?&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
