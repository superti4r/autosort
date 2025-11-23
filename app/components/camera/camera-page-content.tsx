import { CameraMainCard } from "@/components/camera/camera-main-card";
import { Button } from "../ui/button";

export function CameraPageContent() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Lihat Kamera
          </h2>
          <p className="text-sm text-muted-foreground">
            Streaming kamera yang terhubung dengan sistem pemantauan.
          </p>
        </div>

        <Button className="w-full sm:w-auto">Capture &amp; Prediksi</Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
        <CameraMainCard />
      </div>
    </section>
  );
}
