"use client";

import * as React from "react";
import Webcam from "react-webcam";
import { Camera, ShieldCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CameraMainCard() {
  const [isStreaming] = React.useState(true);

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-b from-[#020617] via-[#020617] to-black text-white shadow-2xl rounded-3xl">
      <CardHeader className="relative border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(148,163,253,0.45),_transparent_60%)] opacity-60" />
        </div>

        <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
              <Camera className="h-4 w-4" />
            </span>
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-semibold">
                Kamera
              </CardTitle>
              <CardDescription className="text-xs text-white/70">
                Pemantauan stream kamera secara langsung
              </CardDescription>
            </div>
          </div>
          <Badge className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-medium text-emerald-100 ring-1 ring-emerald-400/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <ShieldCheck className="h-3.5 w-3.5" />
            {isStreaming ? "Kamera Aktif" : "Kamera Tidak Aktif"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative aspect-video w-full bg-black">
          <div className="absolute inset-0">
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-white/5" />
            <div className="pointer-events-none absolute inset-x-6 top-4 flex items-center justify-between text-[10px] font-medium text-white/70">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                LIVE
              </span>
              <span className="rounded-full bg-black/40 px-2 py-0.5 backdrop-blur">
                Preview perangkat lokal
              </span>
            </div>
          </div>

          <div className="relative m-3 h-[calc(100%-24px)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/80 shadow-[0_20px_60px_rgba(15,23,42,0.6)]">
            <Webcam audio={false} className="h-full w-full object-cover" />

            <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-between text-[10px] text-white/75">
              <span className="rounded-full bg-black/60 px-3 py-1 backdrop-blur">
                Streaming 1920x1080 @ 30fps
              </span>
              <span className="hidden rounded-full bg-black/40 px-3 py-1 backdrop-blur sm:inline">
                Logitech C920 HD Pro
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
