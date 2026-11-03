import LeadContact from "@/features/leads/components/LeadContact";
import LeadHeader from "@/features/leads/components/LeadHeader";
import LeadTimeline from "@/features/leads/components/LeadTimeline";
import ReplyForm from "@/features/leads/components/ReplyForm";

// TODO(week 4): load the lead and its timeline from GET /api/leads/:id.
// Every lead shows the design's sample lead (Sara Khan) until then.
export default function LeadDetailPage() {
  return (
    <div className="flex flex-col gap-8">
      <LeadHeader />
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <LeadContact />
        <LeadTimeline />
        <ReplyForm />
      </div>
    </div>
  );
}
