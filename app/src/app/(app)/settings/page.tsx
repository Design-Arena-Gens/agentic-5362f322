import { Bell, ShieldCheck, UserCog } from "lucide-react";

const toggles = [
  {
    name: "Two-factor authentication",
    description: "Required for all staff accounts with admin access.",
    enabled: true,
  },
  {
    name: "Session timeout",
    description: "Auto-logout users after 30 minutes of inactivity.",
    enabled: true,
  },
  {
    name: "IP allowlist",
    description: "Restrict superadmin panel to trusted networks.",
    enabled: false,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              Application settings
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Govern access, notifications, and privacy on behalf of your Shopify
              workspace. Changes propagate instantly across embedded surfaces.
            </p>
          </div>
          <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90">
            Save changes
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <form className="space-y-4 rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Workspace identity
          </h2>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Workspace name
            </span>
            <input
              defaultValue="LeadFlow Studio"
              className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Default sender email
            </span>
            <input
              defaultValue="hello@leadflow.studio"
              className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Primary timezone
            </span>
            <select className="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-accent">
              <option>GMT-05:00 Eastern Time</option>
              <option>GMT-08:00 Pacific Time</option>
              <option>GMT+00:00 UTC</option>
            </select>
          </label>
        </form>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <UserCog className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                Role management
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted">
              Assign roles across admin, collaborator, and analyst profiles.
            </p>
            <div className="mt-4 space-y-3">
              {["Admin", "Collaborator", "Analyst"].map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm text-muted"
                >
                  <span className="text-foreground font-semibold">{role}</span>
                  <button className="text-xs font-semibold text-accent">
                    Configure permissions
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                Security policies
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              {toggles.map((toggle) => (
                <label
                  key={toggle.name}
                  className="flex items-start justify-between gap-4 rounded-xl border border-border bg-slate-50 px-4 py-3 text-sm text-muted"
                >
                  <span>
                    <span className="font-semibold text-foreground">
                      {toggle.name}
                    </span>
                    <p className="mt-1 text-xs">{toggle.description}</p>
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked={toggle.enabled}
                    className="mt-1 h-5 w-5 rounded border-border text-accent focus:ring-accent"
                  />
                </label>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">
            Alert thresholds
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted">
          Notify relevant teams when submission velocity or delivery promise
          metrics fall outside guardrails.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {[
            {
              name: "Submission drop",
              detail: "Alert if daily submissions decrease by 20%.",
            },
            {
              name: "Delivery SLA risk",
              detail: "Flag if on-time delivery dips below 92%.",
            },
            {
              name: "Spam detection",
              detail: "Pause form if spam score climbs above 40%.",
            },
          ].map((item) => (
            <article
              key={item.name}
              className="rounded-xl border border-border bg-slate-50 px-4 py-4 text-sm text-muted"
            >
              <span className="font-semibold text-foreground">{item.name}</span>
              <p className="mt-2">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-accent bg-accent-soft px-6 py-6 text-sm text-accent shadow-sm">
        <p className="font-semibold">Tip</p>
        <p className="mt-2">
          Mirror your Shopify collaborator roles with these permissions to give
          store staff contextual access without overexposing automation controls.
        </p>
      </section>
    </div>
  );
}
