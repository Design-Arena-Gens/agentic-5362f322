'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useDroppable,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlignLeft,
  Building2,
  CreditCard,
  GripVertical,
  Mail,
  MapPin,
  Phone,
  Settings2,
  ShoppingBag,
  User,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type PaletteField = {
  id: string;
  label: string;
  description: string;
  placeholder?: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  icon: React.ReactNode;
};

type FormField = PaletteField & {
  uid: string;
  required?: boolean;
};

type SettingsTab = "Design" | "Template" | "Marketing" | "Thank You Page";

const palette: PaletteField[] = [
  {
    id: "full-name",
    label: "Full Name",
    description: "Capture a full name in one field.",
    placeholder: "Jamie Fox",
    type: "text",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "first-name",
    label: "First Name",
    description: "Preferred for personalized flows.",
    placeholder: "Jamie",
    type: "text",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "last-name",
    label: "Last Name",
    description: "Combine with first name when needed.",
    placeholder: "Fox",
    type: "text",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "phone",
    label: "Phone",
    description: "Collect mobile or landline numbers.",
    placeholder: "(555) 555-1234",
    type: "tel",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    id: "email",
    label: "Email",
    description: "Primary contact channel for automation.",
    placeholder: "hello@example.com",
    type: "email",
    icon: <Mail className="h-4 w-4" />,
  },
  {
    id: "full-address",
    label: "Full Address",
    description: "Single field for complete address.",
    placeholder: "123 Main Street, Springfield",
    type: "textarea",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: "state-province",
    label: "State/Province",
    description: "State or province selector.",
    placeholder: "State or Province",
    type: "text",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: "city-town",
    label: "City/Town",
    description: "City or town name input.",
    placeholder: "City or Town",
    type: "text",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    id: "postal-code",
    label: "Postal Code",
    description: "Supports letters and numbers.",
    placeholder: "90210",
    type: "text",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    id: "product",
    label: "Product",
    description: "Select the product of interest.",
    placeholder: "Choose a product",
    type: "select",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    id: "variant",
    label: "Variant",
    description: "Collect variant specifics like size.",
    placeholder: "Select a variant",
    type: "select",
    icon: <LayersIcon />,
  },
  {
    id: "quantity",
    label: "Quantity",
    description: "Desired quantity or volume.",
    placeholder: "1",
    type: "text",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "notes",
    label: "Notes/Instructions",
    description: "Open text area for buyer instructions.",
    placeholder: "Add delivery instructions...",
    type: "textarea",
    icon: <AlignLeft className="h-4 w-4" />,
  },
  {
    id: "payment-method",
    label: "Payment Method",
    description: "Preferred payment channel.",
    placeholder: "Select a payment method",
    type: "select",
    icon: <CreditCard className="h-4 w-4" />,
  },
];

const settingsTabs: SettingsTab[] = [
  "Design",
  "Template",
  "Marketing",
  "Thank You Page",
];

function generateFieldId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

export function FormBuilder() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [activeDragField, setActiveDragField] = useState<FormField | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>("Design");
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const selectedField = useMemo(
    () => formFields.find((field) => field.uid === selectedFieldId) ?? null,
    [formFields, selectedFieldId]
  );

  function handleDragStart(event: DragStartEvent) {
    const field = event.active.data.current?.field as
      | PaletteField
      | FormField
      | undefined;
    if (!field) return;
    if ("uid" in field) {
      setActiveDragField(field);
    } else {
      setActiveDragField({
        ...field,
        uid: `field-${generateFieldId()}`,
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeData = active.data.current as
      | { type: "palette"; field: PaletteField }
      | { type: "preview"; field: FormField }
      | undefined;

    setActiveDragField(null);

    if (!over || !activeData) return;

    if (activeData.type === "palette") {
      const newField: FormField = {
        ...activeData.field,
        uid: `field-${generateFieldId()}`,
        required: false,
      };

      if (over.id === "form-preview") {
        setFormFields((prev) => [...prev, newField]);
      } else {
        const targetIndex = formFields.findIndex((field) => field.uid === over.id);
        if (targetIndex > -1) {
          setFormFields((prev) => {
            const clone = [...prev];
            clone.splice(targetIndex, 0, newField);
            return clone;
          });
        } else {
          setFormFields((prev) => [...prev, newField]);
        }
      }
      setSelectedFieldId(newField.uid);
      return;
    }

    if (activeData.type === "preview" && over.id === "form-preview") {
      return;
    }

    if (activeData.type === "preview") {
      const oldIndex = formFields.findIndex(
        (field) => field.uid === activeData.field.uid
      );
      const newIndex = formFields.findIndex((field) => field.uid === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      setFormFields((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  }

  function handleFieldUpdate(uid: string, patch: Partial<FormField>) {
    setFormFields((prev) =>
      prev.map((field) => (field.uid === uid ? { ...field, ...patch } : field))
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-br from-white via-white to-slate-100 p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted">
            Lead Capture Workflow
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground lg:text-3xl">
            Build, personalize, and launch embedded forms in minutes
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Drag in the fields your Shopify storefront needs, preview the live
            experience instantly, then tailor the design, automation, and
            follow-up journeys inside the settings panel.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90">
            Publish form
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition hover:border-accent/50 hover:text-accent">
            Share preview link
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,320px)]">
          <FieldsPanel />
          <div className="space-y-6">
            <SortableContext
              items={formFields.map((field) => field.uid)}
              strategy={rectSortingStrategy}
            >
              <FormPreview
                fields={formFields}
                onSelect={(uid) => setSelectedFieldId(uid)}
                selectedFieldId={selectedFieldId}
              />
            </SortableContext>
            <AutomationTimeline />
          </div>
          <SettingsPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedField={selectedField}
            onFieldChange={(patch) => {
              if (!selectedField) return;
              handleFieldUpdate(selectedField.uid, patch);
            }}
          />
        </div>
        <DragOverlay>
          {activeDragField ? (
            <FieldPreviewChip label={activeDragField.label} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function FieldsPanel() {
  return (
    <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm backdrop-blur">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Fields</h3>
          <p className="mt-1 text-sm text-muted">
            Drag and drop elements into the live preview to assemble your lead
            capture flow.
          </p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
          <Settings2 className="h-5 w-5" />
        </div>
      </header>

      <div className="mt-5 space-y-3">
        {palette.map((field) => (
          <PaletteItem key={field.id} field={field} />
        ))}
      </div>
    </section>
  );
}

function PaletteItem({ field }: { field: PaletteField }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette-${field.id}`,
      data: { type: "palette", field },
    });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "flex cursor-grab items-start gap-3 rounded-xl border border-border bg-white px-4 py-3 text-left shadow-sm transition hover:border-accent/40 hover:bg-accent-soft",
        isDragging && "opacity-50"
      )}
      style={{
        transform: CSS.Transform.toString(transform),
      }}
    >
      <div className="mt-1 text-muted">⋮⋮</div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
        {field.icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{field.label}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{field.description}</p>
      </div>
    </div>
  );
}

function FormPreview({
  fields,
  selectedFieldId,
  onSelect,
}: {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelect: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "form-preview",
  });

  return (
    <section className="rounded-2xl border border-border bg-white/95 p-0 shadow-sm backdrop-blur">
      <header className="flex items-center justify-between rounded-t-2xl border-b border-border bg-slate-100/80 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Form preview</h3>
          <p className="text-sm text-muted">
            This is exactly how shoppers see the embedded experience.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Online
        </div>
      </header>
      <div
        ref={setNodeRef}
        className={cn(
          "min-h-[420px] space-y-4 px-6 py-6 transition",
          isOver && "border-2 border-dashed border-accent bg-accent-soft"
        )}
      >
        {fields.length === 0 ? (
          <EmptyDropState />
        ) : (
          fields.map((field) => (
            <SortableFieldCard
              key={field.uid}
              field={field}
              onSelect={() => onSelect(field.uid)}
              selected={selectedFieldId === field.uid}
            />
          ))
        )}
      </div>
      <footer className="flex items-center justify-between rounded-b-2xl border-t border-border bg-slate-50 px-6 py-4">
        <p className="text-xs text-muted">
          GDPR compliant consent will be appended automatically.
        </p>
        <button className="text-xs font-semibold text-accent">
          Configure validation →
        </button>
      </footer>
    </section>
  );
}

function SortableFieldCard({
  field,
  selected,
  onSelect,
}: {
  field: FormField;
  selected: boolean;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: field.uid,
      data: { type: "preview", field },
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "group rounded-xl border border-border bg-white p-4 shadow-sm transition",
        selected && "border-accent ring-2 ring-accent/10",
        isDragging && "opacity-60"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            {...attributes}
            {...listeners}
            type="button"
            className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-muted transition hover:border-accent/30 hover:text-accent"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {field.label}
            </p>
            <FieldInputPreview field={field} />
          </div>
        </div>
        <button
          type="button"
          className="mt-1 rounded-full border border-transparent bg-accent-soft px-3 py-1 text-xs font-medium text-accent transition hover:border-accent/20"
        >
          ⚙️
        </button>
      </div>
    </div>
  );
}

function FieldInputPreview({ field }: { field: FormField }) {
  if (field.type === "textarea") {
    return (
      <textarea
        readOnly
        placeholder={field.placeholder}
        className="mt-3 w-full resize-none rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm text-muted outline-none transition focus:border-accent"
        rows={3}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        disabled
        className="mt-3 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-muted outline-none transition focus:border-accent"
      >
        <option>{field.placeholder}</option>
      </select>
    );
  }

  return (
    <input
      readOnly
      type={field.type}
      placeholder={field.placeholder}
      className="mt-3 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-muted outline-none transition focus:border-accent"
    />
  );
}

function SettingsPanel({
  activeTab,
  onTabChange,
  selectedField,
  onFieldChange,
}: {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  selectedField: FormField | null;
  onFieldChange: (patch: Partial<FormField>) => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm backdrop-blur">
      <header>
        <h3 className="text-lg font-semibold text-foreground">Settings</h3>
        <p className="mt-1 text-sm text-muted">
          Configure design, automation, and follow-up from a single console.
        </p>
      </header>

      <nav className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100/80 p-1">
        {settingsTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "rounded-lg px-3 py-2 text-xs font-semibold transition",
              activeTab === tab
                ? "bg-white text-accent shadow-sm"
                : "text-muted hover:bg-white/70 hover:text-accent"
            )}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="mt-5 space-y-6">
        {activeTab === "Design" && <DesignTab selectedField={selectedField} onFieldChange={onFieldChange} />}
        {activeTab === "Template" && <TemplateTab />}
        {activeTab === "Marketing" && <MarketingTab />}
        {activeTab === "Thank You Page" && <ThankYouTab />}
      </div>
    </section>
  );
}

function DesignTab({
  selectedField,
  onFieldChange,
}: {
  selectedField: FormField | null;
  onFieldChange: (patch: Partial<FormField>) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-foreground">Primary palette</h4>
        <div className="mt-3 flex gap-3">
          <span className="h-10 w-10 rounded-full bg-accent" />
          <span className="h-10 w-10 rounded-full bg-[#101828]" />
          <span className="h-10 w-10 rounded-full bg-[#f9fafb] ring-1 ring-border" />
          <span className="h-10 w-10 rounded-full bg-[#bae6fd]" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground">Typography</h4>
        <div className="mt-2 space-y-2 rounded-lg border border-border bg-white px-4 py-3 text-xs text-muted">
          <p>
            Headings: <span className="font-semibold text-foreground">Geist Semi</span>
          </p>
          <p>
            Body: <span className="font-semibold text-foreground">Geist Regular</span>
          </p>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground">Active field</h4>
        {selectedField ? (
          <div className="mt-3 space-y-3 rounded-xl border border-border bg-slate-50 px-4 py-4">
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
              Label
            </label>
            <input
              value={selectedField.label}
              onChange={(event) =>
                onFieldChange({
                  label: event.target.value,
                })
              }
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-accent"
            />
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
              Placeholder
            </label>
            <input
              value={selectedField.placeholder ?? ""}
              onChange={(event) =>
                onFieldChange({
                  placeholder: event.target.value,
                })
              }
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-accent"
            />
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={selectedField.required ?? false}
                onChange={(event) =>
                  onFieldChange({
                    required: event.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
              />
              Required
            </label>
          </div>
        ) : (
          <p className="mt-3 rounded-lg border border-dashed border-border px-4 py-8 text-center text-xs text-muted">
            Select a field from the preview to configure its label, placeholder,
            and validation requirements.
          </p>
        )}
      </div>
    </div>
  );
}

function TemplateTab() {
  return (
    <div className="space-y-4 text-sm text-muted">
      <p>
        Instantly align with proven high-converting templates. Sync this form with
        your Shopify theme sections or embed into a landing page block with one
        copy-paste snippet.
      </p>
      <div className="grid gap-3">
        <TemplateCard
          title="Conversational Concierge"
          description="Progressive fields, AI-driven copy, perfect for pre-orders."
          badge="Most adopted"
        />
        <TemplateCard
          title="Popup Capture + SMS"
          description="Low-friction capture for mobile shoppers with SMS follow-up."
        />
        <TemplateCard
          title="Wholesale Lead Desk"
          description="Verifies business emails, collects tax details, routes to sales."
        />
      </div>
    </div>
  );
}

function TemplateCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-white px-4 py-4 shadow-sm transition hover:border-accent/40 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <h5 className="text-sm font-semibold text-foreground">{title}</h5>
        {badge ? (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-muted">{description}</p>
      <button className="mt-3 text-xs font-semibold text-accent">
        Preview template →
      </button>
    </div>
  );
}

function MarketingTab() {
  return (
    <div className="space-y-4 text-sm text-muted">
      <div className="rounded-xl border border-border bg-slate-50 px-4 py-4">
        <h5 className="text-sm font-semibold text-foreground">
          Automations & Journeys
        </h5>
        <ul className="mt-3 space-y-2 text-xs">
          <li>• Push collected leads into Shopify customer profiles.</li>
          <li>• Trigger Klaviyo welcome flow after form submission.</li>
          <li>• Send Slack alert to #sales-enablement for high-value intent.</li>
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-white px-4 py-4">
        <h5 className="text-sm font-semibold text-foreground">
          Channel Amplifiers
        </h5>
        <div className="mt-3 grid gap-3 text-xs">
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span>Email drip sequence</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
              Enabled
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span>SMS concierge</span>
            <button className="text-[11px] font-semibold text-accent">
              Activate
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span>Meta audiences sync</span>
            <button className="text-[11px] font-semibold text-accent">
              Map segment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThankYouTab() {
  return (
    <div className="space-y-4 text-sm text-muted">
      <p>
        Tailor the confirmation experience and conversion-follow up that shoppers
        see after hitting submit.
      </p>
      <label className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
          Headline
        </span>
        <input
          defaultValue="Thanks for reaching out! Here’s what happens next."
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-accent"
        />
      </label>
      <label className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
          Body message
        </span>
        <textarea
          defaultValue="We’ve routed this to the right team. Expect a tailored response along with curated product recommendations."
          rows={4}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-accent"
        />
      </label>
      <div className="rounded-xl border border-dashed border-accent bg-accent-soft px-4 py-4 text-xs">
        <p className="font-semibold text-accent">
          Tip: layer in a dynamic discount block or product quiz redirect to
          convert leads immediately.
        </p>
      </div>
    </div>
  );
}

function EmptyDropState() {
  return (
    <div className="flex h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-slate-50 text-center">
      <div className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
        Drag fields here
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">
        Build your embedded form experience
      </p>
      <p className="mt-2 max-w-sm text-xs text-muted">
        Choose fields from the left panel, drop them into the preview canvas, and
        fine-tune styling and automation on the right.
      </p>
    </div>
  );
}

function FieldPreviewChip({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-lg">
      {label}
    </div>
  );
}

function AutomationTimeline() {
  return (
    <section className="rounded-2xl border border-border bg-white/95 p-5 shadow-sm backdrop-blur">
      <header className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">
          Launch checklist
        </h4>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
          5 steps
        </span>
      </header>
      <ol className="mt-4 space-y-3 text-sm text-muted">
        <li className="rounded-xl border border-border px-4 py-3">
          <span className="font-semibold text-foreground">1. Embed</span> —
          Install the “LeadFlow” block inside your Shopify theme app extension.
        </li>
        <li className="rounded-xl border border-border px-4 py-3">
          <span className="font-semibold text-foreground">2. Sync</span> — Map
          collected fields to Shopify customer attributes.
        </li>
        <li className="rounded-xl border border-border px-4 py-3">
          <span className="font-semibold text-foreground">3. Automate</span> —
          Pair with Klaviyo welcome flow + Slack alerts.
        </li>
        <li className="rounded-xl border border-border px-4 py-3">
          <span className="font-semibold text-foreground">4. QA</span> — Send
          test submission and validate data sync.
        </li>
        <li className="rounded-xl border border-border px-4 py-3">
          <span className="font-semibold text-foreground">5. Launch</span> —
          Publish to production and monitor analytics.
        </li>
      </ol>
    </section>
  );
}

function LayersIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 2 8 4-8 4-8-4 8-4Z" />
      <path d="m4 10 8 4 8-4" />
      <path d="m4 18 8 4 8-4" />
    </svg>
  );
}
