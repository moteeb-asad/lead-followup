import PanelTitle from "@/features/leads/components/PanelTitle";

const labelClass = "font-mono text-label text-muted uppercase";
const fieldClass =
  "h-11 w-full border border-ink bg-card px-3 text-sm placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-cobalt";

// Static for now: updating does nothing.
export default function AccountPanel() {
  return (
    <section className="lg:col-span-5" aria-labelledby="account-title">
      <PanelTitle id="account-title">Account</PanelTitle>
      <form
        className="flex flex-col gap-5 border border-ink bg-card p-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="acct-email" className={labelClass}>
            Email
          </label>
          <input
            id="acct-email"
            type="email"
            defaultValue="owner@example.com"
            autoComplete="username"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="acct-pass" className={labelClass}>
            New password
          </label>
          <input
            id="acct-pass"
            type="password"
            placeholder="Leave blank to keep the current one"
            autoComplete="new-password"
            className={fieldClass}
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center border border-ink bg-card px-4 text-sm font-semibold hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
        >
          Update account
        </button>
        <p className="border-t border-dashed border-line pt-4 font-mono text-xs leading-5 text-muted">
          Changing the password signs out every other session. This one stays
          open.
        </p>
      </form>
    </section>
  );
}
