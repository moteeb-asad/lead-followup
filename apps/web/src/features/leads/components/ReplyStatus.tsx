import type { ReplyState } from "../types";

// The auto-reply state: "Queued", "Sent · 44s" or "Failed · 3/3".
export default function ReplyStatus({
  state,
  text,
}: {
  state: ReplyState;
  text: string;
}) {
  if (state === "failed") {
    return (
      <span className="inline-flex h-6 items-center gap-1.5 bg-alert-soft px-2 font-mono text-label text-alert uppercase">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          className="size-3"
          aria-hidden="true"
        >
          <path d="M12 4 21 20H3zM12 10v4M12 17v.5" />
        </svg>
        {text}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-2">
      {state === "queued" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="square"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M5 12.5 10 17l9-10" />
        </svg>
      )}
      {text}
    </span>
  );
}
