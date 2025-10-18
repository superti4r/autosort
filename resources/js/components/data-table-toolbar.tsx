import { Table } from '@tanstack/react-table';
import { EyeOff, Search, Trash2 } from 'lucide-react';

export interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    onDeleteSelected?: (rows: TData[]) => void;
}

export function DataTableToolbar<TData>({ table, onDeleteSelected }: DataTableToolbarProps<TData>) {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    return (
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute top-2.5 left-2 size-4 text-muted-foreground" />
                    <input
                        placeholder="Cari data..."
                        value={(table.getState().globalFilter as string) ?? ''}
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background py-2 pr-3 pl-8 text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                </div>

                <button
                    onClick={() => table.resetColumnVisibility()}
                    className="hidden items-center gap-1 rounded-lg bg-muted/50 px-3 py-2 text-sm transition hover:bg-muted sm:inline-flex"
                >
                    <EyeOff className="size-4" />
                    Reset
                </button>
            </div>

            {selectedRows.length > 0 && (
                <button
                    onClick={() => onDeleteSelected?.(selectedRows.map((r) => r.original))}
                    className="text-destructive-foreground inline-flex items-center gap-1 rounded-lg bg-destructive px-3 py-2 transition hover:opacity-90"
                >
                    <Trash2 className="size-4" />
                    Hapus ({selectedRows.length})
                </button>
            )}
        </div>
    );
}
