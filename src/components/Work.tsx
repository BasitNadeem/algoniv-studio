import { useScrollProgress } from "@/lib/motion";
import SplitWords from "./SplitWords";

const disciplines = [
  {
    n: "01",
    title: "Applied AI",
    body: "Retrieval, agents and model pipelines built to survive real users rather than a demo. Scoped against an eval set, shipped with a measurable delta, and honest about where a model is the wrong tool.",
    signals: ["RAG", "Agents", "Evals", "Python"],
    note: "Where we start, not where we bolt on.",
  },
  {
    n: "02",
    title: "Product engineering",
    body: "Whole products, not tickets. Multi-tenant web apps, dashboards, APIs and the unglamorous infrastructure that keeps them upright — typed end to end, tested, documented.",
    signals: ["TypeScript", "React", "Node", "Postgres"],
    note: "Design through to on-call.",
  },
  {
    n: "03",
    title: "Custom solutions",
    body: "Systems cut to the shape of one business — internal tools, operator consoles, back-office workflows, portals. The kind of software nobody sells off the shelf because it only fits you.",
    signals: ["Internal tools", "Portals", "Workflows"],
    note: "Built to your domain, owned by you.",
  },
  {
    n: "04",
    title: "Data & automation",
    body: "Warehouses, pipelines and the reporting layer someone actually opens on a Monday — plus the third-party syncs and unattended jobs that quietly remove the manual middle of a business.",
    signals: ["Pipelines", "Reporting", "Integrations"],
    note: "Numbers that reconcile.",
  },
];

/**
 * Card width, gap and side padding are declared once here and consumed by both
 * the rail translate and the cards themselves, so the travel distance can never
 * drift out of step with the layout at some in-between viewport width.
 */
const CARD_W = "min(78vw, 470px)";
const GAP = "1.75rem";
const PAD = "2rem";

function railStyle(eased: number, count: number): React.CSSProperties {
  const railWidth = `calc(${count} * ${CARD_W} + ${count - 1} * ${GAP})`;
  return {
    gap: GAP,
    paddingLeft: PAD,
    paddingRight: PAD,
    transform: `translate3d(calc(${-eased} * (${railWidth} - 100vw + 2 * ${PAD})), 0, 0)`,
  };
}

export default function Work() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // Ease the travel slightly so the first and last panels breathe.
  const eased = Math.min(1, Math.max(0, (progress - 0.06) / 0.88));

  return (
    <section id="work" className="relative border-t border-line">
      {/* Tall track: its height is what the pinned viewport scrolls through. */}
      <div ref={ref} style={{ height: `${disciplines.length * 78 + 60}vh` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div
            className="pointer-events-none absolute -left-[10%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 bleed-signal opacity-30"
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="rise flex items-center gap-3">
                  <span className="micro text-signal">What we do</span>
                  <span className="h-px w-10 bg-signal/50" />
                </div>
                <h2 className="d2 mt-5 max-w-[20ch]">
                  <SplitWords
                    segments={[{ text: "Four ways in." }, { text: " One standard.", accent: true }]}
                  />
                </h2>
              </div>

              <div className="hidden max-w-xs md:block">
                <p className="text-[14px] leading-relaxed text-dim">
                  Take one of these or all four. The team is the same either way, and it is the team
                  that carries the pager afterwards.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px w-24 overflow-hidden bg-line">
                    <div
                      className="h-full bg-signal transition-none"
                      style={{ width: `${eased * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] tnum text-faint">
                    {String(
                      Math.min(disciplines.length, Math.floor(eased * disciplines.length) + 1),
                    ).padStart(2, "0")}
                    <span className="text-faint/60"> / 0{disciplines.length}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal rail */}
          <div className="relative mt-10 md:mt-14">
            <div
              className="flex will-change-transform"
              style={railStyle(eased, disciplines.length)}
            >
              {disciplines.map((d, i) => {
                const focus = eased * (disciplines.length - 1);
                const distance = Math.abs(focus - i);
                const active = distance < 0.62;
                return (
                  <article
                    key={d.n}
                    className="spot panel flex h-[52vh] shrink-0 flex-col justify-between rounded-3xl p-7 transition-all duration-500 md:h-[46vh] md:p-9"
                    style={{
                      width: CARD_W,
                      opacity: active ? 1 : 0.42,
                      transform: `scale(${active ? 1 : 0.955})`,
                      borderColor: active ? "rgba(232,8,8,0.32)" : "var(--line)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-[13px] font-semibold tracking-[0.16em] text-signal">
                        {d.n}
                      </span>
                      <span className="text-right text-[11px] leading-snug text-faint">
                        {d.note}
                      </span>
                    </div>

                    <div>
                      <h3 className="d3 text-paper">{d.title}</h3>
                      <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-dim">
                        {d.body}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {d.signals.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line px-3 py-1.5 text-[11px] text-faint"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto mt-8 w-full max-w-[1440px] px-5 md:px-8">
            <a
              href="#contact"
              className="btn btn-signal inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[13.5px] font-semibold"
            >
              Tell us what&apos;s broken
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
