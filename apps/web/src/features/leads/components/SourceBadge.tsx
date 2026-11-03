import type { LeadSource } from "../types";

export default function SourceBadge({ source }: { source: LeadSource }) {
  return (
    <span className="inline-flex h-6 items-center border border-line px-2 font-mono text-label text-ink-2 uppercase">
      {source}
    </span>
  );
}
