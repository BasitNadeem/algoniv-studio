const steps = [
  { n: "01", week: "WEEK 1–2", title: "Discover", desc: "Stakeholder interviews, data audit, and a written problem statement we both sign." },
  { n: "02", week: "WEEK 2–3", title: "Design", desc: "Architecture, model selection, UX flows. Tradeoffs documented in plain English." },
  { n: "03", week: "WEEK 3–N", title: "Build", desc: "Two-week sprints, weekly demos. CI from day one. Nothing is \"magic\" by the end." },
  { n: "04", week: "FINAL WEEK", title: "Deliver", desc: "Handover to your team — runbooks, eval suites, observability. Then we step back." },
];

export default function Process() {
  return (
    <section id="process" className="py-28 md:py-36 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="label-slide text-[11px] font-mono tracking-[0.2em] text-red-accent">
          / 02 — ENGAGEMENT
        </div>
        <h2 className="reveal mt-4 font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight">
          A four-step path from <span className="text-red-accent">vague</span><br />
          to shipped.
        </h2>
        <p className="reveal mt-6 max-w-2xl text-muted-foreground text-lg">
          No 80-page proposals. No theatre. We move in two-week loops with weekly demos and a single Slack channel.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal rounded-2xl bg-surface border border-border p-8"
              data-delay={`${i * 80}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-accent text-red-accent font-mono text-sm">
                {s.n}
              </div>
              <div className="mt-6 text-[11px] font-mono tracking-[0.2em] text-muted-foreground">{s.week}</div>
              <h3 className="mt-2 font-display font-bold text-2xl text-red-accent">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
