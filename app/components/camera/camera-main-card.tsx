"use client";

import * as React from "react";
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
    <Card className="overflow-hidden border-none bg-black text-white shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between bg-black/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Camera className="h-4 w-4" />
          </span>
          <div>
            <CardTitle className="text-sm font-semibold">Kamera</CardTitle>
            <CardDescription className="text-xs text-white/70">
              Live stream kamera conveyor
            </CardDescription>
          </div>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-200">
          <ShieldCheck className="mr-1.5 h-4 w-4" />
          {isStreaming ? "Kamera Aktif" : "Kamera Tidak Aktif"}
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        <div className="aspect-video w-full bg-black">
          <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-white/70">
            <span>Tampilan kamera akan dirender di sini.</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              Stream placeholder
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
