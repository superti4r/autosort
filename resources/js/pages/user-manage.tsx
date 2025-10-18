import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { DataTable } from '../components/data-table';
import DataTableLayout from '../components/data-table-layout';
import DataTablePagination from '../components/data-table-pagination';
import type { PaginationLinks } from '../components/data-table-types';
import { ModalConfirm } from '../components/modal-confirm';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { useUserResource, type UserResourceRecord } from '../features/user-resource';
import { DashboardLayout } from '../layouts/dashboard-layouts';

interface PageProps {
    users?: {
        data?: UserResourceRecord[];
        meta?: Partial<{
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        }>;
        links?: Partial<PaginationLinks>;
    };
    filters?: {
        search?: string;
    };
    success?: string;
    [key: string]: unknown;
}

export default function UserManagePage() {
    const { users, filters, success } = usePage<PageProps>().props;
    const [pendingDelete, setPendingDelete] = useState<UserResourceRecord | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [pendingBulk, setPendingBulk] = useState<UserResourceRecord[]>([]);
    const [bulkModalOpen, setBulkModalOpen] = useState(false);

    const table = useUserResource({
        users,
        filters,
        success,
        onDeleteRequest: (user) => {
            setPendingDelete(user);
            setDeleteModalOpen(true);
        },
        onBulkDeleteRequest: (rows) => {
            setPendingBulk(rows);
            setBulkModalOpen(true);
        },
    });

    const handleConfirmDelete = () => {
        if (pendingDelete) {
            table.deleteUser(pendingDelete);
        }
        setDeleteModalOpen(false);
        setPendingDelete(null);
    };

    const handleConfirmBulkDelete = () => {
        if (pendingBulk.length > 0) {
            table.deleteUsers(pendingBulk);
        }
        setBulkModalOpen(false);
        setPendingBulk([]);
    };

    return (
        <>
            <Head title="Manajemen Pengguna" />

            <DashboardLayout title="Manajemen Pengguna">
                {table.successMessage && (
                    <Alert variant="success" className="mb-6 border-emerald-200/60 bg-emerald-50/70">
                        <AlertTitle>Berhasil</AlertTitle>
                        <AlertDescription>{table.successMessage}</AlertDescription>
                    </Alert>
                )}

                <DataTableLayout title="Daftar Pengguna" action={table.action} search={table.search}>
                    <DataTable
                        columns={table.columns}
                        data={table.data}
                        onDeleteSelected={table.onBulkDelete}
                        summaryText={table.summaryText}
                        footerContent={
                            <DataTablePagination meta={table.paginationMeta} links={table.paginationLinks} onPageChange={table.onPageChange} />
                        }
                    />
                </DataTableLayout>

                <ModalConfirm
                    open={deleteModalOpen}
                    onOpenChange={setDeleteModalOpen}
                    variant="destructive"
                    title={pendingDelete ? `Hapus ${pendingDelete.name}?` : 'Hapus pengguna?'}
                    description="Tindakan ini tidak dapat dibatalkan. Pengguna akan dihapus secara permanen."
                    confirmLabel="Hapus"
                    cancelLabel="Batal"
                    onConfirm={handleConfirmDelete}
                />

                <ModalConfirm
                    open={bulkModalOpen}
                    onOpenChange={setBulkModalOpen}
                    variant="destructive"
                    title="Hapus pengguna terpilih?"
                    description={`Anda akan menghapus ${pendingBulk.length} pengguna sekaligus. Pastikan pilihan sudah benar.`}
                    confirmLabel="Hapus Semua"
                    cancelLabel="Batal"
                    onConfirm={handleConfirmBulkDelete}
                />
            </DashboardLayout>
        </>
    );
}
