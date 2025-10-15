import { Head } from '@inertiajs/react';
import { ArrowRightCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DashboardLayout } from '../layouts/dashboard-layouts';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <DashboardLayout title="Dashboard">
                <div className="mt-8 space-y-12">
                    <section className="space-y-6">
                        <header className="space-y-1.5">
                            <h2 className="text-lg font-semibold text-foreground sm:text-xl">Selamat datang di panel kontrol IoT</h2>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Kelola perangkat, automations, dan laporan Anda dari satu tempat terintegrasi. Tampilan ini akan menampilkan ringkasan
                                aktivitas sistem dan performa IoT Anda.
                            </p>
                        </header>

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                Gunakan navigasi di sebelah kiri untuk mengakses data perangkat, automations, dan laporan. Sistem ini dikembangkan
                                untuk memastikan kendali penuh dan transparansi atas proses IoT Anda.
                            </p>
                            <Button variant="outline" size="lg" className="gap-3">
                                Lihat dokumentasi
                                <ArrowRightCircle className="size-5" />
                            </Button>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <header className="space-y-1.5">
                            <h3 className="text-lg font-semibold text-foreground sm:text-xl">Statistik Singkat</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Ringkasan performa dan status perangkat Anda (akan tersedia pada versi berikutnya).
                            </p>
                        </header>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
                                <p className="text-sm text-muted-foreground">Perangkat aktif</p>
                                <p className="mt-2 text-2xl font-semibold text-foreground">12</p>
                            </div>

                            <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
                                <p className="text-sm text-muted-foreground">Automations berjalan</p>
                                <p className="mt-2 text-2xl font-semibold text-foreground">5</p>
                            </div>

                            <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
                                <p className="text-sm text-muted-foreground">Log per hari</p>
                                <p className="mt-2 text-2xl font-semibold text-foreground">142</p>
                            </div>
                        </div>
                    </section>
                </div>
            </DashboardLayout>
        </>
    );
}
