"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const baseChartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

const chartData = baseChartData.map((item) => {
  const gradeA = item.desktop;
  const gradeB = Math.round(item.mobile * 0.6);
  const gradeC = item.mobile - gradeB;

  return {
    date: item.date,
    gradeA,
    gradeB,
    gradeC,
  };
});

const chartConfig = {
  jamur: {
    label: "Jamur tersortir",
  },
  gradeA: {
    label: "Grade A",
    color: "var(--chart-1)",
  },
  gradeB: {
    label: "Grade B",
    color: "var(--chart-2)",
  },
  gradeC: {
    label: "Grade C",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const numberFormatter = new Intl.NumberFormat("id-ID");
const percentFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 1,
});

const gradeColors: Record<"A" | "B" | "C", string> = {
  A: "var(--color-gradeA)",
  B: "var(--color-gradeB)",
  C: "var(--color-gradeC)",
};

export function JamurChart() {
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [timeRange]);

  const summary = React.useMemo(() => {
    const totals = filteredData.reduce(
      (acc, day) => {
        acc.A += day.gradeA;
        acc.B += day.gradeB;
        acc.C += day.gradeC;
        return acc;
      },
      { A: 0, B: 0, C: 0 }
    );
    const totalJamur = totals.A + totals.B + totals.C;
    const averagePerDay = filteredData.length
      ? Math.round(totalJamur / filteredData.length)
      : 0;

    const recentWindow = filteredData.slice(-7).reduce((acc, day) => {
      return acc + day.gradeA + day.gradeB + day.gradeC;
    }, 0);

    const previousWindow = filteredData.slice(-14, -7).reduce((acc, day) => {
      return acc + day.gradeA + day.gradeB + day.gradeC;
    }, 0);

    const change =
      previousWindow === 0
        ? 100
        : ((recentWindow - previousWindow) / Math.max(previousWindow, 1)) * 100;

    const latest = filteredData.at(-1);
    const latestTotal = latest
      ? latest.gradeA + latest.gradeB + latest.gradeC
      : 0;

    const dominant =
      totals.A >= totals.B && totals.A >= totals.C
        ? "A"
        : totals.B >= totals.C
          ? "B"
          : "C";

    return {
      totals,
      totalJamur,
      averagePerDay,
      change,
      latestTotal,
      latestDate: latest?.date,
      dominant,
    };
  }, [filteredData]);

  const latestDateLabel = summary.latestDate
    ? new Date(summary.latestDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "-";
  const changeIsPositive = summary.change >= 0;

  return (
    <Card className="pt-0">
      <CardHeader className="flex flex-col gap-3 space-y-0 border-b py-5 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle>Pergerakan Jamur Tersortir</CardTitle>
          <CardDescription>
            Jumlah jamur tersortir per hari berdasarkan grade A, B, dan C
            (simulasi 3 bulan terakhir).
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(v) => setTimeRange(v as typeof timeRange)}
        >
          <SelectTrigger
            className="w-full rounded-lg sm:ml-auto sm:w-[180px]"
            aria-label="Pilih rentang waktu"
          >
            <SelectValue placeholder="Pilih rentang waktu" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              3 bulan terakhir
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              30 hari terakhir
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              7 hari terakhir
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillGradeA" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gradeA)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gradeA)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillGradeB" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gradeB)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gradeB)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillGradeC" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gradeC)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gradeC)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value as string).toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value as string).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="gradeC"
              type="natural"
              fill="url(#fillGradeC)"
              stroke="var(--color-gradeC)"
              stackId="jamur"
            />
            <Area
              dataKey="gradeB"
              type="natural"
              fill="url(#fillGradeB)"
              stroke="var(--color-gradeB)"
              stackId="jamur"
            />
            <Area
              dataKey="gradeA"
              type="natural"
              fill="url(#fillGradeA)"
              stroke="var(--color-gradeA)"
              stackId="jamur"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
        <div className="mt-6 grid gap-5 rounded-2xl border border-dashed border-border/70 bg-muted/30 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total rentang ini
            </p>
            <p className="text-2xl font-semibold">
              {numberFormatter.format(summary.totalJamur)}
            </p>
            <Badge
              variant="outline"
              className={`mt-2 border px-3 py-1 text-xs ${changeIsPositive ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}
            >
              {changeIsPositive ? "+" : ""}
              {percentFormatter.format(summary.change)}% vs 7 hari lalu
            </Badge>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Rata-rata per hari
            </p>
            <p className="text-2xl font-semibold">
              {numberFormatter.format(summary.averagePerDay)}
            </p>
            <p className="text-xs text-muted-foreground">
              Terakhir {latestDateLabel} •{" "}
              {numberFormatter.format(summary.latestTotal)} jamur
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Dominasi grade
            </p>
            <p className="text-xl font-semibold">Grade {summary.dominant}</p>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              {(["A", "B", "C"] as const).map((grade) => {
                const portion = summary.totalJamur
                  ? Math.round((summary.totals[grade] / summary.totalJamur) * 100)
                  : 0;
                return (
                  <div key={grade}>
                    <div className="flex items-center justify-between">
                      <span>Grade {grade}</span>
                      <span>{portion}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${portion}%`,
                          backgroundColor: gradeColors[grade],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
