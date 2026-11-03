import { business } from "@/features/lead-form/business";
import PanelTitle from "./PanelTitle";

const labelClass = "font-mono text-label text-muted uppercase";
const fieldClass =
  "w-full border border-ink bg-card text-sm focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";

const templates = [
  "Booking confirmation",
  "New enquiry",
  "Quote follow-up",
  "No template",
];

const sampleBody = `Hi Sara,

Our engineer will come tomorrow, Wed 28 Oct, between 2pm and 4pm.

Reply to this email if that time doesn't suit you.

${business.name}`;

// Static for now: submitting does nothing until the outbox API exists.
export default function ReplyForm() {
  return (
    <section className="lg:col-span-4" aria-labelledby="reply-title">
      <PanelTitle id="reply-title">Reply</PanelTitle>
      <form
        className="flex flex-col gap-4 border border-ink bg-card p-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <p className="font-mono text-xs text-ink-2">
          <span className="text-muted">To</span> sara.khan@example.com
        </p>
        <div className="flex flex-col gap-2">
          <label htmlFor="template" className={labelClass}>
            Template
          </label>
          <div className="relative">
            <select
              id="template"
              className={`${fieldClass} h-11 appearance-none pr-9 pl-3 font-medium`}
            >
              {templates.map((template) => (
                <option key={template}>{template}</option>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            defaultValue="Visit confirmed: Wed 28 Oct, 2–4pm"
            className={`${fieldClass} h-11 px-3`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="body" className={labelClass}>
            Message
          </label>
          <textarea
            id="body"
            name="body"
            rows={10}
            defaultValue={sampleBody}
            className={`${fieldClass} px-3 py-2.5 leading-6`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center gap-2 border-2 border-ink bg-signal px-6 font-bold text-ink shadow-hard hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
        >
          Queue reply
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
        <p className="font-mono text-xs leading-5 text-muted">
          Goes to the outbox. The worker sends it within 5 seconds and retries
          twice if sending fails.
        </p>
      </form>
    </section>
  );
}
