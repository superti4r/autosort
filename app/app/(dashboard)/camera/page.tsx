"use client";

import * as React from "react";
import {
  Activity,
  Camera,
  Clock3,
  Cpu,
  RefreshCw,
  ShieldCheck,
  Signal,
  Wifi,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const deviceHealth = [
  {
    label: "Kamera 02",
    value: "Online",
    detail: "192.168.1.42 • 22 FPS stabil",
    icon: Camera,
  },
  {
    label: "Signal kualitas",
    value: "92%",
    detail: "Jitter rata-rata 18 ms",
    icon: Signal,
  },
  {
    label: "Jetson Nano",
    value: "45°C",
    detail: "GPU 63% • RAM 48%",
    icon: Cpu,
  },
];

const recentNotes = [
  {
    title: "Tugas shift pagi",
    detail: "Periksa lensa kamera 02 dari embun.",
    time: "09:05",
  },
  {
    title: "Self healing stream",
    detail: "Bitrate turun → reset buffer dilakukan otomatis.",
    time: "09:17",
  },
  {
    title: "Catatan operator",
    detail: "Gate B sedikit terlambat, jadwalkan kalibrasi servo.",
    time: "09:20",
  },
];

export default function CameraPage() {
  const [isStreaming, setIsStreaming] = React.useState(true);
  const [lastSynced, setLastSynced] = React.useState<Date>(new Date());

  function toggleStream() {
    setIsStreaming((prev) => !prev);
    setLastSynced(new Date());
  }

  function handleRefresh() {
    setLastSynced(new Date());
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Lihat Kamera Conveyor
        </h2>
        <p className="text-sm text-muted-foreground">
          Streaming kamera dan status perangkat Jetson yang menjalankan model
          klasifikasi.
        </p>
      </div>

      <Card className="border-none bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">
                Kamera 02 • sudut atas conveyor
              </CardTitle>
              <CardDescription className="text-sm text-white/70">
                Live stream 1080p dikirim ke server setiap 120ms.
              </CardDescription>
            </div>
            <Badge className="w-fit bg-emerald-500/20 text-emerald-200">
              <ShieldCheck className="mr-1.5 h-4 w-4" />
              {isStreaming ? "Streaming aktif" : "Streaming dijeda"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.65fr)]">
            <div className="space-y-4">
              <div className="aspect-video w-full rounded-2xl border border-white/20 bg-black/60 backdrop-blur">
                <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-white/70">
                  <span>Tampilan kamera akan dirender di sini.</span>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                    Stream placeholder
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="default"
                  className="gap-2 bg-emerald-600 hover:bg-emerald-600/90"
                  onClick={toggleStream}
                >
                  <Activity className="h-4 w-4" />
                  {isStreaming ? "Jeda stream" : "Lanjutkan stream"}
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-white/30 text-white hover:bg-white/10"
                  onClick={handleRefresh}
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh snapshot
                </Button>
                <Button variant="ghost" className="gap-2 text-white/80">
                  <Clock3 className="h-4 w-4" />
                  Sinkron terakhir{" "}
                  {lastSynced.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Button>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-white/70">Status koneksi</p>
                  <p className="text-lg font-semibold">
                    Ethernet 1 Gbps • Ping 4 ms
                  </p>
                </div>
                <Badge className="bg-emerald-400/20 text-emerald-100">
                  <Wifi className="mr-1 h-3.5 w-3.5" />
                  Stabil
                </Badge>
              </div>
              <div className="space-y-3 text-sm text-white/70">
                <p>Metode streaming: RTSP → WebRTC relay.</p>
                <p>Bitrate rata-rata: 6.4 Mbps.</p>
                <p>Resolusi aktif: 1920x1080 @24fps.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {deviceHealth.map((device) => {
          const Icon = device.icon;
          return (
            <Card key={device.label} className="border border-border/70">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">
                    {device.label}
                  </CardTitle>
                  <CardDescription>{device.detail}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{device.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border border-border/70">
          <CardHeader className="pb-3">
            <CardTitle>Catatan operator</CardTitle>
            <CardDescription>
              Ringkasan manual pada sesi streaming ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentNotes.map((note) => (
              <div
                key={note.title}
                className="rounded-xl border border-border/70 bg-muted/30 p-4"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{note.time} WIB</span>
                  <Badge variant="outline" className="border-dashed">
                    Shift pagi
                  </Badge>
                </div>
                <p className="mt-2 text-sm font-medium">{note.title}</p>
                <p className="text-xs text-muted-foreground">{note.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader className="pb-3">
            <CardTitle>Tindakan otomatis</CardTitle>
            <CardDescription>
              Respons sistem selama 15 menit terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 p-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-1 text-emerald-600">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Kalibrasi otomatis</p>
                  <p className="text-xs text-muted-foreground">
                    Koreksi eksposur berhasil dijalankan
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">09:18</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-dashed border-border/70 bg-muted/10 p-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-1 text-amber-600">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Buffer ulang stream</p>
                  <p className="text-xs text-muted-foreground">
                    Trigger manual tersedia bila FPS turun &lt; 18
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Jalankan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
