"use client";

import * as React from "react";
import { AlertTriangle, Info, OctagonAlert, Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LogLevel = "info" | "warning" | "critical";

type LogRow = {
  id: string;
  event: string;
  detail: string;
  createdAt: string;
  level: LogLevel;
  source: string;
};

const sampleLogs: LogRow[] = [
  {
    id: "LOG-9821",
    event: "CONVEYOR_START",
    detail: "Conveyor utama mulai bergerak (0.45 m/s)",
    createdAt: "09:12:04",
    level: "info",
    source: "PLC",
  },
  {
    id: "LOG-9822",
    event: "DETEKSI_JAMUR",
    detail: "Kamera 02 mendeteksi objek — probabilitas grade A 92%",
    createdAt: "09:12:07",
    level: "info",
    source: "Vision",
  },
  {
    id: "LOG-9823",
    event: "ACTUATOR_FIRE",
    detail: "Gate A1 aktif selama 1.8 detik",
    createdAt: "09:12:08",
    level: "info",
    source: "Actuator",
  },
  {
    id: "LOG-9824",
    event: "HUMIDITY_HIGH",
    detail: "Kelembapan > 75%. Mengaktifkan exhaust fan level 2",
    createdAt: "09:12:30",
    level: "warning",
    source: "Sensor",
  },
  {
    id: "LOG-9825",
    event: "CAMERA_FPS_DROP",
    detail: "FPS turun ke 18.5 (target 24). Buffer di-reset otomatis",
    createdAt: "09:13:02",
    level: "warning",
    source: "Vision",
  },
  {
    id: "LOG-9826",
    event: "LIMIT_SWITCH",
    detail: "Limit switch tray kanan tidak terdeteksi. Perlu pengecekan",
    createdAt: "09:13:15",
    level: "critical",
    source: "PLC",
  },
];

const timelineHighlights = [
  {
    title: "Batch #423 selesai sortir",
    time: "09:12",
    detail: "Grade A dimasukkan ke kontainer pendingin.",
    level: "info" as LogLevel,
  },
  {
    title: "Peringatan kelembapan tinggi",
    time: "09:13",
    detail: "Fan otomatis aktif untuk menjaga 72-75%.",
    level: "warning" as LogLevel,
  },
  {
    title: "Limit switch tray kanan",
    time: "09:14",
    detail: "Operator diminta inspeksi manual.",
    level: "critical" as LogLevel,
  },
];

const levelMeta: Record<
  LogLevel,
  { label: string; tone: string; icon: React.ComponentType<{ className?: string }> }
> = {
  info: {
    label: "Info",
    tone: "bg-sky-50 text-sky-700 border-sky-100",
    icon: Info,
  },
  warning: {
    label: "Warning",
    tone: "bg-amber-50 text-amber-700 border-amber-100",
    icon: AlertTriangle,
  },
  critical: {
    label: "Critical",
    tone: "bg-rose-50 text-rose-700 border-rose-100",
    icon: OctagonAlert,
  },
};

export function LogTable() {
  const [search, setSearch] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState<LogLevel | "all">("all");

  const filteredLogs = React.useMemo(() => {
    return sampleLogs.filter((log) => {
      const matchesLevel =
        levelFilter === "all" || log.level === levelFilter;
      const matchesSearch =
        log.id.toLowerCase().includes(search.toLowerCase()) ||
        log.event.toLowerCase().includes(search.toLowerCase()) ||
        log.detail.toLowerCase().includes(search.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }, [levelFilter, search]);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Log Pergerakan Mesin
        </h2>
        <p className="text-sm text-muted-foreground">
          Rekaman otomatis dari PLC, kamera, dan sensor lingkungan untuk audit.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card className="border border-border/70">
          <CardHeader className="space-y-4">
            <div>
              <CardTitle>Riwayat log</CardTitle>
              <CardDescription>
                {filteredLogs.length} log aktif dari {sampleLogs.length} entri
                terbaru.
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "info", "warning", "critical"] as const).map(
                (level) => {
                  const active = levelFilter === level;
                  const meta =
                    level === "all"
                      ? {
                          label: "Semua",
                          icon: Info,
                        }
                      : levelMeta[level];
                  const Icon = meta.icon;
                  return (
                    <Button
                      key={level}
                      variant={active ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLevelFilter(level as LogLevel | "all")}
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {level === "all" ? "Semua" : meta.label}
                    </Button>
                  );
                },
              )}
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari event atau ID log"
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Sumber</TableHead>
                    <TableHead>Detail</TableHead>
                    <TableHead>Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => {
                    const meta = levelMeta[log.level];
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">
                          {log.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">{log.event}</span>
                            <Badge
                              variant="outline"
                              className={`w-fit rounded-full border px-2 py-0 text-[11px] ${meta.tone}`}
                            >
                              {meta.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {log.source}
                        </TableCell>
                        <TableCell className="max-w-sm text-sm text-muted-foreground">
                          {log.detail}
                        </TableCell>
                        <TableCell className="text-sm">{log.createdAt}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableCaption>
                  Log dummy untuk tampilan. Integrasikan dengan serial monitor
                  atau message queue untuk data asli.
                </TableCaption>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader className="pb-3">
            <CardTitle>Highlight & tindakan</CardTitle>
            <CardDescription>
              Tiga kejadian terakhir yang butuh perhatian operator.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {timelineHighlights.map((item) => {
              const meta = levelMeta[item.level];
              const Icon = meta.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4"
                >
                  <div
                    className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full border ${meta.tone}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                    <Badge
                      variant="outline"
                      className={`mt-2 rounded-full border px-3 py-0 text-[11px] ${meta.tone}`}
                    >
                      {meta.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
            <div className="rounded-2xl border border-dashed border-border/70 bg-background/70 p-4 text-sm text-muted-foreground">
              Gunakan tombol filter di kiri untuk menganalisis log tertentu,
              atau kirim log ke tim devops bila kejadian kritikal terulang.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
