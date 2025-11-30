import { Filter, Search, UsersRound } from "lucide-react";

const leads = [
  {
    name: "Samantha Grey",
    channel: "Onsite form",
    intent: "High",
    product: "Athletic Set",
    submitted: "4 minutes ago",
  },
  {
    name: "Jordan Liu",
    channel: "Popup SMS",
    intent: "Medium",
    product: "Men’s Essentials",
    submitted: "12 minutes ago",
  },
  {
    name: "Anita Sharma",
    channel: "Wholesale form",
    intent: "High",
    product: "Bulk Skincare",
    submitted: "27 minutes ago",
  },
  {
    name: "Grayson Wells",
    channel: "Landing page",
    intent: "Low",
    product: "Gift Set",
    submitted: "1 hour ago",
  },
];

export default function LeadsPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">
              Collected leads
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Live feed of submissions, intent scoring, and routing tags.
              Filter or push to CRM with a single click.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted hover:border-accent hover:text-accent">
              Export CSV
            </button>
            <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent/90">
              Create segment
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 rounded-full border border-border bg-slate-50 px-4 py-2 text-sm text-muted">
            <Search className="h-4 w-4 text-accent" />
            <input
              placeholder="Search leads..."
              className="bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted hover:border-accent hover:text-accent">
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted hover:border-accent hover:text-accent">
              <UsersRound className="h-4 w-4" />
              Assign owner
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          <table className="min-w-full divide-y divide-border text-sm text-muted">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 text-left">Lead</th>
                <th className="px-4 py-3 text-left">Channel</th>
                <th className="px-4 py-3 text-left">Intent</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {leads.map((lead) => (
                <tr key={lead.name}>
                  <td className="px-4 py-3 text-foreground">{lead.name}</td>
                  <td className="px-4 py-3">{lead.channel}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        lead.intent === "High"
                          ? "bg-emerald-100 text-emerald-700"
                          : lead.intent === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-muted"
                      }`}
                    >
                      {lead.intent}
                    </span>
                  </td>
                  <td className="px-4 py-3">{lead.product}</td>
                  <td className="px-4 py-3">{lead.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
