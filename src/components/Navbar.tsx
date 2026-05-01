import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#why", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

function LogoMark() {
  return (
    <a href="#top" className="flex items-center gap-2">
      <span className="font-display font-extrabold text-xl tracking-tight text-foreground">
        algon<span className="text-red-accent">i</span>v
      </span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="9" width="3" height="7" rx="1" fill="#E8192C" />
        <rect x="7.5" y="2" width="3" height="14" rx="1" fill="#E8192C" />
        <rect x="13" y="6" width="3" height="10" rx="1" fill="#E8192C" />
      </svg>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <LogoMark />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex cta-red items-center gap-2 rounded-md bg-red-ui px-4 py-2 text-sm font-medium text-white"
        >
          Let's Talk →
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl flex flex-col items-center gap-8 pt-16">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-display font-bold text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="cta-red rounded-md bg-red-ui px-6 py-3 text-base font-medium text-white"
          >
            Let's Talk →
          </a>
        </div>
      )}
    </header>
  );
}
