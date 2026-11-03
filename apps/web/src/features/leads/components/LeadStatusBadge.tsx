import type { LeadStatus } from "../types";

const styles: Record<LeadStatus, { badge: string; dot: string }> = {
  new: { badge: "bg-signal text-ink", dot: "bg-ink" },
  contacted: { badge: "bg-cobalt-soft text-cobalt", dot: "bg-cobalt" },
  won: { badge: "bg-ink text-paper", dot: "bg-signal" },
  lost: { badge: "border border-line text-muted", dot: "bg-muted" },
};

export default function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const style = styles[status];
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 px-2 font-mono text-label uppercase ${style.badge}`}
    >
      <span className={`size-1.5 ${style.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}
