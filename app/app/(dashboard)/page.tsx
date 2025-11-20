import { JamurChart } from "@/components/dashboard/jamur-chart";
import { HeroOverviewCard } from "@/components/dashboard/hero-overview-card";
import { HighlightStatsGrid } from "@/components/dashboard/highlight-stats-grid";
import { EnvironmentSensorsCard } from "@/components/dashboard/environment-sensors-card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_minmax(0,0.85fr)]">
        <HeroOverviewCard />
        <HighlightStatsGrid />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_minmax(0,0.8fr)]">
        <JamurChart />
        <EnvironmentSensorsCard />
      </section>
    </div>
  );
}
