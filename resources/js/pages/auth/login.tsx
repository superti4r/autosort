import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import type { AuthMediaSlide } from '../../components/auth-media';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AuthLayout from '../../layouts/auth-layouts';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const slides: AuthMediaSlide[] = [
    {
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Kolaborasi tim yang menganalisis dashboard di ruang rapat modern',
        title: 'Kolaborasi tanpa hambatan',
        description: 'Satukan data lintas divisi dan berkolaborasi dengan ritme yang selalu sinkron.',
    },
    {
        src: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
        alt: 'Monitor menampilkan data otomasi dengan grafik warna elegan',
        title: 'Visualisasi tajam & informatif',
        description: 'Sorot metrik terpenting dengan tampilan rapi di perangkat apa pun.',
    },
    {
        src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        alt: 'Developer bekerja dengan laptop di ruang kerja minimalis',
        title: 'Kecepatan eksekusi maksimal',
        description: 'Integrasi API & automations siap skalakan operasi Anda secara otomatis.',
    },
];

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: true,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Masuk" />

            <AuthLayout title="IoT Control Panel" slides={slides} carouselInterval={6000}>
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
                                onChange={(event) => setData('email', event.target.value)}
                                placeholder="Masukkan email anda"
                            />
                            {errors.email ? <p className="text-sm font-medium text-destructive">{errors.email}</p> : null}
                        </div>

                        <div className="space-y-3">
                            <Label
                                htmlFor="password"
                                className="flex items-center gap-2 text-sm tracking-[0.22em] text-muted-foreground/80 uppercase"
                            >
                                <Lock className="size-4" />
                                Kata sandi
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={data.password}
                                    onChange={(event) => setData('password', event.target.value)}
                                    placeholder="Masukkan kata sandi anda"
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
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                        <label className="inline-flex items-center gap-3">
                            <Checkbox checked={data.remember} onChange={(event) => setData('remember', event.target.checked)} />
                            <span>Ingat saya</span>
                        </label>
                        <Link href="/forgot-password" className="font-medium text-primary transition hover:text-primary/80">
                            Lupa kata sandi?
                        </Link>
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        Masuk
                        <ArrowRight className="size-4" />
                    </Button>
                </form>
            </AuthLayout>
        </>
    );
}
