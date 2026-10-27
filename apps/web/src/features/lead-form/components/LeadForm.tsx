import { useState, type FormEvent } from "react";
import { business } from "../business";

const labelClass =
  "flex items-baseline gap-3 font-mono text-label text-muted uppercase";
const inputClass =
  "w-full border border-ink bg-card px-3 text-base placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";
const chipClass =
  "inline-flex h-11 items-center border border-ink px-4 text-sm font-medium hover:bg-paper-2 peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt";

// The public form a business puts on its website. Styled as a ticket.
// TODO(week 3): send the form to POST /api/public/leads.
export default function LeadForm() {
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Saving leads isn't connected yet. It arrives with the API.");
  }

  return (
    <section className="lg:col-span-7" aria-labelledby="form-title">
      <form
        className="border-2 border-ink bg-card shadow-hard-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-5 sm:px-8">
          <h2
            id="form-title"
            className="text-base font-bold font-stretch-expanded tracking-wide uppercase"
          >
            Your request
          </h2>
          <p className="font-mono text-label text-muted uppercase">
            No. assigned on send
          </p>
        </div>

        {/* Perforated tear line with a notch cut into each edge. */}
        <div className="relative" aria-hidden="true">
          <div className="mx-6 border-t-2 border-dashed border-ink" />
          <span className="absolute -top-[11px] -left-[13px] size-6 rounded-full border-2 border-ink bg-paper [clip-path:inset(0_0_0_50%)]" />
          <span className="absolute -top-[11px] -right-[13px] size-6 rounded-full border-2 border-ink bg-paper [clip-path:inset(0_50%_0_0)]" />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 px-6 py-8 sm:grid-cols-2 sm:px-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>
              <span className="text-ink">01</span>Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`${inputClass} h-11`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              <span className="text-ink">02</span>Phone
              <span className="ml-auto tracking-normal normal-case">
                optional
              </span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={`${inputClass} h-11`}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="email" className={labelClass}>
              <span className="text-ink">03</span>Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className={`${inputClass} h-11`}
            />
          </div>

          <fieldset className="sm:col-span-2">
            <legend className={`${labelClass} mb-2`}>
              <span className="text-ink">04</span>What do you need?
            </legend>
            <div className="flex flex-wrap gap-2">
              {business.services.map((service, index) => (
                <label key={service} className="cursor-pointer">
                  <input
                    type="radio"
                    name="service"
                    value={service}
                    defaultChecked={index === 0}
                    className="peer sr-only"
                  />
                  <span className={chipClass}>{service}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="message" className={labelClass}>
              <span className="text-ink">05</span>Tell us more
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="What happened, and when can we visit?"
              className={`${inputClass} py-2.5`}
            />
          </div>

          {/* Honeypot: hidden from people, bots fill it in. See decision 0004. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-4 border-t border-line pt-6 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 border-2 border-ink bg-signal px-6 font-bold text-ink shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
            >
              Send request
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="square"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M4 12h15" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </button>
            <p className="font-mono text-xs text-muted">
              We only use your details to answer this request.
            </p>
          </div>

          {notice && (
            <p
              role="status"
              className="border border-alert bg-alert-soft px-3 py-2 text-sm text-alert sm:col-span-2"
            >
              {notice}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
