import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useActiveSection, useClock } from "@/lib/motion";

const links = [
  { id: "work", label: "What we do" },
  { id: "in-house", label: "In-house" },
  { id: "method", label: "Method" },
  { id: "studio", label: "Studio" },
];

const ids = links.map((l) => l.id);

export default function Nav() {
  const active = useActiveSection(ids);
  const clock = useClock();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const item = itemRefs.current[active];
      if (!rail || !item) return;
      const railBox = rail.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      setPill({ left: itemBox.left - railBox.left, width: itemBox.width, ready: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 transition-all duration-500 md:px-8"
          style={{ height: scrolled ? 74 : 96 }}
        >
          <a href="#top" aria-label="Algoniv — home" className="relative shrink-0">
            <img
              src="/brand/algoniv-logo-reversed.svg"
              alt="Algoniv"
              draggable={false}
              className="transition-all duration-500"
              style={{ width: scrolled ? 118 : 140 }}
            />
          </a>

          {/* Section rail with a sliding indicator */}
          <div
            ref={railRef}
            className="relative hidden items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1.5 backdrop-blur-xl md:flex"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 40px -24px rgba(0,0,0,0.9)",
            }}
          >
            <span
              aria-hidden
              className="absolute top-1.5 rounded-full bg-white/[0.07] transition-all duration-[550ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: pill.left,
                width: pill.width,
                height: "calc(100% - 12px)",
                opacity: pill.ready ? 1 : 0,
              }}
            />
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                ref={(el) => {
                  itemRefs.current[l.id] = el;
                }}
                className={`relative z-10 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  active === l.id ? "text-paper" : "text-dim hover:text-paper"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-[11px] tracking-[0.1em] text-faint lg:flex">
              <span className="breathe inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="tnum">{clock}</span>
              <span>PKT</span>
            </span>

            <a
              href="#contact"
              className="btn btn-signal hidden rounded-full px-5 py-2.5 text-[13px] font-semibold md:inline-flex"
            >
              Start a project
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.03] backdrop-blur-xl md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className="absolute left-0 h-px w-full bg-paper transition-all duration-300"
                  style={{
                    top: open ? 6 : 1,
                    transform: open ? "rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="absolute left-0 h-px w-full bg-paper transition-all duration-300"
                  style={{
                    top: open ? 6 : 11,
                    transform: open ? "rotate(-45deg)" : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className="mx-auto max-w-[1440px] px-5 transition-opacity duration-500 md:px-8"
          style={{ opacity: scrolled ? 1 : 0 }}
        >
          <div className="rule-x" />
        </div>
      </header>

      {/* Mobile sheet.
          `inert` while closed is load-bearing: the sheet stays display:flex at
          full viewport size and only fades to opacity 0, so without it the five
          links below remain in the tab order and in the accessibility tree — a
          keyboard or screen-reader user on a phone tabs through an invisible
          menu before reaching the page. inert also blocks text selection inside
          it, which keeps it out of a select-all. */}
      <div
        inert={!open}
        aria-hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-end bg-ink/95 backdrop-blur-2xl transition-all duration-500 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        }}
      >
        <nav className="px-6 pb-16">
          {links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-6"
              style={{
                transition: "opacity 500ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${open ? 120 + i * 60 : 0}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(18px)",
              }}
            >
              <span className="micro text-faint">0{i + 1}</span>
              <span className="d3">{l.label}</span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn btn-signal mt-8 flex justify-center rounded-full px-6 py-4 text-base font-semibold"
          >
            Start a project
          </a>
        </nav>
      </div>
    </>
  );
}
