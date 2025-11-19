"use client";

import * as React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  jamur: {
    label: "Jamur tersortir",
    color: "hsl(var(--chart-1))",
  },
};

const dataPerRange: Record<string, { label: string; jamur: number }[]> = {
  hari: [
    { label: "08:00", jamur: 12 },
    { label: "10:00", jamur: 24 },
    { label: "12:00", jamur: 31 },
    { label: "14:00", jamur: 45 },
    { label: "16:00", jamur: 53 },
  ],
  bulan: [
    { label: "Minggu 1", jamur: 160 },
    { label: "Minggu 2", jamur: 210 },
    { label: "Minggu 3", jamur: 190 },
    { label: "Minggu 4", jamur: 240 },
  ],
  tahun: [
    { label: "Jan", jamur: 720 },
    { label: "Feb", jamur: 680 },
    { label: "Mar", jamur: 830 },
    { label: "Apr", jamur: 910 },
    { label: "Mei", jamur: 1040 },
  ],
};

export function JamurChart() {
  const [range, setRange] = React.useState<"hari" | "bulan" | "tahun">("hari");
  const chartData = dataPerRange[range];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium tracking-tight">
            Pergerakan Jamur Tersortir
          </h2>
          <p className="text-xs text-muted-foreground">
            Visualisasi jumlah jamur yang tersortir berdasarkan waktu.
          </p>
        </div>
        <Select
          value={range}
          onValueChange={(v) => setRange(v as typeof range)}
        >
          <SelectTrigger size="sm">
            <SelectValue placeholder="Pilih rentang waktu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hari">Harian</SelectItem>
            <SelectItem value="bulan">Bulanan</SelectItem>
            <SelectItem value="tahun">Tahunan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ChartContainer config={chartConfig}>
        <LineChart
          data={chartData}
          margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="jamur"
            stroke="var(--color-jamur)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </section>
  );
}
