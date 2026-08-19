import { useState } from "react";
import { SITE } from "@/lib/site";
import SplitWords from "./SplitWords";

const CONTACT_EMAIL = SITE.email;

/**
 * Set VITE_WEB3FORMS_KEY in Vercel (and .env.local for dev). Without it the
 * form degrades to mailto rather than silently discarding every submission.
 */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

const kinds = [
  "Applied AI",
  "A product build",
  "Custom solution",
  "Data & automation",
  "Not sure yet",
];

const beats = [
  "A real reply from an engineer, not an autoresponder.",
  "A 30-minute call to find out whether this is a fit.",
  "If it isn't, we say so — and point you somewhere better.",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [kind, setKind] = useState(kinds[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!WEB3FORMS_KEY) return;

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      // Web3Forms answers 200 with {success:false} for a bad key, so the HTTP
      // status alone is not enough to call it delivered.
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setStatus("sent");
        form.reset();
      } else {
        console.error("Contact form rejected:", data?.message ?? res.status);
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form failed to reach Web3Forms:", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-[12%] top-0 h-[760px] w-[760px] bleed-signal opacity-60"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="rise flex items-center gap-3">
              <span className="micro text-signal">Start here</span>
              <span className="h-px w-10 bg-signal/50" />
            </div>

            <h2 className="d2 mt-6 max-w-[16ch]">
              <SplitWords
                segments={[{ text: "Tell us what you are" }, { text: " stuck on.", accent: true }]}
              />
            </h2>

            <p className="lede rise mt-7 max-w-md" data-delay="140">
              Something you want built, a system that is buckling, or an idea you want a straight
              answer on. The first message reaches the people who would do the work.
            </p>

            <ol className="mt-10 space-y-0">
              {beats.map((b, i) => (
                <li
                  key={b}
                  className="rise flex items-start gap-4 border-t border-line py-5 text-[14px] text-dim"
                  data-delay={`${200 + i * 80}`}
                >
                  <span className="mt-px grid h-6 w-6 shrink-0 place-items-center rounded-full border border-signal/40 font-display text-[10.5px] font-semibold text-signal">
                    {i + 1}
                  </span>
                  {b}
                </li>
              ))}
            </ol>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
              data-delay="480"
            >
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="ul text-[14.5px] text-paper transition-colors hover:text-signal"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="text-[13px] text-faint">Replies within one working day</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="panel rise relative overflow-hidden rounded-3xl p-6 md:p-10"
            >
              {WEB3FORMS_KEY && (
                <>
                  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                  <input type="hidden" name="subject" value={`New enquiry — ${kind}`} />
                  <input type="hidden" name="from_name" value={SITE.domain} />
                  {/* Web3Forms reads "@" as: set Reply-To from the email field,
                      so hitting reply in the inbox answers the sender. */}
                  <input type="hidden" name="replyto" value="@" />
                  <input type="hidden" name="project_type" value={kind} />
                  {/* Honeypot: bots fill it, humans never see it. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </>
              )}

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="relative grid h-16 w-16 place-items-center">
                    <span className="ring absolute inset-0 rounded-full border border-signal/60" />
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-signal/40 bg-signal/10">
                      <svg
                        className="h-7 w-7 text-signal"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <p className="d3 mt-7 text-paper">Message received.</p>
                  <p className="mt-2 max-w-xs text-[14px] text-dim">
                    We will come back to you within one working day.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name" name="name" required />
                    <Field label="Work email" name="email" type="email" required />
                  </div>

                  <div className="mt-8">
                    <span className="micro block text-faint">What kind of work</span>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {kinds.map((k) => {
                        const on = k === kind;
                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => setKind(k)}
                            className="rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all duration-300"
                            style={{
                              borderColor: on ? "rgba(232,8,8,0.55)" : "var(--line)",
                              background: on ? "rgba(232,8,8,0.11)" : "transparent",
                              color: on ? "var(--paper)" : "var(--dim)",
                            }}
                            aria-pressed={on}
                          >
                            {k}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Field label="What are you trying to build?" name="message" textarea required />
                  </div>

                  <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                    <span className="max-w-[16rem] text-[12px] leading-relaxed text-faint">
                      NDAs on request. Nothing you send us is shared or reused.
                    </span>

                    {WEB3FORMS_KEY ? (
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn btn-signal inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[14px] font-semibold disabled:opacity-60"
                      >
                        {status === "sending" ? "Sending…" : "Send it"}
                        <span aria-hidden>→</span>
                      </button>
                    ) : (
                      <a
                        href={`mailto:${CONTACT_EMAIL}?subject=New%20Algoniv%20enquiry`}
                        className="btn btn-signal inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[14px] font-semibold"
                      >
                        Email us instead
                        <span aria-hidden>→</span>
                      </a>
                    )}
                  </div>

                  {!WEB3FORMS_KEY && (
                    <p className="mt-4 text-[12px] text-faint">
                      Direct sending is not configured yet — the button opens your mail client.
                    </p>
                  )}

                  {status === "error" && (
                    <p className="mt-4 text-[13px] text-signal">
                      That did not go through. Please email {CONTACT_EMAIL} directly.
                    </p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Floating-label field — the label rides up once the input holds a value. */
function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const shared =
    "peer w-full rounded-2xl border border-line bg-black/25 px-4 pb-2.5 pt-7 text-[14.5px] text-paper outline-none transition-all duration-300 placeholder:text-transparent focus:border-signal/60 focus:bg-black/40";

  return (
    <label className="relative block">
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder=" "
          className={`${shared} resize-none`}
        />
      ) : (
        <input name={name} type={type} required={required} placeholder=" " className={shared} />
      )}
      <span className="pointer-events-none absolute left-4 top-[22px] text-[13.5px] text-faint transition-all duration-300 peer-focus:top-2.5 peer-focus:text-[10.5px] peer-focus:tracking-[0.16em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:uppercase">
        {label}
      </span>
    </label>
  );
}
