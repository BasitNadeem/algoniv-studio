import { Mail, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setStatus("sent");
        e.currentTarget.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] red-radial opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="label-slide text-[11px] font-mono tracking-[0.2em] text-red-accent">
            ✦ START A CONVERSATION
          </div>
          <h2 className="reveal mt-4 font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Tell us what you're <span className="text-red-accent">stuck</span> on.
          </h2>
          <p className="reveal mt-6 max-w-md text-muted-foreground text-lg">
            Most projects start with a 30-minute call. We'll tell you whether we're the right fit — and if not, who is.
          </p>

          <div className="reveal mt-10 space-y-4">
            <a href="mailto:basit.nadeem5@gmail.com" className="flex items-center gap-3 text-foreground hover:text-red-accent transition-colors">
              <Mail className="h-4 w-4" />
              <span className="font-mono text-sm">basit.nadeem5@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-sm">Replies in &lt; 24h, weekdays</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal rounded-2xl border border-border bg-surface p-9"
        >
          <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE" />
          <input type="hidden" name="subject" value="New Algoniv project inquiry" />

          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-4 font-display font-bold text-lg text-foreground">Message sent. We'll be in touch.</p>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                <Field label="NAME" name="name" type="text" required />
                <Field label="WORK EMAIL" name="email" type="email" required />
                <Field label="WHAT ARE YOU TRYING TO BUILD?" name="message" textarea required />
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
                  PGP & NDAs available on request
                </span>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="cta-red inline-flex items-center gap-2 rounded-md bg-red-ui px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message →"}
                </button>
              </div>
              {status === "error" && (
                <p className="mt-4 text-xs text-red-accent">Something went wrong. Please try emailing us directly.</p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", textarea, required,
}: { label: string; name: string; type?: string; textarea?: boolean; required?: boolean }) {
  const base = "w-full rounded-md bg-surface-2 border border-border px-4 py-3 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-red-accent focus:ring-2 focus:ring-red-accent/30 transition";
  return (
    <label className="block">
      <span className="block text-[10px] font-mono tracking-[0.2em] text-muted-foreground mb-2">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={base} />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}
