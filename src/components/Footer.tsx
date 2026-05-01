import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
            algon<span className="text-red-accent">i</span>v
          </span>
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="9" width="3" height="7" rx="1" fill="#E8192C" />
            <rect x="7.5" y="2" width="3" height="14" rx="1" fill="#E8192C" />
            <rect x="13" y="6" width="3" height="10" rx="1" fill="#E8192C" />
          </svg>
        </div>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#services" className="nav-link hover:text-foreground transition">Services</a>
          <a href="#process" className="nav-link hover:text-foreground transition">Process</a>
          <a href="#why" className="nav-link hover:text-foreground transition">Why Us</a>
          <a href="#contact" className="nav-link hover:text-foreground transition">Contact</a>
        </nav>

        <div className="flex items-center gap-2">
          {[
            { Icon: Github, href: "#" },
            { Icon: Linkedin, href: "#" },
            { Icon: Twitter, href: "#" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-red-accent hover:border-red-accent transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-[10px] font-mono tracking-[0.25em] uppercase text-subtle">
          © 2026 Algoniv · Lahore
        </div>
      </div>
    </footer>
  );
}
