import { Check } from "lucide-react";

const usps = [
  { t: "Senior-only pods", d: "No staff augmentation, no offshoring. Every engineer on your project has shipped real systems before." },
  { t: "Models & products in one team", d: "ML researchers and product engineers in the same standup. The handoff tax disappears." },
  { t: "Fixed-scope, fixed-price options", d: "For well-defined work, we quote it flat. T&M available too — your choice, not ours." },
  { t: "You own everything", d: "Code, weights, prompts, infra — all yours, in your repo, on your cloud. We sign the IP papers." },
  { t: "Eval-driven, not vibe-driven", d: "Every model decision is backed by a test set. Every release ships with a measurable delta." },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="label-slide text-[11px] font-mono tracking-[0.2em] text-red-accent">
          / 03 — WHY ALGONIV
        </div>
        <h2 className="reveal mt-4 font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight">
          The <span className="text-red-accent">ai</span> is hiding in the name. Look closer.
        </h2>

        <div className="reveal mt-12 select-none">
          <div className="font-display font-extrabold text-[18vw] md:text-[10rem] leading-none text-subtle/60 tracking-tight">
            <span className="text-red-accent/80">a</span>lgon<span className="text-red-accent/80">i</span>v
          </div>
          <div className="mt-2 flex gap-3 md:gap-6 text-[10px] md:text-xs font-mono tracking-[0.4em] text-muted-foreground">
            {["A","L","G","O","N","I","V"].map((l) => (
              <span key={l} className={l === "I" ? "text-red-accent" : ""}>{l}</span>
            ))}
          </div>
        </div>

        <pre className="reveal mt-12 max-w-2xl overflow-x-auto rounded-lg border-l-2 border-red-accent bg-surface p-6 font-mono text-sm text-muted-foreground leading-relaxed">
{`algo · the rigour of classical engineering.
a·i  · woven through, not bolted on.
niv  · built to level the playing field.`}
        </pre>

        <div className="mt-16 border-t border-border">
          {usps.map((u, i) => (
            <div
              key={u.t}
              className="reveal grid grid-cols-12 items-start gap-4 border-b border-border py-8"
              data-delay={`${i * 60}`}
            >
              <div className="col-span-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-accent">
                  <Check className="h-4 w-4 text-red-accent" />
                </div>
              </div>
              <div className="col-span-10">
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground">{u.t}</h3>
                <p className="mt-2 text-muted-foreground max-w-2xl">{u.d}</p>
              </div>
              <div className="col-span-1 text-right text-subtle font-mono text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
