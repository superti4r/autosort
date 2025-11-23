"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Camera,
  Database,
  ScrollText,
  Sprout,
  Wifi,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const NAV_ITEMS = [
  {
    label: "Ringkasan",
    description: "Pantau status mesin & statistik",
    href: "/",
    segment: "dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Lihat Kamera",
    description: "Streaming kamera conveyor",
    href: "/camera",
    segment: "camera",
    icon: Camera,
  },
  {
    label: "Data Jamur",
    description: "Hasil sortir dan probabilitas",
    href: "/data-jamur",
    segment: "data-jamur",
    icon: Database,
  },
] as const;

function resolveSegment(pathname: string) {
  if (pathname === "/" || pathname === "") return "dashboard";
  const match = NAV_ITEMS.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  return match?.segment ?? "dashboard";
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeSegment = resolveSegment(pathname);

  const { data: session } = authClient.useSession();

  const displayName =
    session?.user?.name || session?.user?.email || "Operator AutoSort";

  const initials = (session?.user?.name || session?.user?.email || "AS")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarUrl = session?.user?.image ?? undefined;

  return (
    <SidebarProvider className="bg-muted/20">
      <Sidebar
        collapsible="icon"
        className="border-r bg-sidebar text-sidebar-foreground"
      >
        <SidebarHeader>
          <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/60 px-3 py-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <Sprout className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-semibold leading-tight">
                AutoSort IoT
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSegment === item.segment;
                  return (
                    <SidebarMenuItem key={item.segment}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="items-start gap-3"
                      >
                        <Link href={item.href}>
                          <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                          <span className="flex flex-1 flex-col">
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                            <span className="text-xs text-sidebar-foreground/70">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="rounded-xl border border-sidebar-border/60 bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border border-white/20">
                {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-sidebar-foreground/70">
                  Operator aktif
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="justify-center"
              >
                <Link href="/account">Kelola profil</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-red-600 text-white hover:bg-red-600/90"
              >
                <Link href="/auth/sign-out">Keluar</Link>
              </Button>
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="bg-gradient-to-br from-background via-background to-muted/40">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-border/60 bg-background/95 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    @projectpintar.dev &mdash;
                  </p>
                  <h1 className="text-lg font-semibold leading-tight">
                    AutoSort
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground md:hidden">
              <Badge className="bg-emerald-600 text-white">
                <Wifi className="mr-1 h-3 w-3" />
                Online
              </Badge>
              <span>Diperbarui beberapa saat lalu</span>
            </div>
          </header>
          <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
