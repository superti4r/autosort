import { Head, router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import type { FormEvent } from 'react';
import { useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { DashboardLayout } from '../layouts/dashboard-layouts';

import UserManageController from '@/actions/App/Http/Controllers/Pages/UserManageController';

type CreateUserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function UserCreatePage() {
    const { data, setData, post, processing, errors, reset } = useForm<CreateUserForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const errorMessages = useMemo(() => Object.values(errors).filter(Boolean) as string[], [errors]);

    const handleClose = () => {
        router.visit(UserManageController.show().url, { preserveScroll: true, replace: true });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(UserManageController.store().url, {
            preserveScroll: true,
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <>
            <Head title="Tambah Pengguna" />

            <DashboardLayout title="Tambah Pengguna">
                <div className="flex flex-col gap-8">
                    <div className="shadow-[0_18px_48px_-32px_theme(colors.primary/45)] rounded-[2rem] border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <span className="shadow-[0_12px_30px_-20px_theme(colors.primary/60)] flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                                    <Plus className="size-5" />
                                </span>
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground sm:text-xl">Tambah Pengguna</h2>
                                    <p className="text-sm text-muted-foreground">Lengkapi detail pengguna baru berikut.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {errorMessages.length > 0 && (
                        <Alert variant="destructive" className="border-red-200/70 bg-red-50/60">
                            <AlertTitle>Periksa kembali formulir</AlertTitle>
                            <AlertDescription>
                                {errorMessages.length > 1 ? (
                                    <ul className="list-disc space-y-1 pl-4 text-left">
                                        {errorMessages.map((message) => (
                                            <li key={message}>{message}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    errorMessages[0]
                                )}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <section className="space-y-10 rounded-[2.5rem] border border-border/45 bg-gradient-to-br from-card/95 via-card/88 to-card/80 p-8 shadow-[0_32px_80px_-48px_theme(colors.primary/55)] transition-all duration-300 ease-out hover:border-primary/40 hover:shadow-[0_42px_95px_-45px_theme(colors.primary/50)]">
                            <div className="grid gap-10 md:grid-cols-2">
                                <div className="space-y-5">
                                    <Label
                                        htmlFor="name"
                                        className="text-[0.75rem] font-semibold tracking-[0.2em] text-muted-foreground/80 uppercase"
                                    >
                                        Nama lengkap
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                        placeholder="Nama pengguna"
                                        autoFocus
                                        aria-invalid={Boolean(errors.name)}
                                    />
                                    {errors.name && <p className="text-xs font-medium text-destructive">{errors.name}</p>}
                                </div>

                                <div className="space-y-5">
                                    <Label htmlFor="email" className="text-xs font-semibold tracking-[0.2em] text-muted-foreground/80 uppercase">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        placeholder="nama@contoh.com"
                                        aria-invalid={Boolean(errors.email)}
                                    />
                                    {errors.email && <p className="text-xs font-medium text-destructive">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid gap-10 md:grid-cols-2">
                                <div className="space-y-5">
                                    <Label htmlFor="password" className="text-xs font-semibold tracking-[0.2em] text-muted-foreground/80 uppercase">
                                        Kata sandi
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(event) => setData('password', event.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        aria-invalid={Boolean(errors.password)}
                                    />
                                    {errors.password && <p className="text-xs font-medium text-destructive">{errors.password}</p>}
                                </div>

                                <div className="space-y-5">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="text-xs font-semibold tracking-[0.2em] text-muted-foreground/80 uppercase"
                                    >
                                        Konfirmasi kata sandi
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(event) => setData('password_confirmation', event.target.value)}
                                        placeholder="Ulangi kata sandi"
                                        aria-invalid={Boolean(errors.password_confirmation)}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-xs font-medium text-destructive">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Button type="button" variant="ghost" onClick={handleClose} className="w-full sm:w-auto">
                                Batalkan
                            </Button>
                            <Button type="submit" className="w-full sm:w-auto" disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Pengguna'}
                            </Button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
}
