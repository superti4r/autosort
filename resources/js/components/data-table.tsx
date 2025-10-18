import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { cn } from '../lib/utils';
import type { ColumnMeta } from './data-table-types';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface DataTableProps<TData> {
    columns: ColumnDef<TData, unknown>[];
    data: TData[];
    summaryText?: string;
    footerContent?: React.ReactNode;
    onDeleteSelected?: (rows: TData[]) => void;
    emptyMessage?: string;
}

export function DataTable<TData>({ columns, data, summaryText, footerContent, onDeleteSelected, emptyMessage }: DataTableProps<TData>) {
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
    });

    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    const summaryLabel = summaryText === null ? undefined : (summaryText ?? `Menampilkan ${data.length} data`);
    const emptyLabel = emptyMessage ?? 'Tidak ada data ditemukan.';
    const defaultFooter = (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="mr-1 size-4" />
                Sebelumnya
            </Button>
            <Button variant="outline" size="sm" disabled>
                Selanjutnya
                <ChevronRight className="ml-1 size-4" />
            </Button>
        </div>
    );
    const resolvedFooter = footerContent === null ? undefined : (footerContent ?? defaultFooter);

    return (
        <div className="w-full space-y-4 transition-all duration-300 ease-out">
            {onDeleteSelected && selectedRows.length > 0 && (
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-card/80 p-3 text-sm shadow-sm">
                    <span className="font-medium text-foreground">{selectedRows.length} data dipilih</span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-destructive/40 text-destructive hover:border-destructive/60 hover:bg-destructive/10"
                        onClick={() => onDeleteSelected(selectedRows)}
                    >
                        Hapus Terpilih
                    </Button>
                </div>
            )}

            <div className="hover:shadow-[0_28px_80px_-50px_theme(colors.primary/55)] rounded-2xl border border-border/70 bg-card/90 shadow-sm transition-all duration-300 ease-out hover:border-primary/30">
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full border-collapse text-sm">
                        <thead className="bg-muted/30 text-xs tracking-wide text-muted-foreground uppercase">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    <th className="w-12 px-4 py-4 text-left">
                                        <Checkbox
                                            checked={table.getIsAllRowsSelected()}
                                            onChange={(event) => table.toggleAllRowsSelected(event.target.checked)}
                                            aria-label="Pilih semua baris"
                                        />
                                    </th>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className={cn(
                                                'px-4 py-4 text-left font-semibold text-foreground',
                                                (header.column.columnDef.meta as ColumnMeta | undefined)?.headerClassName,
                                                {
                                                    'text-center': (header.column.columnDef.meta as ColumnMeta | undefined)?.align === 'center',
                                                    'text-right': (header.column.columnDef.meta as ColumnMeta | undefined)?.align === 'right',
                                                },
                                            )}
                                        >
                                            {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-border/60">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="transition-all duration-150 ease-out hover:bg-accent/25">
                                    <td className="px-4 py-4 align-middle">
                                        <Checkbox
                                            checked={row.getIsSelected()}
                                            onChange={(event) => row.toggleSelected(event.target.checked)}
                                            aria-label="Pilih baris ini"
                                        />
                                    </td>
                                    {row.getVisibleCells().map((cell) => {
                                        const meta = cell.column.columnDef.meta as ColumnMeta | undefined;
                                        return (
                                            <td
                                                key={cell.id}
                                                className={cn('px-4 py-4 align-middle text-sm text-foreground', meta?.cellClassName, {
                                                    'text-center': meta?.align === 'center',
                                                    'text-right': meta?.align === 'right',
                                                })}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}

                            {table.getRowModel().rows.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-sm font-medium text-muted-foreground">
                                        {emptyLabel}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {(summaryLabel || resolvedFooter) && (
                <div className="flex flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center">
                    {summaryLabel && <span>{summaryLabel}</span>}
                    {resolvedFooter}
                </div>
            )}
        </div>
    );
}
