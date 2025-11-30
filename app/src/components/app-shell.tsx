'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Blocks,
  ClipboardList,
  FileSpreadsheet,
  LayoutDashboard,
  Layers,
  LineChart,
  Rocket,
  Settings,
  Waypoints,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarNav = [
  { name: "My Forms", href: "/", icon: ClipboardList },
  { name: "Collected Leads", href: "/leads", icon: Users },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Templates", href: "/templates", icon: Layers },
];

const topNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pricing", href: "/pricing", icon: FileSpreadsheet },
  { name: "Delivery Setup", href: "/delivery", icon: Waypoints },
  { name: "App Settings", href: "/settings", icon: Settings },
  { name: "Marketing Options", href: "/marketing", icon: Rocket },
  { name: "Integrations", href: "/integrations", icon: Blocks },
  { name: "Superadmin Panel", href: "/superadmin", icon: BarChart3 },
  { name: "Task Manager Guide", href: "/task-manager", icon: ClipboardList },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky left-0 top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-white/95 px-4 pb-6 pt-8 shadow-sm backdrop-blur lg:flex lg:flex-col">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-white shadow-sm">
            <Blocks className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted">
              Embedded Shopify App
            </p>
            <p className="text-base font-semibold text-foreground">
              LeadFlow Studio
            </p>
          </div>
        </div>
        <nav className="space-y-1">
          {sidebarNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-white shadow-sm"
                    : "text-muted hover:bg-accent-soft hover:text-accent"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-xl border border-dashed border-border/80 bg-slate-50/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Live Status
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-600">
              Connected to store
            </span>
          </div>
        </div>
      </aside>
      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-4 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Shopify Embedded Suite
              </p>
              <h1 className="text-xl font-semibold text-foreground">
                Operational Control Center
              </h1>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-muted shadow-sm">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Synced 2 minutes ago
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-border/70 px-4 py-3 lg:px-8">
            {topNav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    active
                      ? "border-accent bg-accent text-white shadow-sm"
                      : "border-transparent bg-accent-soft/60 text-muted hover:border-accent/20 hover:bg-accent-soft hover:text-accent"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </header>
        <main className="flex-1 bg-slate-50/60">{children}</main>
      </div>
    </div>
  );
}
