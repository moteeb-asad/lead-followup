const time = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});
const dayMonth = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});
const dayMonthYear = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// "Today 14:19", "Yesterday 09:47", "25 Oct 09:47", and with the year for an
// older year: "25 Oct 2025 09:47". Shown in the viewer's own time zone.
export function formatReceived(iso: string, now = new Date()) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const clock = time.format(date);
  if (sameDay(date, now)) return `Today ${clock}`;
  if (sameDay(date, yesterday)) return `Yesterday ${clock}`;
  const day =
    date.getFullYear() === now.getFullYear()
      ? dayMonth.format(date)
      : dayMonthYear.format(date);
  return `${day} ${clock}`;
}
