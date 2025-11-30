import { MapPin, Navigation, Package, Route, Truck } from "lucide-react";

const deliverySteps = [
  {
    title: "Origin mapping",
    description: "Connect Shopify locations and define pickup cut-off times.",
    icon: MapPin,
    status: "Complete",
  },
  {
    title: "Service levels",
    description:
      "Configure same-day, express, and international intent routing.",
    icon: Route,
    status: "In progress",
  },
  {
    title: "Carrier sync",
    description:
      "Sync tracking events with lead timeline and automate SMS nudges.",
    icon: Truck,
    status: "Pending",
  },
];

const lanes = [
  {
    lane: "Domestic express",
    sla: "Delivered in ≤2 days",
    automation: "Triggers VIP concierge follow-up",
    success: "98.1%",
  },
  {
    lane: "International priority",
    sla: "Delivered in ≤5 days",
    automation: "Upsell email + localized thank you page",
    success: "93.4%",
  },
  {
    lane: "Wholesale freight",
    sla: "Delivered in ≤10 days",
    automation: "Slack + HubSpot task with freight docs",
    success: "88.7%",
  },
];

export default function DeliverySetupPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">
          Delivery orchestration
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Bring delivery experience into your lead capture narrative. Configure
          fulfillment promises, shipping automations, and exception workflows
          directly alongside submissions.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="space-y-4">
          {deliverySteps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    {step.status}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Service lanes
            </h2>
            <Navigation className="h-5 w-5 text-muted" />
          </div>
          <p className="mt-1 text-sm text-muted">
            Delivery promises surfaced inside your form confirmation page.
          </p>
          <div className="mt-5 space-y-3">
            {lanes.map((lane) => (
              <div
                key={lane.lane}
                className="rounded-xl border border-border px-4 py-4 text-sm text-muted"
              >
                <div className="flex items-center justify-between text-foreground">
                  <p className="font-semibold">{lane.lane}</p>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    {lane.success} success
                  </span>
                </div>
                <p className="mt-2">{lane.sla}</p>
                <p className="mt-1 text-xs text-accent">{lane.automation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-accent bg-accent-soft px-6 py-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-accent">
              Connect delivery tracking to your lead follow-up
            </h2>
            <p className="mt-2 text-sm text-accent/90">
              Sync tracking milestones to the CRM timeline and trigger proactive
              customer updates.
            </p>
          </div>
          <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90">
            Map carriers →
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Packaging rules</h2>
        <p className="mt-1 text-sm text-muted">
          Deliver consistent unboxing experiences with automation.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {[
            {
              name: "Subscription kits",
              detail: "Auto-add printed welcome cards + refill reminders.",
            },
            {
              name: "Limited drops",
              detail: "Include authenticity certificate and social QR insert.",
            },
            {
              name: "Wholesale cartons",
              detail: "Generate pallet labels and customs paperwork.",
            },
          ].map((rule) => (
            <article
              key={rule.name}
              className="rounded-xl border border-border bg-slate-50 px-4 py-4 text-sm text-muted"
            >
              <div className="flex items-center gap-2 text-foreground">
                <Package className="h-4 w-4 text-accent" />
                <span className="font-semibold">{rule.name}</span>
              </div>
              <p className="mt-2">{rule.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
