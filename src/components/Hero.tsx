import Globe3D from "./Globe3D";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-24 overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 pb-20">
        <div className="relative z-10">
          <div className="reveal inline-flex items-center gap-2 text-xs tracking-[0.18em] font-mono text-red-accent">
            ✦ AI-POWERED SOFTWARE ENGINEERING
          </div>

          <h1 className="reveal mt-6 font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            AI-powered software,<br />
            built for the <span className="text-red-accent">real world</span>
          </h1>

          <p className="reveal mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            A studio of senior engineers and applied scientists. We ship production-grade
            systems for teams who treat data as infrastructure — not exhaust.
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="cta-red inline-flex items-center gap-2 rounded-md bg-red-ui px-5 py-3 text-sm font-medium text-white">
              Start a Project →
            </a>
            <a href="#process" className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground hover:bg-surface transition-colors">
              See How We Work
            </a>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono tracking-[0.15em] text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Available · Q3 2026
            </span>
            <span className="text-subtle">EST · GMT · PKT</span>
            <span className="text-subtle">Lahore · Remote-first</span>
          </div>
        </div>

        <div className="relative h-[420px] md:h-[560px] lg:h-[640px] lg:-mr-[20%]">
          <Globe3D />
        </div>
      </div>

      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full opacity-40 red-radial" />
    </section>
  );
}
