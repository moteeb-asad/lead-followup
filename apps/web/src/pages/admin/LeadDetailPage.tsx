import { Link, useParams } from "react-router";

// TODO(week 4): load the lead and its timeline from GET /api/leads/:id.
export default function LeadDetailPage() {
  const { leadId } = useParams();

  return (
    <section>
      <Link to="/admin/leads" className="text-sm text-blue-700 hover:underline">
        ← Back to leads
      </Link>
      <h1 className="mt-2 text-xl font-semibold">Lead {leadId}</h1>
      <p className="mt-4 text-sm text-slate-500">
        The timeline appears here once the API exists.
      </p>
    </section>
  );
}
