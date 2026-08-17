import NameReveal from "./NameReveal";

const principles = [
  {
    t: "AI-first, not AI-flavoured",
    d: "It shapes how we scope, build and test — and we say plainly when the honest answer is a database query instead.",
  },
  {
    t: "We run what we build",
    d: "We operate our own product in production. Every opinion we hold about reliability was paid for at 3am.",
  },
  {
    t: "You own everything",
    d: "Code, infrastructure, accounts and data — in your repo, on your cloud, from the first commit.",
  },
  {
    t: "Small and senior",
    d: "No layers, no juniors billed as seniors, no gap between the people who plan and the people who build.",
  },
];

export default function Studio() {
  return (
    <section id="studio" className="relative border-t border-line">
      <NameReveal />

      <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <div
              key={p.t}
              className="spot rise relative flex flex-col gap-3 border-t border-line py-8 lg:px-7 lg:first:pl-0"
              data-delay={`${i * 70}`}
            >
              <span className="micro text-faint">0{i + 1}</span>
              <h3 className="d4 text-paper">{p.t}</h3>
              <p className="text-[13.5px] leading-relaxed text-dim">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
