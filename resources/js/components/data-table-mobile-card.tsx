import { Row, flexRender } from '@tanstack/react-table';
import { Checkbox } from './ui/checkbox';

interface DataTableMobileCardProps<TData> {
    row: Row<TData>;
}

const formatLabel = (label: string) => label.replace(/[_-]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

export function DataTableMobileCard<TData>({ row }: DataTableMobileCardProps<TData>) {
    const visibleCells = row.getVisibleCells();
    const actionCell = visibleCells.find((cell) => cell.column.id === 'actions');
    const contentCells = visibleCells.filter((cell) => cell.column.id !== 'actions');

    return (
        <div className="rounded-2xl border border-border/60 bg-card/90 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-4 text-sm">
                    {contentCells.map((cell) => {
                        const header = cell.column.columnDef.header;
                        const label = typeof header === 'string' ? header : formatLabel(cell.column.id);

                        return (
                            <div key={cell.id} className="space-y-1">
                                <span className="block text-xs font-semibold tracking-wide text-muted-foreground/80 uppercase">{label}</span>
                                <span className="block text-sm break-words text-foreground">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <Checkbox
                    checked={row.getIsSelected()}
                    onChange={(event) => row.toggleSelected(event.target.checked)}
                    aria-label="Pilih baris"
                    className="mt-1"
                />
            </div>

            {actionCell && <div className="mt-4 flex justify-end">{flexRender(actionCell.column.columnDef.cell, actionCell.getContext())}</div>}
        </div>
    );
}
