"use client";

import * as React from "react";
import { AlertTriangle, Info, OctagonAlert } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const levelMeta: Record<
  LogLevel,
  {
    label: string;
    tone: string;
    icon: React.ComponentType<{ className?: string }>;
  }
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
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Log Sistem
        </h2>
        <p className="text-sm text-muted-foreground">
          Rekaman otomatis dari PLC, kamera, dan sensor lingkungan.
        </p>
      </div>

      <Card className="border border-border/70">
        <CardHeader className="space-y-1">
          <CardTitle>Log Sistem</CardTitle>
          <CardDescription>
            {sampleLogs.length} entri log terbaru dari sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Waktu</TableHead>
                  <TableHead className="whitespace-nowrap">ID Log</TableHead>
                  <TableHead className="whitespace-nowrap">Event</TableHead>
                  <TableHead className="whitespace-nowrap">Level</TableHead>
                  <TableHead className="whitespace-nowrap">Sumber</TableHead>
                  <TableHead className="min-w-[220px]">Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleLogs.map((log) => {
                  const meta = levelMeta[log.level];
                  const Icon = meta.icon;
                  return (
                    <TableRow key={log.id} className="align-top">
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {log.createdAt}
                      </TableCell>
                      <TableCell className="whitespace-nowrap font-medium">
                        {log.id}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">
                        {log.event}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${meta.tone}`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {meta.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                        {log.source}
                      </TableCell>
                      <TableCell className="max-w-md text-sm text-muted-foreground">
                        {log.detail}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
