import { Link } from "react-router";
import KpiCell from "./KpiCell";

export default function KpiStrip() {
  return (
    <section
      aria-label="Key numbers"
      className="grid grid-cols-1 border-y-2 border-ink bg-card sm:grid-cols-2 xl:grid-cols-4"
    >
      <KpiCell label="New leads today" index="01" value="5">
        <p className="font-mono text-xs text-ink-2">+2 vs yesterday</p>
      </KpiCell>
      <KpiCell
        label="Auto-replies sent"
        index="02"
        value="3"
        className="border-t border-ink sm:border-t-0 sm:border-l"
      >
        <p className="font-mono text-xs text-ink-2">
          of 5 · 1 queued · 1 failed
        </p>
      </KpiCell>
      <KpiCell
        label="Failed"
        index="03"
        value="1"
        valueClassName="text-alert"
        className="border-t border-ink xl:border-t-0 xl:border-l"
      >
        <Link
          to="/admin/leads"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-alert underline underline-offset-4"
        >
          Ali Raza · 3 of 3 attempts
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="square"
            className="size-3.5"
            aria-hidden="true"
          >
            <path d="M4 12h15" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </Link>
      </KpiCell>
      <KpiCell
        label="Avg first reply"
        index="04"
        value={
          <>
            41<span className="text-3xl">s</span>
          </>
        }
        className="border-t border-ink sm:border-l xl:border-t-0"
      >
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 bg-paper-2" aria-hidden="true">
            <div className="h-2 w-[68%] bg-ink" />
          </div>
          <p className="font-mono text-xs text-ink-2">Goal: under 60s</p>
        </div>
      </KpiCell>
    </section>
  );
}
