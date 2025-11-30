import { Mail, MessageCircle, Send, Share2, Sparkles } from "lucide-react";

const programs = [
  {
    name: "Welcome email journey",
    description: "Dynamic product insert + discount logic triggered instantly.",
    status: "Active",
    owner: "Lifecycle",
    icon: Mail,
  },
  {
    name: "Post-purchase SMS flow",
    description: "Delivery updates, upsell prompts, and review requests.",
    status: "Paused",
    owner: "CX",
    icon: MessageCircle,
  },
  {
    name: "Partner referral sync",
    description: "UTM-tagged leads flow directly into partner dashboard.",
    status: "Active",
    owner: "Alliances",
    icon: Share2,
  },
];

export default function MarketingOptionsPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">
          Marketing automation
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Translate captured intent into retention and revenue. Align capture,
          nurture, and referral programs in a single playbook.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
        <div className="space-y-4">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article
                key={program.name}
                className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <span className="mt-1 grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        {program.name}
                      </h2>
                      <p className="mt-2 text-sm text-muted">
                        {program.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      program.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {program.status}
                  </span>
                </div>
                <p className="mt-4 text-xs text-muted">
                  Owner: <span className="font-medium">{program.owner}</span>
                </p>
              </article>
            );
          })}
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                Personalisation rules
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted">
              Tailor copy, offers, and imagery based on the captured context from
              each submission.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="rounded-xl border border-border bg-slate-50 px-4 py-3">
                <span className="font-semibold text-foreground">Intent tier</span>
                <p className="mt-1 text-xs">
                  High-intent leads receive 48-hour concierge outreach.
                </p>
              </li>
              <li className="rounded-xl border border-border bg-slate-50 px-4 py-3">
                <span className="font-semibold text-foreground">Product affinity</span>
                <p className="mt-1 text-xs">
                  Auto swap hero product block based on selected variant.
                </p>
              </li>
              <li className="rounded-xl border border-border bg-slate-50 px-4 py-3">
                <span className="font-semibold text-foreground">
                  Lifecycle overlap
                </span>
                <p className="mt-1 text-xs">
                  Pause broadcast email if nurture flow is already running.
                </p>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Channel mix
              </h2>
              <Send className="h-5 w-5 text-muted" />
            </div>
            <p className="mt-1 text-sm text-muted">
              Ensure every captured lead receives a multi-touch experience.
            </p>
            <div className="mt-4 grid gap-3">
              {[
                {
                  name: "Email + SMS",
                  detail: "Dual-trigger welcome flow with product quiz link.",
                  weight: "68%",
                },
                {
                  name: "Paid social",
                  detail: "Sync to Meta audiences for retargeting within 15 min.",
                  weight: "22%",
                },
                {
                  name: "Sales handoff",
                  detail: "Send hot leads to AE queue with call script.",
                  weight: "10%",
                },
              ].map((channel) => (
                <div
                  key={channel.name}
                  className="rounded-xl border border-border px-4 py-4 text-sm text-muted"
                >
                  <div className="flex items-center justify-between text-foreground">
                    <span className="font-semibold">{channel.name}</span>
                    <span>{channel.weight}</span>
                  </div>
                  <p className="mt-2">{channel.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-accent bg-accent-soft px-6 py-6 text-sm text-accent shadow-sm">
        <p className="font-semibold">Pro tip</p>
        <p className="mt-2">
          Connect your Shopify discount sets to tailor incentive nudges depending
          on lead source and submitted cart value.
        </p>
      </section>
    </div>
  );
}
