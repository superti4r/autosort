import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { columns } from './column';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModalAddUser, ModalEditUser, ModalDeleteUser } from './modals';
import { User } from '@/types';

type DataTableProps = {
  showAdd: boolean;
  setShowAdd: (v: boolean) => void;
};

export default function DataTable({ showAdd, setShowAdd }: DataTableProps) {
  const { props } = usePage<{ users?: any; filter?: { search?: string } }>();
  const filter = props.filter ?? {};
  const users = props.users ?? { data: [], last_page: 1, current_page: 1 };

  const [search, setSearch] = useState<string>(filter.search ?? '');
  const [modal, setModal] = useState<{ type: 'add' | 'edit' | 'delete'; user?: User } | null>(null);

  const usersData: User[] = users.data ?? [];
  const lastPage: number = users.last_page ?? 1;
  const currentPage: number = users.current_page ?? 1;

  const table = useReactTable({
    data: usersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: lastPage,
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
  });

  const handleAction = (type: 'add' | 'edit' | 'delete', user?: User) => setModal({ type, user });

  const closeModal = () => {
    setModal(null);
    if (setShowAdd) setShowAdd(false);
    router.reload({ only: ['users'] });
  };

  const handleSuccess = () => closeModal();

  useEffect(() => {
    const handler = (e: any) => {
      const action = e.target.getAttribute('data-action');
      const id = e.target.getAttribute('data-id');
      if (action && id) {
        const user = table.getRowModel().rows.find((r) => r.original.id == id)?.original;
        if (action === 'edit') handleAction('edit', user);
        if (action === 'delete') handleAction('delete', user);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [table]);

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background p-6 shadow-lg dark:bg-card sm:p-8">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.get(
              '/users',
              { search },
              { preserveScroll: true, replace: true, only: ['users', 'filter'] }
            );
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button type="submit" variant="secondary" size="icon" aria-label="Cari">
            <Search className="size-5" />
          </Button>
        </form>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {typeof header.column.columnDef.header === 'function'
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {typeof cell.column.columnDef.cell === 'function'
                      ? cell.column.columnDef.cell(cell.getContext())
                      : cell.getValue()}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.get(
                          '/users',
                          { search, page: currentPage - 1 },
                          { preserveScroll: true, replace: true, only: ['users', 'filter'] }
                        )
                      }
                      disabled={currentPage === 1}
                      aria-label="Previous"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15 19l-7-7 7-7" />
                      </svg>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.get(
                          '/users',
                          { search, page: currentPage + 1 },
                          { preserveScroll: true, replace: true, only: ['users', 'filter'] }
                        )
                      }
                      disabled={currentPage === lastPage}
                      aria-label="Next"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {(modal?.type === 'add' || showAdd) && (
        <ModalAddUser open onClose={closeModal} onSuccess={handleSuccess} />
      )}
      {modal?.type === 'edit' && (
        <ModalEditUser open user={modal.user} onClose={closeModal} onSuccess={handleSuccess} />
      )}
      {modal?.type === 'delete' && (
        <ModalDeleteUser open user={modal.user} onClose={closeModal} onSuccess={handleSuccess} />
      )}
    </div>
  );
}
