import { SITE } from "@/lib/site";

/** Fill these in when the accounts exist — empty renders nothing, not dead links. */
const socials: { label: string; href: string }[] = [];

const columns = [
  {
    heading: "Studio",
    links: [
      { label: "What we do", href: "#work" },
      { label: "Method", href: "#method" },
      { label: "Philosophy", href: "#studio" },
    ],
  },
  {
    heading: "In-house",
    links: [{ label: SITE.product.name, href: SITE.product.url, external: true }],
  },
  {
    heading: "Contact",
    links: [
      { label: "Start a project", href: "#contact" },
      { label: SITE.email, href: `mailto:${SITE.email}` },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Oversized marquee — the sign-off, not decoration. */}
      <div className="marquee-pause relative select-none overflow-hidden py-12 md:py-16">
        <div
          className="marquee flex w-max items-center gap-10"
          style={{ ["--marquee-duration" as string]: "34s" } as React.CSSProperties}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="d1 whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.16)]">
                Let&apos;s build something
              </span>
              <img
                src="/brand/algoniv-insight-red.svg"
                alt=""
                aria-hidden
                className="h-10 w-auto md:h-14"
              />
            </span>
          ))}
        </div>
      </div>

      <div className="rule-x" />

      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6">
            <img
              src="/brand/algoniv-logo-reversed.svg"
              alt="Algoniv"
              draggable={false}
              className="w-[148px]"
            />
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-dim">
              An AI-first software production lab in Lahore. Client work, custom systems, and
              products of our own.
            </p>
            {socials.length > 0 && (
              <div className="mt-7 flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-4 py-2 text-[12px] text-dim transition-colors hover:border-signal hover:text-paper"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((c) => (
            <nav key={c.heading} className="md:col-span-2">
              <h2 className="micro text-faint">{c.heading}</h2>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...("external" in l && l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="ul text-[13.5px] break-words text-dim transition-colors hover:text-paper"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="rule-x" />

      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-6 text-[12px] text-faint sm:flex-row md:px-8">
        <span>© {year} Algoniv. All rights reserved.</span>
        <span>Lahore, Pakistan · Remote-first</span>
      </div>
    </footer>
  );
}
