import { business } from "@/features/lead-form/business";
import PanelTitle from "@/features/leads/components/PanelTitle";

const labelClass = "font-mono text-label text-muted uppercase";
const fieldClass =
  "w-full border border-ink bg-card text-sm focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";
const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt";

// Static sample data from the design. The first one is open in the editor.
const templates = [
  {
    name: "New enquiry",
    subject: "Thanks for getting in touch, {name}",
    usage: "Used by the rule · 143 sent",
  },
  {
    name: "Booking confirmation",
    subject: "Visit confirmed for {service}",
    usage: "Manual only · 58 sent",
  },
  {
    name: "Quote follow-up",
    subject: "Still thinking it over, {name}?",
    usage: "Manual only · 12 sent",
  },
];

const sampleBody = `Hi {name},

Thanks for getting in touch about {service}. We have your enquiry and someone will call you back shortly.

If it's urgent, ring us on ${business.phone}.

${business.name}`;

// Template list on the left, editor on the right.
// Static for now: the list and the buttons do nothing.
export default function TemplatesPanel() {
  return (
    <section
      id="templates"
      className="lg:col-span-12"
      aria-labelledby="templates-title"
    >
      <PanelTitle id="templates-title">Templates</PanelTitle>
      <div className="grid grid-cols-1 border border-ink bg-card lg:grid-cols-12">
        <div className="flex flex-col border-b border-ink lg:col-span-4 lg:border-r lg:border-b-0">
          <ul className="flex-1 divide-y divide-line">
            {templates.map((template, i) => {
              const selected = i === 0;
              return (
                <li key={template.name}>
                  <button
                    type="button"
                    aria-current={selected ? "true" : undefined}
                    className={`flex w-full items-start gap-3 border-l-4 p-4 text-left ${
                      selected
                        ? "border-ink bg-paper-2"
                        : "border-transparent hover:bg-paper-2"
                    }`}
                  >
                    <span
                      className={`mt-1 size-2 shrink-0 ${selected ? "bg-signal" : "border border-ink"}`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {template.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {template.subject}
                      </span>
                      <span className="mt-1 block font-mono text-label text-muted uppercase">
                        {template.usage}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-ink p-4">
            <button
              type="button"
              className={`inline-flex h-11 w-full items-center justify-center gap-2 border border-ink bg-card px-4 text-sm font-semibold hover:bg-paper-2 ${focusClass}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="square"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              New template
            </button>
          </div>
        </div>

        <form
          className="flex flex-col gap-5 p-5 lg:col-span-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className={labelClass}>Editing · New enquiry</p>
            <button
              type="button"
              className={`inline-flex h-9 items-center gap-2 border border-line px-3 font-mono text-label text-ink-2 uppercase hover:border-ink hover:text-ink ${focusClass}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-3.5"
                aria-hidden="true"
              >
                <path d="M3 5h18v14H3z" />
                <path d="m3 6 9 7 9-7" />
              </svg>
              Send me a test
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tpl-name" className={labelClass}>
              Name
            </label>
            <input
              id="tpl-name"
              type="text"
              defaultValue="New enquiry"
              className={`${fieldClass} h-11 px-3`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tpl-subject" className={labelClass}>
              Subject
            </label>
            <input
              id="tpl-subject"
              type="text"
              defaultValue="Thanks for getting in touch, {name}"
              className={`${fieldClass} h-11 px-3`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="tpl-body" className={labelClass}>
                Body
              </label>
              <p className="flex flex-wrap items-center gap-2">
                <span className={labelClass}>Insert</span>
                {["{name}", "{service}"].map((placeholder) => (
                  <button
                    key={placeholder}
                    type="button"
                    className={`inline-flex h-7 items-center border border-ink bg-paper-2 px-2 font-mono text-xs hover:bg-signal ${focusClass}`}
                  >
                    {placeholder}
                  </button>
                ))}
              </p>
            </div>
            <textarea
              id="tpl-body"
              rows={9}
              defaultValue={sampleBody}
              className={`${fieldClass} px-3 py-2.5 leading-6`}
            />
            <p className="font-mono text-xs leading-5 text-muted">
              A placeholder with no value is left out along with its line. An
              unknown one, like <span className="text-ink">{"{postcode}"}</span>
              , blocks saving.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-dashed border-line pt-5">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 border-2 border-ink bg-signal px-6 font-bold text-ink shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
            >
              Save template
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
            <button
              type="button"
              className={`inline-flex h-11 items-center justify-center border border-ink bg-card px-4 text-sm font-semibold hover:bg-paper-2 ${focusClass}`}
            >
              Discard changes
            </button>
            <span className="ml-auto font-mono text-xs text-muted">
              Saved 2 days ago
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
