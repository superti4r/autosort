import { CameraMainCard } from "@/components/camera/camera-main-card";
import { DeviceHealthGrid } from "@/components/camera/device-health-grid";

export function CameraPageContent() {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Lihat Kamera
        </h2>
        <p className="text-sm text-muted-foreground">
          Streaming kamera yang terhubung dengan sistem pemantauan.
        </p>
      </div>

      <CameraMainCard />

      <DeviceHealthGrid />

      <div className="grid gap-4 lg:grid-cols-2">
      </div>
    </section>
  );
}
