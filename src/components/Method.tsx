import { useReadingIndex } from "@/lib/motion";
import SplitWords from "./SplitWords";

const steps = [
  {
    n: "01",
    when: "Week one",
    title: "Sit with it",
    body: "We watch the actual work happen — the workaround, the second spreadsheet, the thing everyone stopped complaining about years ago. It ends in a written problem statement we both sign.",
    out: "Problem statement · data audit",
  },
  {
    n: "02",
    when: "Week two",
    title: "Draw the shape",
    body: "Architecture, data model, the three flows that carry the weight. Trade-offs written in plain English — including the expensive ones, before the money is spent.",
    out: "Architecture · flows · estimate",
  },
  {
    n: "03",
    when: "Weeks three → n",
    title: "Ship in loops",
    body: "Two-week sprints, a working build every Friday, one shared channel. CI from the first commit. Nothing should still look like magic by the end of it.",
    out: "Weekly builds · CI · demos",
  },
  {
    n: "04",
    when: "Final week",
    title: "Hand over the keys",
    body: "Runbooks, dashboards, credentials and a walkthrough with the people who will own it. Everything already lives in your repo on your cloud. Then we step back — and stay reachable.",
    out: "Runbooks · handover · support",
  },
];

export default function Method() {
  // Each step advances the marker as it reaches the reading line, so the
  // counter moves one step at a time however long the section is.
  const { refs, active, progress } = useReadingIndex(steps.length);

  return (
    <section id="method" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="rise flex items-center gap-3">
              <span className="micro text-signal">Method</span>
              <span className="h-px w-10 bg-signal/50" />
            </div>
            <h2 className="d2 mt-5 max-w-[22ch]">
              <SplitWords
                segments={[
                  { text: "Four steps from vague to" },
                  { text: " shipped.", accent: true },
                ]}
              />
            </h2>
          </div>
          <p className="rise max-w-sm text-[14px] leading-relaxed text-dim" data-delay="140">
            No eighty-page proposal, no discovery theatre, no account manager relaying messages
            between you and the people writing the code.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-[340px_1fr] lg:gap-16">
          {/* Sticky counter */}
          <div className="hidden lg:block">
            <div className="sticky top-[22vh]">
              {/* Chapter marker only — every step carries its own heading in the
                  column on the right, so nothing is labelled in just one place. */}
              <div className="relative h-[190px]">
                {steps.map((s, i) => (
                  <div
                    key={s.n}
                    className="absolute inset-x-0 top-0 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: `translateY(${(i - active) * 26}px)`,
                    }}
                    aria-hidden
                  >
                    <div
                      className="font-display leading-[0.78] font-semibold tracking-[-0.06em]"
                      style={{
                        fontSize: "9.5rem",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(232,8,8,0.55)",
                      }}
                    >
                      {s.n}
                    </div>
                  </div>
                ))}
              </div>

              {/* Spine */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-line">
                  <div
                    className="h-px bg-signal"
                    style={{
                      width: `${Math.min(100, progress * 118)}%`,
                      boxShadow: "0 0 10px rgba(232,8,8,0.9)",
                    }}
                  />
                </div>
                <span className="text-[11px] tnum text-faint">
                  0{active + 1}
                  <span className="text-faint/60"> / 0{steps.length}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            {steps.map((s, i) => (
              <article
                key={s.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="group relative border-t border-line py-10 transition-colors duration-500 md:py-12"
                style={{ borderColor: i === active ? "rgba(232,8,8,0.42)" : undefined }}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-display text-[13px] font-semibold tracking-[0.16em] transition-colors duration-500"
                    style={{ color: i === active ? "var(--signal)" : "var(--faint)" }}
                  >
                    {s.n}
                  </span>
                  <span className="micro text-faint">{s.when}</span>
                </div>

                <h3 className="d3 mt-3 text-paper">{s.title}</h3>

                <div className="lg:flex lg:items-start lg:gap-12">
                  <p
                    className="rise mt-4 max-w-2xl flex-1 text-[15px] leading-relaxed text-dim lg:text-[17px]"
                    data-delay={`${i * 60}`}
                  >
                    {s.body}
                  </p>
                  <span className="mt-5 block shrink-0 text-[11px] tracking-[0.12em] text-faint uppercase lg:mt-6 lg:w-44 lg:text-right">
                    {s.out}
                  </span>
                </div>

                {/* Hover lift line */}
                <span
                  className="absolute left-0 top-0 h-px w-0 bg-signal transition-[width] duration-700 group-hover:w-full"
                  aria-hidden
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
