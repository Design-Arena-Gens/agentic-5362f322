import { CalendarCheck, Compass, FileCheck2, ListChecks, Workflow } from "lucide-react";

const phases = [
  {
    name: "Blueprint",
    summary: "Define form objectives, required data points, and storefront touchpoints.",
    icon: Compass,
    tasks: [
      "Interview CX + Sales teams for requirements",
      "Audit current intake points and gaps",
      "Draft customer journey map",
    ],
  },
  {
    name: "Build",
    summary: "Compose form experience and connect to automation stack.",
    icon: Workflow,
    tasks: [
      "Configure form fields and design",
      "Map integrations and field sync",
      "Create draft marketing journeys",
    ],
  },
  {
    name: "Launch",
    summary: "QA the experience, train teams, and go live with confidence.",
    icon: CalendarCheck,
    tasks: [
      "Run QA submissions in staging",
      "Document rollout playbook",
      "Enable monitoring dashboards",
    ],
  },
];

export default function TaskManagerGuidePage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">
          Task manager playbook
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          A step-by-step program to plan, build, launch, and optimize your lead
          capture rollout. Assign tasks and track dependencies directly inside
          the embedded app.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {phases.map((phase) => {
          const Icon = phase.icon;
          return (
            <article
              key={phase.name}
              className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {phase.name}
                  </h2>
                  <p className="text-xs text-muted">{phase.summary}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {phase.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-2">
                    <ListChecks className="mt-[2px] h-4 w-4 text-accent" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <FileCheck2 className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">
              Launch checklist
            </h2>
          </div>
          <div className="mt-4 space-y-3">
            {[
              "Form embedded on staging theme",
              "Klaviyo & Slack automations activated",
              "Delivery promises validated",
              "Analytics tracking verified",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-slate-50 px-4 py-3 text-sm text-muted"
              >
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-accent focus:ring-accent" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Timeline</h2>
          <p className="mt-1 text-sm text-muted">
            Recommended pacing for a high-quality launch.
          </p>
          <div className="mt-4 space-y-4">
            {[
              { label: "Week 1", detail: "Discovery + requirements alignment" },
              { label: "Week 2", detail: "Build form, automations, QA" },
              { label: "Week 3", detail: "Enable teams, run pilot, launch" },
            ].map((step) => (
              <div
                key={step.label}
                className="rounded-xl border border-border px-4 py-4 text-sm text-muted"
              >
                <div className="flex items-center justify-between text-foreground">
                  <span className="font-semibold">{step.label}</span>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                    On track
                  </span>
                </div>
                <p className="mt-2">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
