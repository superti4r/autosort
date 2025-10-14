import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import type { FormEvent } from 'react';
import type { AuthMediaSlide } from '../../components/auth-media';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AuthLayout from '../../layouts/auth-layouts';

import ForgotPasswordController from '@/actions/App/Http/Controllers/Auth/ForgotPasswordController';
import LoginController from '@/actions/App/Http/Controllers/Auth/LoginController';

type ForgotPasswordForm = {
    email: string;
};

type ForgotPasswordPageProps = {
    status?: string;
};

const slides: AuthMediaSlide[] = [
    {
        src: 'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?auto=format&fit=crop&w=1200&q=80',
        alt: 'Perangkat IoT yang bersinar dalam ruang kontrol dengan nuansa gelap',
        title: 'Keamanan tingkat lanjut',
        description: 'Proses pemulihan kami dilindungi dengan lapisan verifikasi berlapis.',
    },
    {
        src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
        alt: 'Tim teknisi bekerjasama di depan panel kontrol',
        title: 'Dukungan cepat dan responsif',
        description: 'Tim kami siap membantu Anda kembali mengakses panel tanpa hambatan.',
    },
    {
        src: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80',
        alt: 'Dashboard monitoring dengan lampu LED berwarna',
        title: 'Pantau sistem kapan saja',
        description: 'Tetap memegang kendali penuh atas jaringan perangkat Anda.',
    },
];

export default function ForgotPassword() {
    const { status } = usePage<ForgotPasswordPageProps>().props;

    const { data, setData, post, processing, errors } = useForm<ForgotPasswordForm>({
        email: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(ForgotPasswordController.store().url);
    };

    const errorMessages = Object.values(errors).filter(Boolean);

    return (
        <>
            <Head title="Lupa Kata Sandi" />

            <AuthLayout title="Lupa Kata Sandi" slides={slides} carouselInterval={6500}>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {status ? (
                        <Alert variant="success">
                            <AlertTitle>Berhasil</AlertTitle>
                            <AlertDescription>{status}</AlertDescription>
                        </Alert>
                    ) : null}

                    {errorMessages.length ? (
                        <Alert variant="destructive">
                            <AlertTitle>Terjadi kesalahan</AlertTitle>
                            <AlertDescription>
                                {errorMessages.length === 1 ? (
                                    errorMessages[0]
                                ) : (
                                    <ul className="list-disc space-y-1 pl-4 text-left">
                                        {errorMessages.map((message) => (
                                            <li key={message}>{message}</li>
                                        ))}
                                    </ul>
                                )}
                            </AlertDescription>
                        </Alert>
                    ) : null}

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="flex items-center gap-2 text-sm tracking-[0.22em] text-muted-foreground/80 uppercase">
                                <Mail className="size-4" />
                                Email terdaftar
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
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                        <Link
                            href={LoginController.show().url}
                            className="inline-flex items-center gap-2 font-medium text-primary transition hover:text-primary/80"
                        >
                            <ArrowLeft className="size-4" />
                            Kembali ke login
                        </Link>
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        Kirim tautan reset
                        <ArrowRight className="size-4" />
                    </Button>
                </form>
            </AuthLayout>
        </>
    );
}
