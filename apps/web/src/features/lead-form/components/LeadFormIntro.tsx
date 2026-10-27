import { business } from "../business";

const steps = [
  { title: "You send the form", detail: "It takes about a minute." },
  {
    title: "We email you back",
    detail: "Within a minute, with your request number.",
  },
  { title: "We call to book a visit", detail: "During opening hours." },
];

export default function LeadFormIntro() {
  return (
    <section className="flex flex-col gap-8 lg:col-span-5">
      <p className="font-mono text-label text-muted uppercase">
        Request a quote · Form 01
      </p>
      <h1 className="text-4xl leading-[0.95] font-extrabold font-stretch-expanded tracking-tight sm:text-5xl lg:text-6xl">
        Tell us what needs{" "}
        <mark className="inline-block bg-signal px-1 leading-[1.05] text-ink">
          fixing.
        </mark>
      </h1>
      <p className="max-w-md text-lg text-ink-2">
        Fill in the form. A confirmation email lands in your inbox within a
        minute, then we call you to book a visit.
      </p>

      <ol className="border-t-2 border-ink">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-b border-line py-4"
          >
            <span className="font-mono text-sm font-medium">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-semibold">{step.title}</p>
              <p className="mt-0.5 text-sm text-muted">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="font-mono text-xs text-ink-2">
        Prefer to call?{" "}
        <a href={business.phoneHref} className="underline underline-offset-4">
          {business.phone}
        </a>
      </p>
    </section>
  );
}
