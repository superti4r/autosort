import { Head, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { DashboardLayout } from '../layouts/dashboard-layouts';
import type { SharedData } from '../types';

import UserProfileController from '@/actions/App/Http/Controllers/Pages/UserProfileController';

type ProfileUser = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

type ProfilePageProps = SharedData & {
    user: ProfileUser;
    status?: string;
    flash?: { status?: string };
};

type ProfileForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ProfilePage() {
    const { props } = usePage<ProfilePageProps>();
    const profile = props.user;
    const statusMessage = props.status ?? props.flash?.status;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm<ProfileForm>({
        name: profile?.name ?? '',
        email: profile?.email ?? '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (!profile) return;
        setData({
            name: profile.name ?? '',
            email: profile.email ?? '',
            password: '',
            password_confirmation: '',
        });
    }, [profile?.name, profile?.email, setData]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(UserProfileController.update().url, {
            preserveScroll: true,
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    const errorMessages = Object.values(errors).filter(Boolean);

    return (
        <>
            <Head title="Profil Pengguna" />

            <DashboardLayout title="Profil Pengguna">
                <div className="space-y-4">
                    {statusMessage && (
                        <Alert variant="success" className="border border-emerald-300/40 bg-emerald-100/30 text-sm">
                            <AlertTitle>Profil tersimpan</AlertTitle>
                            <AlertDescription>{statusMessage}</AlertDescription>
                        </Alert>
                    )}

                    {errorMessages.length > 0 && (
                        <Alert variant="destructive" className="text-sm">
                            <AlertTitle>Periksa kembali data Anda</AlertTitle>
                            <AlertDescription>
                                {errorMessages.length === 1 ? (
                                    errorMessages[0]
                                ) : (
                                    <ul className="list-disc space-y-1 pl-5 text-left">
                                        {errorMessages.map((msg) => (
                                            <li key={msg}>{msg}</li>
                                        ))}
                                    </ul>
                                )}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-12">
                    <section className="space-y-6">
                        <header className="space-y-1.5">
                            <h3 className="text-lg font-semibold text-foreground sm:text-xl">Informasi Profil</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Perbarui identitas dasar Anda yang digunakan dalam laporan dan notifikasi.
                            </p>
                        </header>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2.5">
                                <Label htmlFor="name" className="text-[13px] font-medium text-muted-foreground">
                                    Nama lengkap
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    placeholder="Nama sesuai identitas"
                                    aria-invalid={!!errors.name}
                                />
                                {errors.name && <p className="mt-0.5 text-xs font-medium text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="email" className="text-[13px] font-medium text-muted-foreground">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="email"
                                    placeholder="email@contoh.com"
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && <p className="mt-0.5 text-xs font-medium text-destructive">{errors.email}</p>}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <header className="space-y-1.5">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground sm:text-xl">
                                <Lock className="size-5 text-primary" />
                                Keamanan & Akses
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">Kosongkan kolom kata sandi bila tidak ingin mengubahnya.</p>
                        </header>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2.5">
                                <Label htmlFor="password" className="text-[13px] font-medium text-muted-foreground">
                                    Kata sandi baru
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="new-password"
                                        placeholder="Minimal 8 karakter"
                                        aria-invalid={!!errors.password}
                                        className="pr-14"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-full p-2 text-muted-foreground transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                                        aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-0.5 text-xs font-medium text-destructive">{errors.password}</p>}
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="password_confirmation" className="text-[13px] font-medium text-muted-foreground">
                                    Konfirmasi kata sandi
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirm ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        autoComplete="new-password"
                                        placeholder="Ulangi kata sandi baru"
                                        className="pr-14"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm((prev) => !prev)}
                                        className="absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-full p-2 text-muted-foreground transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                                        aria-label={showConfirm ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'}
                                    >
                                        {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="mt-0.5 text-xs font-medium text-destructive">{errors.password_confirmation}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col-reverse gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm leading-relaxed text-muted-foreground">Perubahan akan langsung diterapkan setelah disimpan.</p>
                        <Button type="submit" disabled={processing} className="min-w-[180px] justify-center">
                            {processing ? 'Menyimpan...' : 'Simpan perubahan'}
                        </Button>
                    </div>
                </form>
            </DashboardLayout>
        </>
    );
}
