import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import type { AuthMediaSlide } from '../../components/auth-media';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AuthLayout from '../../layouts/auth-layouts';

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type ResetPasswordPageProps = {
    token: string;
    email?: string;
};

const slides: AuthMediaSlide[] = [
    {
        src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
        alt: 'Panel kontrol yang menampilkan grafik keamanan dan kinerja',
        title: 'Pulihkan kontrol penuh',
        description: 'Atur ulang kredensial dan lanjutkan memonitor perangkat Anda secara menyeluruh.',
    },
    {
        src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
        alt: 'Server dan perangkat IoT dengan pencahayaan neon',
        title: 'Keamanan prioritas utama',
        description: 'Kami memastikan proses reset hanya dapat dilakukan oleh Anda.',
    },
    {
        src: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=1200&q=80',
        alt: 'Engineer memegang tablet yang terhubung ke perangkat pintar',
        title: 'Lanjutkan inovasi',
        description: 'Bangun automasi baru tanpa khawatir kehilangan akses.',
    },
];

export default function ResetPassword({ token, email = '' }: ResetPasswordPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<ResetPasswordForm>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/reset-password', {
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <>
            <Head title="Reset Kata Sandi" />

            <AuthLayout title="Atur ulang akses" slides={slides} carouselInterval={6200}>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="flex items-center gap-2 text-sm tracking-[0.22em] text-muted-foreground/80 uppercase">
                                <Mail className="size-4" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={data.email}
                                disabled
                                className="cursor-not-allowed opacity-70"
                            />
                            {errors.email ? <p className="text-sm font-medium text-destructive">{errors.email}</p> : null}
                        </div>

                        <div className="space-y-3">
                            <Label
                                htmlFor="password"
                                className="flex items-center gap-2 text-sm tracking-[0.22em] text-muted-foreground/80 uppercase"
                            >
                                <Lock className="size-4" />
                                Kata sandi baru
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={data.password}
                                    onChange={(event) => setData('password', event.target.value)}
                                    placeholder="Buat kata sandi baru"
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
                            {errors.password ? <p className="text-sm font-medium text-destructive">{errors.password}</p> : null}
                        </div>

                        <div className="space-y-3">
                            <Label
                                htmlFor="password_confirmation"
                                className="flex items-center gap-2 text-sm tracking-[0.22em] text-muted-foreground/80 uppercase"
                            >
                                <Lock className="size-4" />
                                Konfirmasi kata sandi
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmation ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(event) => setData('password_confirmation', event.target.value)}
                                    placeholder="Ulangi kata sandi baru"
                                    className="pr-14"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmation((prev) => !prev)}
                                    className="absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-full p-2 text-muted-foreground transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                                    aria-label={showConfirmation ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                >
                                    {showConfirmation ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                            {errors.password_confirmation ? (
                                <p className="text-sm font-medium text-destructive">{errors.password_confirmation}</p>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                        <Link href="/login" className="inline-flex items-center gap-2 font-medium text-primary transition hover:text-primary/80">
                            <ArrowLeft className="size-4" />
                            Kembali ke login
                        </Link>
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        Simpan kata sandi
                        <ArrowRight className="size-4" />
                    </Button>
                </form>
            </AuthLayout>
        </>
    );
}
