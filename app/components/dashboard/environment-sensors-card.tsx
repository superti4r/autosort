import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Activity, Camera, LoaderPinwheel, Merge, RadioTower } from "lucide-react";

const deviceStatus = [
  {
    label: "Kamera",
    status: "Aktif",
    icon: Camera,
  },
  {
    label: "Infrared",
    status: "Aktif",
    icon: RadioTower,
  },
  {
    label: "Conveyor",
    status: "Aktif",
    icon: LoaderPinwheel,
  },
  {
    label: "Servo",
    status: "Aktif",
    icon: Merge,
  },
];

export function EnvironmentSensorsCard() {
  return (
    <Card className="h-full border border-border/70">
      <CardHeader className="pb-4">
        <CardTitle>Status Perangkat</CardTitle>
        <CardDescription>
          Kondisi terkini perangkat utama pada sistem AutoSort.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deviceStatus.map((device) => {
          const Icon = device.icon;
          return (
            <div
              key={device.label}
              className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-inner">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">{device.label}</p>
              </div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {device.status}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
