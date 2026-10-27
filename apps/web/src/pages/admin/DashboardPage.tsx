const stats = [
  "New leads today",
  "Auto-replies sent",
  "Failed",
  "Average first reply",
];

// TODO(week 4): load the numbers from GET /api/stats.
export default function DashboardPage() {
  return (
    <section>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((label) => (
          <div
            key={label}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <p className="text-sm text-slate-600">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-400">—</p>
          </div>
        ))}
      </div>
    </section>
  );
}
