import {
  Activity,
  BarChart4,
  CheckCircle2,
  Clock3,
  Megaphone,
  PlugZap,
} from "lucide-react";

const initiatives = [
  {
    title: "Retail pop-up waitlist",
    owner: "CX Ops",
    status: "In progress",
    icon: Megaphone,
    detail: "SMS nurture flow + incentive ladder.",
  },
  {
    title: "Wholesale onboarding",
    owner: "B2B Success",
    status: "Complete",
    icon: PlugZap,
    detail: "Salesforce sync live across 4 regions.",
  },
  {
    title: "Influencer lead capture",
    owner: "Community",
    status: "Blocked",
    icon: Activity,
    detail: "Awaiting UTM contract approvals.",
  },
];

const pulse = [
  { metric: "Qualified conversions", value: "62%", trend: "+7.3%" },
  { metric: "Revenue influenced", value: "$118k", trend: "+12.1%" },
  { metric: "Average response time", value: "1h 12m", trend: "-16%" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">
              Executive overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              Revenue operations & lead intake pulse
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Embedded app usage and automation performance across your Shopify
              storefronts. Monitor submissions, velocity, and downstream impact
              from one control tower.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-muted">
            <div className="flex items-center gap-2 rounded-full border border-border bg-slate-50 px-4 py-2">
              <Clock3 className="h-4 w-4 text-accent" />
              Last sync: 3 minutes ago
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-slate-50 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              All automation health checks pass
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {pulse.map((item) => (
          <article
            key={item.metric}
            className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              {item.metric}
            </p>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              {item.value}
            </p>
            <p className="mt-2 text-xs font-medium text-emerald-600">
              {item.trend}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Top initiatives
          </h2>
          <p className="mt-1 text-sm text-muted">
            Keep stakeholders aligned on funnel experiments and owned projects.
          </p>
          <div className="mt-5 space-y-4">
            {initiatives.map((initiative) => {
              const Icon = initiative.icon;
              return (
                <div
                  key={initiative.title}
                  className="rounded-xl border border-border px-4 py-4 transition hover:border-accent/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <span className="mt-1 grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {initiative.title}
                        </p>
                        <p className="text-xs text-muted">{initiative.detail}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                      {initiative.status}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    Owner: <span className="font-medium">{initiative.owner}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Submission velocity
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              Forecast stable
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            Daily submissions by segment with conversion lift. Export to your BI
            tool anytime.
          </p>
          <div className="mt-5 grid gap-3">
            {[
              { channel: "Onsite forms", value: 312, lift: "+9.4%" },
              { channel: "Lead capture QR", value: 122, lift: "+12.8%" },
              { channel: "Partner embeds", value: 78, lift: "-2.1%" },
            ].map((item) => (
              <div
                key={item.channel}
                className="rounded-xl border border-border px-4 py-3"
              >
                <div className="flex items-center justify-between text-sm text-foreground">
                  <span>{item.channel}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(item.value / 3, 96)}%` }} />
                </div>
                <p className="mt-2 text-xs font-medium text-emerald-600">
                  {item.lift} this week
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Escalations & follow-ups
          </h2>
          <BarChart4 className="h-5 w-5 text-muted" />
        </div>
        <p className="mt-1 text-sm text-muted">
          Monitor the critical actions triggered from submissions and SLA timers.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {[
            {
              heading: "High-intent leads",
              detail: "12 requests pending a human reply",
              meta: "Priority: Enterprise",
            },
            {
              heading: "Logistics escalations",
              detail: "4 shipments require manual verification",
              meta: "Priority: Shipping",
            },
            {
              heading: "Billing follow-ups",
              detail: "9 upgrade paths flagged in Stripe",
              meta: "Priority: Finance",
            },
          ].map((card) => (
            <article
              key={card.heading}
              className="rounded-xl border border-border bg-slate-50 px-4 py-4 text-sm text-muted"
            >
              <p className="text-sm font-semibold text-foreground">
                {card.heading}
              </p>
              <p className="mt-2">{card.detail}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {card.meta}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
