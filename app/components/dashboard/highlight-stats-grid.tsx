import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Leaf, Radar, Sprout } from "lucide-react";

const numberFormatter = new Intl.NumberFormat("id-ID");

const highlightStats = [
  {
    label: "Grade A",
    value: 1280,
    icon: Sprout,
    tone: "text-emerald-500 bg-emerald-500/10",
  },
  {
    label: "Grade B",
    value: 342,
    icon: Sprout,
    tone: "text-amber-500 bg-amber-500/10",
  },
  {
    label: "Grade C",
    value: 84,
    icon: Sprout,
    tone: "text-rose-500 bg-rose-500/10",
  },
  {
    label: "Total",
    value: 4625,
    icon: Radar,
    tone: "text-sky-500 bg-sky-500/10",
  },
];

export function HighlightStatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {highlightStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label} className="h-full border border-border/70">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <div
                className={`flex size-10 items-center justify-center rounded-full ${stat.tone}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-3xl font-semibold">
                {numberFormatter.format(stat.value)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
