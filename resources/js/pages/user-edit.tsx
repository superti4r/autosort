import { Head, router, useForm, usePage } from '@inertiajs/react';
import { UserCog } from 'lucide-react';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { ModalConfirm } from '../components/modal-confirm';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { DashboardLayout } from '../layouts/dashboard-layouts';

import UserManageController from '@/actions/App/Http/Controllers/Pages/UserManageController';

type EditUserPageProps = {
    user: {
        id: number;
        name: string;
        email: string;
    };
};

type EditUserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function UserEditPage() {
    const { user } = usePage<EditUserPageProps>().props;

    const { data, setData, put, processing, errors, reset } = useForm<EditUserForm>({
        name: user.name ?? '',
        email: user.email ?? '',
        password: '',
        password_confirmation: '',
    });

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const errorMessages = useMemo(() => Object.values(errors).filter(Boolean) as string[], [errors]);

    const handleClose = () => {
        router.visit(UserManageController.show().url, { preserveScroll: true, replace: true });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(UserManageController.update(user.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    const handleDelete = () => {
        setDeleting(true);
        router.delete(UserManageController.destroy(user.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                setDeleting(false);
                setConfirmDeleteOpen(false);
            },
            onError: () => {
                setDeleting(false);
                setConfirmDeleteOpen(false);
            },
        });
    };

    return (
        <>
            <Head title={`Edit ${user.name}`} />

            <DashboardLayout title={`Edit ${user.name}`}>
                <div className="flex flex-col gap-8">
                    <div className="shadow-[0_18px_48px_-32px_theme(colors.primary/45)] rounded-[2rem] border border-border/50 bg-card/80 p-5 backdrop-blur-sm transition-all">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <span className="shadow-[0_12px_30px_-20px_theme(colors.primary/60)] flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                                    <UserCog className="size-5" />
                                </span>
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground sm:text-xl">{`Edit ${user.name}`}</h2>
                                    <p className="text-sm text-muted-foreground">Perbarui informasi pengguna dan simpan perubahan.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {errorMessages.length > 0 && (
                        <Alert variant="destructive" className="border-red-200/70 bg-red-50/60">
                            <AlertTitle>Tidak dapat menyimpan perubahan</AlertTitle>
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
                        <section className="space-y-10 rounded-[2.5rem] border border-border/45 bg-gradient-to-br from-card/94 via-card/84 to-card/78 p-8 shadow-[0_32px_80px_-48px_theme(colors.primary/55)] transition-all duration-300 ease-out hover:border-primary/35 hover:shadow-[0_42px_95px_-45px_theme(colors.primary/50)]">
                            <div className="grid gap-10 md:grid-cols-2">
                                <div className="space-y-5">
                                    <Label htmlFor="name" className="text-xs font-semibold tracking-[0.2em] text-muted-foreground/80 uppercase">
                                        Nama lengkap
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                        placeholder="Nama pengguna"
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

                            <div className="space-y-6 rounded-[2rem] border border-border/45 bg-card/70 p-6">
                                <div>
                                    <h4 className="text-sm font-semibold tracking-[0.18em] text-foreground uppercase">Kata sandi</h4>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Kosongkan kolom di bawah jika tidak ingin mengubah kata sandi.
                                    </p>
                                </div>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="space-y-5">
                                        <Label
                                            htmlFor="password"
                                            className="text-xs font-semibold tracking-[0.2em] text-muted-foreground/80 uppercase"
                                        >
                                            Kata sandi baru
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
                            </div>
                        </section>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setConfirmDeleteOpen(true)}
                                className="w-full justify-center text-destructive sm:w-auto"
                            >
                                Hapus Pengguna
                            </Button>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Button type="button" variant="ghost" onClick={handleClose} className="w-full sm:w-auto">
                                    Batalkan
                                </Button>
                                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                <ModalConfirm
                    open={confirmDeleteOpen}
                    onOpenChange={setConfirmDeleteOpen}
                    variant="destructive"
                    title="Hapus pengguna ini?"
                    description="Tindakan ini tidak dapat dibatalkan. Data pengguna akan dihapus secara permanen."
                    confirmLabel="Hapus"
                    cancelLabel="Kembali"
                    loading={deleting}
                    onConfirm={handleDelete}
                />
            </DashboardLayout>
        </>
    );
}
