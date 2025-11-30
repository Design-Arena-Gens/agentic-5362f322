import { Check, Shield, Zap } from "lucide-react";

const plans = [
  {
    name: "Launch",
    price: "$49",
    cadence: "per month",
    description: "For merchants testing a new capture workflow.",
    highlights: [
      "2 active embedded forms",
      "Basic automation recipes",
      "2,000 monthly submissions",
      "Email + in-app support",
    ],
    accent: "bg-sky-100 text-sky-700",
  },
  {
    name: "Scale",
    price: "$149",
    cadence: "per month",
    description: "Balanced routing, analytics, and marketing automation.",
    highlights: [
      "Unlimited forms & templates",
      "Klaviyo + attentive sync",
      "Advanced field mapping",
      "Daily performance digest",
    ],
    accent: "bg-emerald-100 text-emerald-700",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Let’s talk",
    cadence: "custom",
    description: "Security, compliance, and dedicated rollout services.",
    highlights: [
      "Headless deployment kits",
      "SOC 2 Type II + GDPR addendum",
      "Priority success pod",
      "Onsite workflow architect",
    ],
    accent: "bg-violet-100 text-violet-700",
  },
];

const addOns = [
  {
    name: "Concierge build service",
    detail: "Our team designs + launches a conversion optimized flow.",
    price: "$1,250 one-time",
  },
  {
    name: "Data warehouse sync",
    detail: "Snowflake / BigQuery ingestion with nightly refresh.",
    price: "$299 per month",
  },
  {
    name: "White-label portal",
    detail: "Custom domain, theme control, and partner-ready experience.",
    price: "$499 per month",
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">
          Pricing that scales with your lead engine
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Choose the plan that matches your automation maturity. All tiers
          include unlimited seats, Shopify app embeds, and conversion analytics.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-2xl border border-border bg-white/95 p-6 shadow-sm transition hover:border-accent/40 ${
              plan.featured ? "ring-2 ring-accent/20" : ""
            }`}
          >
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${plan.accent}`}
            >
              {plan.featured ? "Recommended" : "Flexible"}
            </span>
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              {plan.name}
            </h2>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
            <div className="mt-6">
              <span className="text-3xl font-semibold text-foreground">
                {plan.price}
              </span>
              <span className="ml-2 text-sm text-muted">{plan.cadence}</span>
            </div>
            <button className="mt-6 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90">
              {plan.price === "Let’s talk" ? "Book strategy call" : "Start trial"}
            </button>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {plan.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-6 lg:flex-row">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Enterprise-grade as standard
            </h2>
            <p className="mt-2 text-sm text-muted">
              Compliance-ready data handling, and resilience for the busiest
              Shopify storefronts.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                SOC 2 Type II, GDPR, CCPA compliant
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                99.95% uptime SLA & priority incident routing
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Popular add-ons
            </h3>
            <div className="mt-4 space-y-3">
              {addOns.map((addon) => (
                <div
                  key={addon.name}
                  className="rounded-xl border border-border bg-slate-50 px-4 py-4 text-sm text-muted"
                >
                  <div className="flex items-center justify-between text-foreground">
                    <p className="font-semibold">{addon.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {addon.price}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted">{addon.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
