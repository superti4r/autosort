"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const DASHBOARD_TABS = [
  { value: "dashboard", label: "Dashboard", href: "/" },
  { value: "camera", label: "Lihat Kamera", href: "/camera" },
  { value: "data", label: "Data Jamur", href: "/data-jamur" },
  { value: "log", label: "Log", href: "/log" },
] as const;

type TabValue = (typeof DASHBOARD_TABS)[number]["value"];

function resolveCurrentTab(pathname: string): TabValue {
  if (pathname === "/" || pathname === "") return "dashboard";
  if (pathname.startsWith("/camera")) return "camera";
  if (pathname.startsWith("/data-jamur")) return "data";
  if (pathname.startsWith("/log")) return "log";
  return "dashboard";
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = resolveCurrentTab(pathname);

  const { data: session } = authClient.useSession();
  const displayName = session?.user?.name || session?.user?.email || "Pengguna";

  function handleTabChange(value: string) {
    const tab = DASHBOARD_TABS.find((t) => t.value === value);
    if (tab) router.push(tab.href);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">AutoSort</h1>
          <p className="text-sm text-muted-foreground">Hai, {displayName}!</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="/account">Profil</a>
          </Button>
          <Button asChild variant="destructive" size="sm">
            <a href="/auth/sign-out">Keluar</a>
          </Button>
        </div>
      </header>

      <div className="border-b px-6 pt-4">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList>
            {DASHBOARD_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <main className="flex flex-1 flex-col gap-6 px-6 py-6">{children}</main>
    </div>
  );
}
