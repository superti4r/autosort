import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataTableRowActions } from '../components/data-table-row-actions';
import type { ColumnMeta, PaginationLinks, PaginationMeta } from '../components/data-table-types';

import UserManageController from '@/actions/App/Http/Controllers/Pages/UserManageController';

export interface UserResourceRecord {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

interface UsersPayload {
    data?: UserResourceRecord[];
    meta?: Partial<PaginationMeta>;
    links?: Partial<PaginationLinks>;
}

interface UseUserResourceArgs {
    users?: UsersPayload;
    filters?: {
        search?: string;
    };
    success?: string;
    onDeleteRequest?: (user: UserResourceRecord) => void;
    onBulkDeleteRequest?: (users: UserResourceRecord[]) => void;
}

const EMPTY_META: PaginationMeta = {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
};

const normalizeUsers = (payload?: UsersPayload) => {
    const meta = { ...EMPTY_META, ...(payload?.meta ?? {}) };
    const links: PaginationLinks = {
        prev: payload?.links?.prev ?? null,
        next: payload?.links?.next ?? null,
        pages: (payload?.links?.pages ?? []).map((link) => ({
            label: link.label,
            url: link.url ?? null,
            active: Boolean(link.active),
            page:
                typeof link.page === 'number'
                    ? link.page
                    : typeof link.label === 'string' && /^\d+$/.test(link.label)
                      ? Number.parseInt(link.label, 10)
                      : null,
        })),
    };

    if (links.pages.length === 0) {
        links.pages = [
            {
                label: String(meta.current_page),
                url: null,
                page: meta.current_page,
                active: true,
            },
        ];
    }

    return {
        data: payload?.data ?? [],
        meta,
        links,
    };
};

const createColumns = (handlers: {
    onEdit: (user: UserResourceRecord) => void;
    onDelete: (user: UserResourceRecord) => void;
}): ColumnDef<UserResourceRecord>[] => [
    {
        accessorKey: 'name',
        header: 'Nama',
        cell: ({ row }) => (
            <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-foreground">{row.original.name}</span>
                <span className="text-xs text-muted-foreground">#{row.original.id}</span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <span className="block max-w-[240px] truncate text-sm text-muted-foreground">{row.original.email}</span>,
        meta: {
            headerClassName: 'min-w-[200px]',
            cellClassName: 'max-w-[200px] truncate',
        } satisfies ColumnMeta,
    },
    {
        accessorKey: 'created_at',
        header: 'Dibuat',
        cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.created_at}</span>,
        meta: {
            headerClassName: 'min-w-[120px]',
        } satisfies ColumnMeta,
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => <DataTableRowActions onEdit={() => handlers.onEdit(row.original)} onDelete={() => handlers.onDelete(row.original)} />,
        meta: {
            headerClassName: 'w-16 text-center',
            cellClassName: 'text-center',
            align: 'center',
        } satisfies ColumnMeta,
    },
];

const buildSummary = (meta: PaginationMeta, rowCount: number) => {
    if (meta.total > 0) {
        const from = meta.from ?? 0;
        const to = meta.to ?? rowCount;
        return `Menampilkan ${from}-${to} dari ${meta.total} pengguna`;
    }

    return rowCount > 0 ? `Menampilkan ${rowCount} pengguna` : 'Belum ada data pengguna.';
};

export const useUserResource = ({ users: usersPayload, filters, success, onDeleteRequest, onBulkDeleteRequest }: UseUserResourceArgs) => {
    const users = normalizeUsers(usersPayload);
    const activeSearch = filters?.search ?? '';
    const [searchInput, setSearchInput] = useState(activeSearch);

    useEffect(() => {
        setSearchInput(activeSearch);
    }, [activeSearch]);

    const visitIndex = useCallback(
        (overrides?: { search?: string | null; page?: number | null }) => {
            const desiredSearch = overrides && Object.prototype.hasOwnProperty.call(overrides, 'search') ? overrides?.search : activeSearch;
            const trimmedSearch = typeof desiredSearch === 'string' ? desiredSearch.trim() : null;

            const desiredPage =
                overrides && Object.prototype.hasOwnProperty.call(overrides, 'page')
                    ? (overrides?.page ?? users.meta.current_page)
                    : users.meta.current_page;
            const normalizedPage = desiredPage && desiredPage > 1 ? desiredPage : undefined;

            const query: Record<string, string | number> = {};
            if (trimmedSearch) {
                query.search = trimmedSearch;
            }
            if (normalizedPage) {
                query.page = normalizedPage;
            }

            router.get(UserManageController.show().url, query, { preserveState: true, replace: true, preserveScroll: true });
        },
        [activeSearch, users.meta.current_page],
    );

    const handleSearchChange = useCallback((value: string) => {
        setSearchInput(value);
    }, []);

    const handleSearchSubmit = useCallback(
        (value: string) => {
            setSearchInput(value);
            visitIndex({ search: value || null, page: 1 });
        },
        [visitIndex],
    );

    const handleReset = useCallback(() => {
        setSearchInput('');
        visitIndex({ search: null, page: 1 });
    }, [visitIndex]);

    const deleteUser = useCallback((user: UserResourceRecord) => {
        router.delete(UserManageController.destroy(user.id).url, {
            preserveScroll: true,
            preserveState: true,
        });
    }, []);

    const deleteUsers = useCallback((rows: UserResourceRecord[]) => {
        if (!rows.length) {
            return;
        }

        rows.forEach((row, index) =>
            router.delete(UserManageController.destroy(row.id).url, {
                preserveScroll: true,
                preserveState: index !== rows.length - 1,
            }),
        );
    }, []);

    const handleBulkDelete = useCallback(
        (rows: UserResourceRecord[]) => {
            if (!rows.length) {
                return;
            }

            if (onBulkDeleteRequest) {
                onBulkDeleteRequest(rows);
                return;
            }

            deleteUsers(rows);
        },
        [deleteUsers, onBulkDeleteRequest],
    );

    const handleEdit = useCallback((user: UserResourceRecord) => {
        router.visit(UserManageController.edit(user.id).url);
    }, []);

    const handleDelete = useCallback(
        (user: UserResourceRecord) => {
            if (onDeleteRequest) {
                onDeleteRequest(user);
                return;
            }

            deleteUser(user);
        },
        [deleteUser, onDeleteRequest],
    );

    const handleCreate = useCallback(() => {
        router.visit(UserManageController.create().url);
    }, []);

    const handlePageChange = useCallback(
        (page: number) => {
            const clamped = Math.min(Math.max(page, 1), users.meta.last_page);
            if (clamped === users.meta.current_page) {
                return;
            }

            visitIndex({ page: clamped });
        },
        [users.meta.current_page, users.meta.last_page, visitIndex],
    );

    const columns = useMemo(() => createColumns({ onEdit: handleEdit, onDelete: handleDelete }), [handleDelete, handleEdit]);

    return {
        columns,
        data: users.data,
        search: {
            value: searchInput,
            onChange: handleSearchChange,
            onSubmit: handleSearchSubmit,
            onReset: handleReset,
            autoSubmit: true,
        },
        summaryText: buildSummary(users.meta, users.data.length),
        paginationMeta: users.meta,
        paginationLinks: users.links,
        onPageChange: handlePageChange,
        onBulkDelete: handleBulkDelete,
        deleteUsers,
        deleteUser,
        action: {
            label: 'Tambah Pengguna',
            icon: <Plus className="size-5" />,
            onClick: handleCreate,
        },
        successMessage: success,
    };
};

export type UseUserResourceReturn = ReturnType<typeof useUserResource>;
