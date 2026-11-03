import PanelTitle from "@/features/leads/components/PanelTitle";

const selectClass =
  "h-11 w-full appearance-none border border-ink bg-card pr-9 pl-3 text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";

const selects = [
  {
    id: "rule-trigger",
    label: "When",
    options: ["A new lead arrives", "A lead is marked Contacted"],
  },
  {
    id: "rule-template",
    label: "Send",
    options: ["New enquiry", "Booking confirmation", "Quote follow-up"],
  },
];

// The one automation rule. Static for now: saving does nothing.
export default function AutomationPanel() {
  return (
    <section className="lg:col-span-5" aria-labelledby="automation-title">
      <PanelTitle id="automation-title">Automation</PanelTitle>
      <form
        className="flex flex-col gap-5 border border-ink bg-card p-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-line pb-5">
          <div className="min-w-0">
            <label htmlFor="rule-active" className="text-sm font-semibold">
              Auto-reply to new leads
            </label>
            <p className="mt-1 text-xs leading-5 text-muted">
              When off, leads are still recorded. Nothing is sent.
            </p>
          </div>
          <input
            id="rule-active"
            type="checkbox"
            defaultChecked
            className="peer sr-only"
          />
          {/* The visible switch. Clicking it toggles the hidden checkbox. */}
          <label
            htmlFor="rule-active"
            className="relative mt-0.5 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center border-2 border-ink bg-paper-2 peer-checked:bg-signal peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt after:absolute after:left-0.5 after:size-5 after:bg-ink after:transition-transform peer-checked:after:translate-x-5"
          >
            <span className="sr-only">Auto-reply to new leads</span>
          </label>
        </div>

        <p className="font-mono text-label text-muted uppercase">The rule</p>

        {selects.map((select) => (
          <div key={select.id} className="flex flex-col gap-2">
            <label htmlFor={select.id} className="text-sm font-semibold">
              {select.label}
            </label>
            <div className="relative">
              <select id={select.id} className={selectClass}>
                {select.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="square"
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label htmlFor="rule-delay" className="text-sm font-semibold">
            Wait
          </label>
          <div className="flex items-center gap-3">
            <input
              id="rule-delay"
              type="text"
              inputMode="numeric"
              defaultValue="0"
              className="h-11 w-20 border border-ink bg-card px-3 text-sm tabular-nums focus:outline-2 focus:outline-offset-2 focus:outline-cobalt"
            />
            <span className="text-sm text-ink-2">days before sending</span>
          </div>
          <p className="font-mono text-xs leading-5 text-muted">
            0 means the worker picks it up on its next poll, within 5 seconds.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center gap-2 border-2 border-ink bg-signal px-6 font-bold text-ink shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
        >
          Save rule
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
      </form>
    </section>
  );
}
