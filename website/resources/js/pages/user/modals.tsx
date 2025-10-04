import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { PencilIcon, Trash2Icon, UserPlusIcon } from 'lucide-react';
import { User } from '@/types';

export function ModalAddUser({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [localError, setLocalError] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    let valid = true;
    const err: { email?: string; password?: string } = {};
    if (!data.email.match(/^\S+@\S+\.\S+$/)) {
      err.email = 'Email tidak valid';
      valid = false;
    }
    if (data.password.length < 8) {
      err.password = 'Password minimal 8 karakter';
      valid = false;
    }
    setLocalError(err);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    post('/users', {
      onSuccess: () => {
        reset();
        onSuccess();
      },
      onFinish: onClose,
      preserveScroll: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-5 sm:p-8">
        <DialogTitle className="mb-1 flex items-center gap-3 text-lg font-semibold">
          <span className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
            <UserPlusIcon className="size-6 text-primary" />
          </span>
          Tambah Pengguna
        </DialogTitle>
        <DialogDescription className="mb-3">Isi data pengguna baru di bawah ini.</DialogDescription>
        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-5">
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="h-10 px-3"
            placeholder="Nama"
          />
          <InputError message={errors.name} />
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="h-10 px-3"
            placeholder="Email"
          />
          <InputError message={errors.email || localError.email} />
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="h-10 px-3"
            placeholder="Password"
          />
          <InputError message={errors.password || localError.password} />
          <DialogFooter className="flex justify-end gap-3 pt-3">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" variant="default" disabled={processing}>
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ModalEditUser({
  open,
  user,
  onClose,
  onSuccess,
}: {
  open: boolean;
  user?: User;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  const [localError, setLocalError] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    let valid = true;
    const err: { email?: string; password?: string } = {};
    if (!data.email.match(/^\S+@\S+\.\S+$/)) {
      err.email = 'Email tidak valid';
      valid = false;
    }
    if (data.password && data.password.length < 8) {
      err.password = 'Password minimal 8 karakter';
      valid = false;
    }
    setLocalError(err);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    put(`/users/${user?.id}`, {
      onSuccess: () => {
        reset();
        onSuccess();
      },
      onFinish: onClose,
      preserveScroll: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-5 sm:p-8">
        <DialogTitle className="mb-1 flex items-center gap-3 text-lg font-semibold">
          <span className="flex items-center justify-center rounded-lg bg-primary/10 p-2">
            <PencilIcon className="size-6 text-primary" />
          </span>
          Edit Pengguna
        </DialogTitle>
        <DialogDescription className="mb-3">Ubah data pengguna di bawah ini.</DialogDescription>
        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-5">
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="h-10 px-3"
            placeholder="Nama"
          />
          <InputError message={errors.name} />
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="h-10 px-3"
            placeholder="Email"
          />
          <InputError message={errors.email || localError.email} />
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="h-10 px-3"
            placeholder="Password (kosongkan jika tidak diubah)"
          />
          <InputError message={errors.password || localError.password} />
          <DialogFooter className="flex justify-end gap-3 pt-3">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" variant="default" disabled={processing}>
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ModalDeleteUser({
  open,
  user,
  onClose,
  onSuccess,
}: {
  open: boolean;
  user?: User;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { delete: destroy, processing } = useForm();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    destroy(`/users/${user?.id}`, {
      onSuccess,
      onError: (err: any) => setError(err?.message || 'Gagal menghapus pengguna'),
      onFinish: onClose,
      preserveScroll: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-5 sm:p-8">
        <DialogTitle className="mb-1 flex items-center gap-3 text-lg font-semibold">
          <span className="flex items-center justify-center rounded-lg bg-destructive/10 p-2">
            <Trash2Icon className="size-6 text-destructive" />
          </span>
          Hapus Pengguna
        </DialogTitle>
        <DialogDescription className="mb-3">
          Apakah Anda yakin ingin menghapus pengguna <b>{user?.name}</b>? Tindakan ini tidak dapat dibatalkan.
        </DialogDescription>
        {error && <InputError message={error} />}
        <DialogFooter className="flex justify-end gap-3 pt-3">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Batal
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={processing}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
