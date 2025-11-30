import { AlertTriangle, Crown, ListChecks, Shield } from "lucide-react";

const auditLog = [
  {
    actor: "Amelia Chen",
    role: "Superadmin",
    action: "Updated role permissions",
    area: "Workspace security",
    time: "2 minutes ago",
  },
  {
    actor: "Logan Patel",
    role: "Admin",
    action: "Published new form template",
    area: "Template library",
    time: "18 minutes ago",
  },
  {
    actor: "Nora Izumi",
    role: "Analyst",
    action: "Exported analytics CSV",
    area: "Analytics",
    time: "55 minutes ago",
  },
];

export default function SuperadminPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">
              Superadmin console
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              Governance & control center
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Manage tenant-wide policies, audit activity, and orchestrate
              rollouts. These settings override workspace-level preferences.
            </p>
          </div>
          <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90">
            New automation blueprint
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Workspaces",
            metric: "12",
            detail: "Active storefront instances",
            icon: Crown,
          },
          {
            title: "Admins",
            metric: "48",
            detail: "Human operators across regions",
            icon: Shield,
          },
          {
            title: "Policies",
            metric: "27",
            detail: "Active guardrails and automation rules",
            icon: ListChecks,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                    {card.title}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-foreground">
                    {card.metric}
                  </p>
                  <p className="mt-1 text-xs text-muted">{card.detail}</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Audit trail</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Real-time
          </span>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="min-w-full divide-y divide-border text-sm text-muted">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 text-left">Actor</th>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">Area</th>
                <th className="px-4 py-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {auditLog.map((entry) => (
                <tr key={`${entry.actor}-${entry.time}`}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-foreground">
                      {entry.actor}
                    </div>
                    <div className="text-xs">{entry.role}</div>
                  </td>
                  <td className="px-4 py-3">{entry.action}</td>
                  <td className="px-4 py-3">{entry.area}</td>
                  <td className="px-4 py-3">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">
              Incident playbooks
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted">
            Prepared responses for data anomalies and compliance breaches.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="rounded-xl border border-border bg-slate-50 px-4 py-3">
              <span className="font-semibold text-foreground">
                Unexpected submission spike
              </span>
              <p className="mt-1 text-xs">
                Auto-enable captcha, notify security channel, and throttle API.
              </p>
            </li>
            <li className="rounded-xl border border-border bg-slate-50 px-4 py-3">
              <span className="font-semibold text-foreground">
                Data residency conflict
              </span>
              <p className="mt-1 text-xs">
                Route to legal, pause exports, and initiate compliance review.
              </p>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Workspace provisioning queue
          </h2>
          <p className="mt-1 text-sm text-muted">
            Approve or reject workspace creation requests from new regions.
          </p>
          <div className="mt-4 space-y-3">
            {[
              { name: "Sydney storefront", owner: "APAC Ops", seats: 8 },
              { name: "Berlin expansion", owner: "EU Growth", seats: 5 },
              { name: "Dubai retail", owner: "MENA Retail", seats: 12 },
            ].map((workspace) => (
              <div
                key={workspace.name}
                className="rounded-xl border border-border px-4 py-4 text-sm text-muted"
              >
                <div className="flex items-center justify-between text-foreground">
                  <span className="font-semibold">{workspace.name}</span>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    {workspace.seats} seats
                  </span>
                </div>
                <p className="mt-2 text-xs">Owner: {workspace.owner}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                    Approve
                  </button>
                  <button className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted hover:border-accent hover:text-accent">
                    Request info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
