import { Brush, LayoutTemplate, Palette } from "lucide-react";

const templates = [
  {
    name: "Story-driven Concierge",
    description:
      "Narrative approach with guided questions, ideal for high-consideration products.",
    badge: "New",
    toneClass: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Minimal Conversion",
    description:
      "Straight-to-action layout optimized for speed and mobile shoppers.",
    badge: "Top pick",
    toneClass: "bg-sky-100 text-sky-700",
  },
  {
    name: "Wholesale Intake",
    description:
      "Multi-section form capturing business credentials and delivery preferences.",
    badge: "B2B",
    toneClass: "bg-violet-100 text-violet-700",
  },
  {
    name: "Quiz-to-cart Bridge",
    description:
      "Use branching logic to recommend product bundles before checkout.",
    badge: "Interactive",
    toneClass: "bg-amber-100 text-amber-700",
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-6 px-4 py-6 lg:px-8">
      <section className="rounded-2xl border border-border bg-white/95 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">
          Template library
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Jumpstart your next capture flow with curated templates built for
          Shopify storefronts. Customize colors, typography, and automation
          rules without rebuilding from scratch.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <LayoutTemplate className="h-5 w-5 text-accent" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Designer-curated packs
              </h2>
              <p className="text-sm text-muted">
                Handcrafted layouts with storytelling and commerce best practices.
              </p>
            </div>
          </div>
          <button className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted hover:border-accent hover:text-accent">
            Upload custom template
          </button>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {templates.map((template) => (
            <article
              key={template.name}
              className="rounded-xl border border-border bg-slate-50 px-4 py-4 text-sm text-muted"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {template.name}
                  </h3>
                  <p className="mt-1">{template.description}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${template.toneClass}`}
                >
                  {template.badge}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                  Preview
                </button>
                <button className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted hover:border-accent hover:text-accent">
                  Duplicate
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Brush className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">
              Style presets
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted">
            Quickly theme templates to match your Shopify storefront.
          </p>
          <div className="mt-4 space-y-3 text-sm text-muted">
            {[
              "Modern serif — premium retail aesthetic",
              "Minimal sans — fast checkout oriented",
              "Bold express — vibrant design for drops",
            ].map((style) => (
              <div
                key={style}
                className="rounded-xl border border-border bg-slate-50 px-4 py-3"
              >
                {style}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">
              Component blocks
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted">
            Mix and match hero, feature, and conversion blocks to fine-tune your
            experience.
          </p>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {[
              "Hero banner with product carousel",
              "Social proof grid with UGC badges",
              "Dynamic FAQ accordion tied to product type",
              "Footer block with localized contact routes",
            ].map((block) => (
              <div
                key={block}
                className="rounded-xl border border-border px-4 py-3"
              >
                {block}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
