import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { JamurChart } from "@/components/dashboard/jamur-chart";
import {
  Activity,
  Camera,
  Droplets,
  Leaf,
  Radar,
  RefreshCw,
  ShieldCheck,
  Sprout,
  ThermometerSun,
  Timer,
} from "lucide-react";

const numberFormatter = new Intl.NumberFormat("id-ID");

const highlightStats = [
  {
    label: "Grade A hari ini",
    value: 1280,
    change: 12,
    icon: Sprout,
    tone: "text-emerald-500 bg-emerald-500/10",
  },
  {
    label: "Grade B hari ini",
    value: 342,
    change: -3,
    icon: Leaf,
    tone: "text-amber-500 bg-amber-500/10",
  },
  {
    label: "Grade C hari ini",
    value: 84,
    change: 5,
    icon: Activity,
    tone: "text-rose-500 bg-rose-500/10",
  },
  {
    label: "Jamur tersortir total",
    value: 4625,
    change: 8,
    icon: Radar,
    tone: "text-sky-500 bg-sky-500/10",
  },
];

const environmentSensors = [
  {
    label: "Suhu ruangan",
    value: "26.4°C",
    trend: "+0.5°C",
    status: "Optimal",
    icon: ThermometerSun,
  },
  {
    label: "Kelembapan",
    value: "74%",
    trend: "+3%",
    status: "Stabil",
    icon: Droplets,
  },
  {
    label: "Kecepatan conveyor",
    value: "0.45 m/s",
    trend: "Stabil",
    status: "Aman",
    icon: Activity,
  },
  {
    label: "Intensitas cahaya",
    value: "420 lux",
    trend: "-20 lux",
    status: "Sesuai standar",
    icon: Camera,
  },
];

const processTimeline = [
  {
    title: "Pengambilan gambar",
    detail: "Kamera 02 • sudut 1.2 m",
    time: "09.45",
    status: "Selesai",
  },
  {
    title: "Deteksi & prediksi",
    detail: "Model Vision V2.3 • 97% akurasi",
    time: "09.45",
    status: "Selesai",
  },
  {
    title: "Aktuator sortir",
    detail: "Gate A1 • Servo 3",
    time: "09.46",
    status: "Berjalan",
  },
  {
    title: "Validasi sensor berat",
    detail: "Loadcell 04",
    time: "Menunggu",
    status: "Antrean",
  },
];

const maintenanceQueue = [
  {
    title: "Kalibrasi kamera 01",
    assignee: "Tim IoT",
    due: "Hari ini • 10.00",
    status: "Selesai",
  },
  {
    title: "Bersihkan sensor ultrasonic",
    assignee: "Operator shift siang",
    due: "Hari ini • 13.00",
    status: "Terjadwal",
  },
  {
    title: "Tes redundansi UPS",
    assignee: "Teknisi",
    due: "Besok • 09.30",
    status: "Persiapan",
  },
];

const qualityBreakdown = [
  { label: "Grade A", value: 68, color: "bg-emerald-500" },
  { label: "Grade B", value: 22, color: "bg-amber-500" },
  { label: "Grade C", value: 10, color: "bg-rose-500" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_minmax(0,0.85fr)]">
        <Card className="relative overflow-hidden border-none bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 text-white shadow-lg">
          <div className="absolute inset-0 opacity-35">
            <div className="size-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)]" />
          </div>
          <div className="relative z-10 flex h-full flex-col gap-8 p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                  AutoSort Insight
                </p>
                <h2 className="text-2xl font-semibold leading-snug md:text-3xl">
                  Monitoring harian jamur merang
                </h2>
                <p className="text-sm text-white/75">
                  Perangkat aktif sejak 07.10 WIB • sinkron terakhir 2 menit
                  lalu.
                </p>
              </div>
              <Badge className="w-fit bg-white/20 text-white backdrop-blur">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Operasional stabil
              </Badge>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-white/70">Jamur tersortir</p>
                <p className="text-3xl font-semibold">
                  {numberFormatter.format(243)}
                </p>
                <p className="text-xs text-emerald-50/80">
                  +18 batch dibandingkan kemarin
                </p>
              </div>
              <div>
                <p className="text-xs text-white/70">Akurasi model</p>
                <p className="text-3xl font-semibold">97%</p>
                <p className="text-xs text-emerald-50/80">
                  Model Vision V2.3 • diperbarui tadi malam
                </p>
              </div>
              <div>
                <p className="text-xs text-white/70">Sesi operator</p>
                <p className="text-3xl font-semibold">3</p>
                <p className="text-xs text-emerald-50/80">
                  Shift pagi aktif 2 jam 12 menit
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlightStats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;
            const changeLabel = `${isPositive ? "+" : ""}${stat.change}%`;
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
                  <p
                    className={`text-sm ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {changeLabel} vs kemarin
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_minmax(0,0.8fr)]">
        <JamurChart />

        <Card className="h-full border border-border/70">
          <CardHeader className="pb-4">
            <CardTitle>Sensor lingkungan</CardTitle>
            <CardDescription>
              Parameter ruangan kumbung untuk menjaga kualitas jamur.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {environmentSensors.map((sensor) => {
              const Icon = sensor.icon;
              return (
                <div
                  key={sensor.label}
                  className="flex items-start justify-between rounded-xl border border-border/70 bg-muted/30 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-inner">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{sensor.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {sensor.trend}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{sensor.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {sensor.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="border border-border/70">
          <CardHeader className="pb-3">
            <CardTitle>Fokus kualitas</CardTitle>
            <CardDescription>
              Distribusi grade dan kesehatan model.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {qualityBreakdown.map((quality) => (
              <div key={quality.label}>
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium">{quality.label}</p>
                  <span className="text-muted-foreground">
                    {quality.value}%
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${quality.color}`}
                    style={{ width: `${quality.value}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium">Kesehatan model</p>
                <Badge variant="outline" className="border-emerald-100">
                  Stabil
                </Badge>
              </div>
              <Progress value={97} className="mt-3" />
              <p className="mt-2 text-xs text-muted-foreground">
                Confidence rata-rata 97%. Diperbarui otomatis pukul 02.00 WIB.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader className="pb-3">
            <CardTitle>Alur sortir terbaru</CardTitle>
            <CardDescription>
              Tahapan sortir untuk batch terakhir.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {processTimeline.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="size-3 rounded-full border-2 border-emerald-100 bg-emerald-500" />
                  <div className="h-full w-px bg-border" />
                </div>
                <div className="flex-1 space-y-1 rounded-xl border border-border/70 bg-card/60 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                  <Badge
                    variant="outline"
                    className="w-fit border-dashed text-[10px]"
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/70">
          <CardHeader className="pb-3">
            <CardTitle>Agenda perawatan</CardTitle>
            <CardDescription>
              Tugas preventif yang perlu dipantau.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {maintenanceQueue.map((task) => (
              <div
                key={task.title}
                className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{task.title}</p>
                  <Badge variant="outline" className="text-[11px]">
                    {task.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{task.assignee}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Timer className="h-3.5 w-3.5" />
                  {task.due}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-2xl border border-dashed border-border/70 px-4 py-3 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              Sinkronkan dengan modul pemeliharaan untuk melihat semua agenda.
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
