import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Cpu, Signal } from "lucide-react";

const deviceHealth = [
  {
    label: "Logitech C920 PRO",
    value: "Terhubung",
    detail: "192.168.1.42",
    icon: Camera,
  },
  {
    label: "Kualitas Sinyal",
    value: "92%",
    detail: "30 FPS",
    icon: Signal,
  },
  {
    label: "Suhu",
    value: "45°C",
    detail: "Suhu Normal",
    icon: Cpu,
  },
];

export function DeviceHealthGrid() {
  return (
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
  );
}
