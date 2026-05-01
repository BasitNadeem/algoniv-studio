import { useRef } from "react";
import { useCountUp } from "@/hooks/useReveal";

const techs = [
  "Python", "TypeScript", "PyTorch", "Rust", "Postgres", "DuckDB",
  "Kubernetes", "LangChain", "dbt", "Airflow", "FastAPI", "Apache Spark"
];

function Stat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value);
  return (
    <div className="flex flex-col">
      <div className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <div className="mt-1 text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground">{label}</div>
    </div>
  );
}

export default function StatsMarquee() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Stat value={120} suffix="+" label="Systems Shipped" />
        <Stat value={38} label="Active Clients" />
        <Stat value={99.97} suffix="%" label="Uptime" />
        <Stat value={12} suffix="mo" label="Avg Engagement" />
      </div>
      <div className="border-t border-border overflow-hidden py-4">
        <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
          {[...techs, ...techs].map((t, i) => (
            <span key={i} className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              {t} <span className="ml-12 text-subtle">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
