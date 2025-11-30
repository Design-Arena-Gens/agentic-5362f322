import {
  Activity,
  ChartArea,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";
import { FormBuilder } from "@/components/form-builder";

const spotlightCards = [
  {
    title: "Live submissions (24h)",
    value: "438",
    delta: "+12.4%",
    icon: Activity,
    toneClass: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Attribution revenue",
    value: "$28.4k",
    delta: "+8.9%",
    icon: CircleDollarSign,
    toneClass: "bg-sky-100 text-sky-700",
  },
  {
    title: "Automation saves",
    value: "19 hrs",
    delta: "Workflow efficiency",
    icon: Sparkles,
    toneClass: "bg-violet-100 text-violet-700",
  },
  {
    title: "Qualified pipeline",
    value: "62%",
    delta: "↑ better than last week",
    icon: ChartArea,
    toneClass: "bg-amber-100 text-amber-700",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6 bg-transparent">
      <section className="grid gap-4 px-4 pt-6 lg:grid-cols-4 lg:px-8">
        {spotlightCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="rounded-2xl border border-border bg-white/95 p-4 shadow-sm backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {card.title}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl ${card.toneClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-muted">
                {card.delta}
              </p>
            </article>
          );
        })}
      </section>
      <FormBuilder />
    </div>
  );
}
