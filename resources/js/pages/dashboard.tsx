import { Head } from '@inertiajs/react';
import { ArrowRightCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DashboardLayout } from '../layouts/dashboard-layouts';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <DashboardLayout title="Dashboard" headerSlot={null}>
                <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Selamat datang di panel kontrol IoT</h2>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Mulai mengelola perangkat, automations, dan laporan Anda dari satu tempat. Konten dashboard masih dalam pengembangan.
                        </p>
                    </div>
                    <Button variant="outline" size="lg" className="gap-3">
                        Lihat dokumentasi
                        <ArrowRightCircle className="size-5" />
                    </Button>
                </div>
            </DashboardLayout>
        </>
    );
}
