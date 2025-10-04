import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import DataTable from './data-table';

export default function UserPage() {
  const [showAdd, setShowAdd] = React.useState(false);

  return (
    <AppLayout breadcrumbs={[{ title: 'Kelola Pengguna', href: '/users' }]}>
      <Head title="Kelola Pengguna" />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kelola Pengguna</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Menu ini digunakan untuk mengelola data pengguna, menambah, mengedit, dan menghapus pengguna yang memiliki akses ke aplikasi.
            </p>
          </div>
          <div className="mt-2 w-full sm:mt-0 sm:w-auto">
            <Button
              variant="default"
              id="add-user-btn"
              onClick={() => setShowAdd(true)}
              className="flex h-9 w-full items-center justify-center rounded-lg shadow-sm transition-all sm:w-9"
              size="icon"
              aria-label="Tambah Pengguna"
              style={{ minWidth: '36px', minHeight: '36px' }}
            >
              <PlusIcon className="size-5" />
            </Button>
          </div>
        </div>
        <DataTable showAdd={showAdd} setShowAdd={setShowAdd} />
      </div>
    </AppLayout>
  );
}
