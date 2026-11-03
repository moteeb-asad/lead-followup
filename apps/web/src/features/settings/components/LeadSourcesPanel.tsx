import PanelTitle from "@/features/leads/components/PanelTitle";

const fieldClass =
  "h-11 min-w-0 flex-[999_1_240px] border border-ink bg-paper-2 px-3 font-mono text-xs focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";
const buttonClass =
  "inline-flex h-11 items-center justify-center gap-2 border border-ink bg-card px-4 font-mono text-label uppercase hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt";

function CopyButton() {
  return (
    <button type="button" className={`${buttonClass} flex-[1_1_auto]`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M9 9h11v11H9z" />
        <path d="M5 15H4V4h11v1" />
      </svg>
      Copy
    </button>
  );
}

const counts = [
  { label: "Form", value: 9 },
  { label: "Webhook", value: 4 },
  { label: "Rejected", value: 1 },
];

// Where leads come from: the public form and the webhook.
// Static for now: the buttons do nothing and the numbers are sample data.
export default function LeadSourcesPanel() {
  const origin = window.location.origin;

  return (
    <section className="lg:col-span-7" aria-labelledby="sources-title">
      <PanelTitle id="sources-title">Lead sources</PanelTitle>
      <div className="flex flex-col gap-5 border border-ink bg-card p-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="form-url" className="text-sm font-semibold">
            Public form
          </label>
          <p className="text-xs leading-5 text-muted">
            Link this from your website, or embed it. Submissions arrive as
            source <span className="font-mono">form</span>.
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              id="form-url"
              type="text"
              readOnly
              value={`${origin}/form`}
              className={fieldClass}
            />
            <CopyButton />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-dashed border-line pt-5">
          <label htmlFor="hook-url" className="text-sm font-semibold">
            Webhook
          </label>
          <p className="text-xs leading-5 text-muted">
            For Facebook lead ads and other tools. POST JSON here with the
            secret in an <span className="font-mono">X-Webhook-Secret</span>{" "}
            header.
          </p>
          <div className="flex flex-wrap gap-2">
            <input
              id="hook-url"
              type="text"
              readOnly
              value={`${origin}/api/webhooks/leads`}
              className={fieldClass}
            />
            <CopyButton />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="hook-secret" className="text-sm font-semibold">
            Secret
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id="hook-secret"
              type="text"
              readOnly
              value="whsec_••••••••••••••••••••••••7a31"
              className={fieldClass}
            />
            <button type="button" className={buttonClass}>
              Reveal
            </button>
            <button type="button" className={buttonClass}>
              Rotate
            </button>
          </div>
          <p className="flex items-start gap-2 font-mono text-xs leading-5 text-muted">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-0.5 size-3.5 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16.5v.01" />
            </svg>
            Rotating breaks any tool still sending the old secret. Last rotated
            3 Sep 2026.
          </p>
        </div>

        <div className="border-t-2 border-ink pt-4">
          <p className="font-mono text-label text-muted uppercase">
            Last 24 hours
          </p>
          <dl className="mt-3 grid grid-cols-3 gap-px border border-line bg-line">
            {counts.map((count) => (
              <div key={count.label} className="bg-card px-4 py-3">
                <dt className="font-mono text-label text-muted uppercase">
                  {count.label}
                </dt>
                <dd className="mt-1 font-mono text-2xl tabular-nums">
                  {count.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 font-mono text-xs leading-5 text-muted">
            1 rejected: bad secret, 04:12. Duplicates of a lead already received
            are ignored, not rejected.
          </p>
        </div>
      </div>
    </section>
  );
}
