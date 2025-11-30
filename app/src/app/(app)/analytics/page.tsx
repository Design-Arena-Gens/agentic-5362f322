import { BarChart3, Gauge, PieChart, TrendingUp } from "lucide-react";

const funnels = [
  {
    stage: "Views",
    value: 15843,
    conversion: "—",
  },
  {
    stage: "Starts",
    value: 8023,
    conversion: "50.7%",
  },
  {
    stage: "Submissions",
    value: 5249,
    conversion: "65.4%",
  },
  {
    stage: "Qualified",
    value: 3241,
    conversion: "61.7%",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">
          Analytics dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Monitor form performance, channel attribution, and revenue influence
          across your Shopify experiences.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {[
          { title: "Submission rate", metric: "66%", detail: "+4.2% vs last week", icon: Gauge },
          { title: "Revenue influenced", metric: "$82.6k", detail: "+11.5%", icon: TrendingUp },
          { title: "Average order value", metric: "$148", detail: "+6.1%", icon: BarChart3 },
          { title: "Repeat conversion", metric: "38%", detail: "+2.4%", icon: PieChart },
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
                  <p className="mt-3 text-2xl font-semibold text-foreground">
                    {card.metric}
                  </p>
                  <p className="mt-1 text-xs text-emerald-600">{card.detail}</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Funnel performance
          </h2>
          <p className="mt-1 text-sm text-muted">
            Track how prospects progress from view to qualified lead.
          </p>
          <div className="mt-4 space-y-3">
            {funnels.map((step, index) => (
              <div
                key={step.stage}
                className="rounded-xl border border-border px-4 py-4 text-sm text-muted"
              >
                <div className="flex items-center justify-between text-foreground">
                  <span className="font-semibold">{index + 1}. {step.stage}</span>
                  <span>{step.value.toLocaleString()}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.max(5, Math.min(95, (step.value / funnels[0].value) * 100))}%` }}
                  />
                </div>
                <p className="mt-2 text-xs">
                  Conversion: {step.conversion}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Channel attribution
          </h2>
          <p className="mt-1 text-sm text-muted">
            Understand which experiences contribute best to revenue.
          </p>
          <div className="mt-4 grid gap-3">
            {[
              {
                channel: "Embedded form",
                revenue: "$38.7k",
                weight: "47%",
                insight: "High-intent for bundle purchases.",
              },
              {
                channel: "Popup capture",
                revenue: "$21.4k",
                weight: "26%",
                insight: "Drives SMS-first shoppers.",
              },
              {
                channel: "Wholesale intake",
                revenue: "$14.8k",
                weight: "18%",
                insight: "Requires sales follow-up within 2 hours.",
              },
              {
                channel: "Referral portal",
                revenue: "$7.7k",
                weight: "9%",
                insight: "Strong AOV when paired with loyalty offer.",
              },
            ].map((row) => (
              <article
                key={row.channel}
                className="rounded-xl border border-border px-4 py-4 text-sm text-muted"
              >
                <div className="flex items-center justify-between text-foreground">
                  <span className="font-semibold">{row.channel}</span>
                  <span>{row.weight}</span>
                </div>
                <p className="mt-1 text-xs text-accent">{row.revenue} influenced</p>
                <p className="mt-2 text-xs">{row.insight}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
