import KpiStrip from "@/features/dashboard/components/KpiStrip";
import LeadsPerDayChart from "@/features/dashboard/components/LeadsPerDayChart";
import OutboxPanel from "@/features/dashboard/components/OutboxPanel";
import RecentLeads from "@/features/dashboard/components/RecentLeads";

const ranges = ["Today", "7 days", "30 days"];

// TODO(week 4): load the numbers from GET /api/stats. Everything below shows
// the design's sample data until then.
export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-label text-muted uppercase">
            Tue 27 Oct 2026 · 14:20
          </p>
          <h1 className="mt-1 text-4xl font-extrabold font-stretch-expanded tracking-tight">
            Today
          </h1>
        </div>
        <div
          role="group"
          aria-label="Date range"
          className="inline-flex border border-ink bg-card"
        >
          {ranges.map((range, i) => (
            <button
              key={range}
              type="button"
              aria-pressed={i === 0}
              className={`h-11 px-4 font-mono text-label uppercase ${
                i === 0
                  ? "bg-ink text-paper"
                  : "border-l border-ink hover:bg-paper-2"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <KpiStrip />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <LeadsPerDayChart />
        <OutboxPanel />
      </div>

      <RecentLeads />
    </>
  );
}
