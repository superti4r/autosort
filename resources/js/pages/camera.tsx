import { Head } from '@inertiajs/react';
import { ArrowRightCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DashboardLayout } from '../layouts/dashboard-layouts';

export default function Camera() {
    return (
        <>
            <Head title="Kamera" />

            <DashboardLayout title="Kamera">
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
                </div>
            </DashboardLayout>
        </>
    );
}
