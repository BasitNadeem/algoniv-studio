import { Brain, Code2, Database, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tags: string[];
};

const services: Service[] = [
  {
    icon: Brain,
    title: "AI & ML Solutions",
    desc: "Production model pipelines, RAG systems, and agentic workflows engineered to actually run when the demo ends.",
    tags: ["SOTA", "EVALUATED"],
  },
  {
    icon: Code2,
    title: "Custom Software Engineering",
    desc: "Internal tools, platforms, and APIs built to your domain. Typed end-to-end. Tested. Documented like adults wrote it.",
    tags: ["TS", "PYTHON", "RUST"],
  },
  {
    icon: Database,
    title: "Data Engineering & Analytics",
    desc: "Warehouses, lakehouses, and the dbt graphs that hold them up. From event streams to executive dashboards — auditable.",
    tags: ["SNOWFLAKE", "DUCKDB", "DBT"],
  },
  {
    icon: Workflow,
    title: "Intelligent Automation",
    desc: "The slow, expensive parts of your business — quietly replaced by reliable workflows that compound while you sleep.",
    tags: ["TEMPORAL", "RAY", "N8N"],
  },
];

export default function Capabilities() {
  return (
    <section id="services" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="label-slide text-[11px] font-mono tracking-[0.2em] text-red-accent">
          / 01 — CAPABILITIES
        </div>
        <h2 className="reveal mt-4 font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight">
          Four disciplines.<br />
          One <span className="text-red-accent">opinionated</span> team.
        </h2>
        <p className="reveal mt-6 max-w-2xl text-muted-foreground text-lg">
          We don't pretend to do everything. We do these four things at the level of a senior in-house team — and we ship.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="capability-card reveal group relative rounded-2xl border border-border bg-surface p-8 md:p-10 min-h-[320px] flex flex-col"
              data-delay={`${i * 80}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-2 border border-border transition-colors group-hover:border-red-accent">
                <s.icon className="h-5 w-5 text-red-accent" />
              </div>

              <div className="mt-auto pt-10">
                <h3 className="font-display font-bold text-2xl md:text-[28px] text-foreground tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">
                  {s.desc}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono tracking-[0.2em] text-subtle uppercase">
                    {s.tags.map((t, idx) => (
                      <span key={t} className="flex items-center gap-2">
                        {idx > 0 && <span>·</span>}
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                  <a href="#contact" className="text-[11px] font-mono tracking-[0.2em] uppercase text-red-accent opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
