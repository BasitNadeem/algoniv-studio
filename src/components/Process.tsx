const steps = [
  { n: "01", week: "WEEK 1–2", title: "Discover", desc: "Stakeholder interviews, data audit, and a written problem statement we both sign." },
  { n: "02", week: "WEEK 2–3", title: "Design", desc: "Architecture, model selection, UX flows. Tradeoffs documented in plain English." },
  { n: "03", week: "WEEK 3–N", title: "Build", desc: "Two-week sprints, weekly demos. CI from day one. Nothing is \"magic\" by the end." },
  { n: "04", week: "FINAL WEEK", title: "Deliver", desc: "Handover to your team — runbooks, eval suites, observability. Then we step back." },
];

export default function Process() {
  return (
    <section id="process" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="label-slide text-[11px] font-mono tracking-[0.2em] text-red-accent">
          / 02 — ENGAGEMENT
        </div>
        <h2 className="reveal mt-4 font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight">
          A four-step path<br />
          from <span className="text-red-accent">vague</span> to shipped.
        </h2>
        <p className="reveal mt-6 max-w-2xl text-muted-foreground text-lg">
          No 80-page proposals. No theatre. We move in two-week loops with weekly demos and a single Slack channel.
        </p>

        {/* Timeline */}
        <div className="mt-20 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-red-accent/60 via-red-accent/30 to-red-accent/10" aria-hidden />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {steps.map((s, i) => (
              <div key={s.n} className="reveal process-step group relative" data-delay={`${i * 100}`}>
                <div className="relative flex md:block items-center gap-4">
                  <div className="process-node relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface font-mono text-base text-red-accent transition-all duration-300">
                    {s.n}
                  </div>
                  {/* Tail dot on the line */}
                  <div className="hidden md:block absolute top-10 left-20 h-1.5 w-1.5 rounded-full bg-red-accent/70" aria-hidden />
                </div>

                <div className="mt-8">
                  <div className="text-[11px] font-mono tracking-[0.2em] text-subtle">{s.week}</div>
                  <h3 className="mt-2 font-display font-bold text-2xl text-foreground">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
