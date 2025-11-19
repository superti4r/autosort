import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { JamurChart } from "@/components/dashboard/jamur-chart";
import { Sprout, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <span>Jamur Tersortir</span>
              </CardTitle>
              <CardDescription className="max-w-sm">
                Total jamur yang berhasil tersortir.
              </CardDescription>
            </div>
            <div className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-2 md:p-3">
              <Sprout className="h-5 w-5 text-emerald-500 md:h-6 md:w-6" />
            </div>
          </CardHeader>
          <CardContent className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-3xl font-semibold tracking-tight md:text-4xl">
                0
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="flex flex-row items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <span>Status Perangkat</span>
              </CardTitle>
              <CardDescription className="max-w-sm">
                Informasi idle atau perangkat berjalan.
              </CardDescription>
            </div>
            <div className="inline-flex items-center justify-center rounded-full bg-amber-500/10 p-2 md:p-3">
              <Activity className="h-5 w-5 text-amber-500 md:h-6 md:w-6" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              Perangkat saat ini{" "}
              <span className="font-medium text-amber-500">Idle</span>.
            </p>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Monitoring berjalan normal
            </div>
          </CardContent>
        </Card>
      </section>

      <JamurChart />
    </div>
  );
}
