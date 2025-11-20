import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

const numberFormatter = new Intl.NumberFormat("id-ID");

export function HeroOverviewCard() {
  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 text-white shadow-lg">
      <div className="absolute inset-0 opacity-35">
        <div className="size-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)]" />
      </div>
      <div className="relative z-10 flex h-full flex-col gap-8 p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">
              Insight
            </p>
            <h2 className="text-2xl font-semibold leading-snug md:text-3xl">
              Detail Lengkap
            </h2>
          </div>
          <Badge className="w-fit bg-white/20 text-white backdrop-blur">
            <ShieldCheck className="mr-1.5 h-4 w-4" />
            Perangkat Aktif
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-white/70">Jamur tersortir</p>
            <p className="text-3xl font-semibold">
              {numberFormatter.format(243)}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/70">Akurasi model</p>
            <p className="text-3xl font-semibold">97%</p>
          </div>
          <div>
            <p className="text-xs text-white/70">Sesi operator</p>
            <p className="text-3xl font-semibold">3</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
