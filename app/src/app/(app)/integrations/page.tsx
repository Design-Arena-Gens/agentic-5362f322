import { Cable, Cloud, Database, Plug, Slack } from "lucide-react";

const integrations = [
  {
    name: "Klaviyo",
    type: "Lifecycle marketing",
    status: "Connected",
    description: "Sync captured leads into lists and trigger flows instantly.",
    icon: Cloud,
  },
  {
    name: "HubSpot",
    type: "CRM & sales handoff",
    status: "Connected",
    description: "Map fields to deals, owners, and lifecycle stages.",
    icon: Plug,
  },
  {
    name: "Slack",
    type: "Enablement alerts",
    status: "Connected",
    description: "Route intent signals to dedicated channels with context.",
    icon: Slack,
  },
  {
    name: "Snowflake",
    type: "Data warehouse",
    status: "Pending",
    description: "Mirror submission records for BI and advanced modelling.",
    icon: Database,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">
          Integrations hub
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Activate out-of-the-box connections or build on open APIs to align your
          lead data with every system of record.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Cable className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">
            Connected platforms
          </h2>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <article
                key={integration.name}
                className="rounded-xl border border-border bg-slate-50 px-4 py-4 text-sm text-muted"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <span className="mt-1 grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {integration.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wide text-muted">
                        {integration.type}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      integration.status === "Connected"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {integration.status}
                  </span>
                </div>
                <p className="mt-3">{integration.description}</p>
                <button className="mt-3 text-xs font-semibold text-accent">
                  Manage mapping →
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">API endpoints</h2>
        <p className="mt-2 text-sm text-muted">
          Extend the platform with secure REST APIs backed by signed webhooks.
        </p>
        <div className="mt-4 grid gap-3 text-sm text-muted">
          {[
            {
              method: "POST",
              endpoint: "/v1/forms/{formId}/submissions",
              desc: "Inject submissions from offline channels.",
            },
            {
              method: "GET",
              endpoint: "/v1/leads/{leadId}",
              desc: "Retrieve enriched lead data and automation history.",
            },
            {
              method: "POST",
              endpoint: "/v1/webhooks",
              desc: "Subscribe to submission, delivery, and status events.",
            },
          ].map((api) => (
            <div
              key={api.endpoint}
              className="rounded-xl border border-border bg-slate-50 px-4 py-3"
            >
              <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                {api.method}
              </span>
              <p className="mt-2 font-mono text-sm text-foreground">
                {api.endpoint}
              </p>
              <p className="mt-1 text-xs">{api.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
