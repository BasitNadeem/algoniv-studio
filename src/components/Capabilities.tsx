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
    tags: ["SOTA", "RAG", "AGENTS"],
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
    desc: "Warehouses, lakehouses, and the pipelines that hold them up. From event streams to executive dashboards — auditable.",
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
          One opinionated team.
        </h2>
        <p className="reveal mt-6 max-w-2xl text-muted-foreground text-lg">
          We don't pretend to do everything. We do these four things at the level of a senior in-house team — and we ship.
        </p>

        <div className="mt-14 border-t border-border">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card reveal grid grid-cols-12 items-center gap-6 border-b border-border px-2 md:px-6 py-8 md:py-10 ${i === 0 ? "active" : ""}`}
              data-delay={`${i * 80}`}
            >
              <div className="col-span-12 md:col-span-1 flex">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-2 border border-border">
                  <s.icon className="h-5 w-5 text-red-accent" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-8">
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-muted-foreground max-w-2xl">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono tracking-[0.18em] text-muted-foreground border border-border px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <a href="#contact" className="text-[11px] font-mono tracking-[0.2em] uppercase text-red-accent hover:text-red-ui transition-colors">
                  Explore →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
