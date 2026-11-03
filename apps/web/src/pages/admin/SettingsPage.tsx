import { business } from "@/features/lead-form/business";
import AccountPanel from "@/features/settings/components/AccountPanel";
import AutomationPanel from "@/features/settings/components/AutomationPanel";
import DataPanel from "@/features/settings/components/DataPanel";
import LeadSourcesPanel from "@/features/settings/components/LeadSourcesPanel";
import TemplatesPanel from "@/features/settings/components/TemplatesPanel";

// TODO(week 5): load and save the rule, templates and webhook secret.
// Everything below shows the design's sample data until then.
export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
        <div className="min-w-0">
          <p className="font-mono text-label text-muted uppercase">
            {business.name}
          </p>
          <h1 className="mt-1 text-4xl font-extrabold font-stretch-expanded tracking-tight">
            Settings
          </h1>
        </div>
        <p className="font-mono text-xs leading-5 text-muted">
          Changes apply to new leads only.
          <br />
          Queued messages keep the template they were created with.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <AutomationPanel />
        <LeadSourcesPanel />
        <TemplatesPanel />
        <AccountPanel />
        <DataPanel />
      </div>
    </div>
  );
}
