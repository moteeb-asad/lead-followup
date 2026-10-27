import { useState, type FormEvent } from "react";

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none";

// The public form a business puts on its website.
// TODO(week 3): send the form to POST /api/public/leads.
export default function LeadFormPage() {
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Saving leads isn't connected yet. It arrives with the API.");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Request a quote</h1>
        <p className="mt-1 text-sm text-slate-600">
          We'll get back to you within a minute.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Name
            <input name="name" required className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            Phone
            <input name="phone" type="tel" className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            Service needed
            <input name="service" required className={inputClass} />
          </label>
          <label className="block text-sm font-medium">
            Message
            <textarea name="message" rows={3} className={inputClass} />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Send request
          </button>
        </form>

        {notice && <p className="mt-4 text-sm text-amber-700">{notice}</p>}
      </div>
    </main>
  );
}
