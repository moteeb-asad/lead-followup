import { business } from "../features/lead-form/business";
import LeadForm from "../features/lead-form/components/LeadForm";
import LeadFormIntro from "../features/lead-form/components/LeadFormIntro";

const year = new Date().getFullYear();

export default function LeadFormPage() {
  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
      <title>Request a quote · Lead Follow-up</title>

      <header className="bg-ink text-paper">
        <div className="mx-auto flex min-h-12 max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2">
          <p className="text-sm font-extrabold font-stretch-expanded tracking-tight uppercase">
            {business.name}
          </p>
          <p className="flex items-center gap-2 font-mono text-label text-fog uppercase">
            <span
              className="size-2 rounded-full bg-signal"
              aria-hidden="true"
            />
            Replies within a minute
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12 lg:py-20">
          <LeadFormIntro />
          <LeadForm />
        </div>
      </main>

      <footer className="border-t border-ink">
        <div className="mx-auto flex min-h-12 max-w-6xl flex-wrap items-center justify-center gap-2 px-6 py-3 font-mono text-label text-muted uppercase">
          <span>
            © {year} {business.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
