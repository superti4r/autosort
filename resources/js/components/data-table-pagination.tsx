import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import type { PaginationLinks, PaginationMeta } from './data-table-types';
import { Button } from './ui/button';

interface DataTablePaginationProps {
    meta: PaginationMeta;
    links: PaginationLinks;
    onPageChange: (page: number) => void;
    className?: string;
}

export function DataTablePagination({ meta, links, onPageChange, className }: DataTablePaginationProps) {
    const handlePageChange = (page: number | null) => {
        if (!page) {
            return;
        }

        const clamped = Math.min(Math.max(page, 1), Math.max(meta.last_page, 1));
        if (clamped === meta.current_page || meta.last_page <= 0) {
            return;
        }
        onPageChange(clamped);
    };

    const canGoPrev = Boolean(links.prev) && meta.current_page > 1;
    const canGoNext = Boolean(links.next) && meta.current_page < meta.last_page;

    return (
        <div className={cn('flex flex-wrap items-center gap-2', className)}>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(meta.current_page - 1)} disabled={!canGoPrev}>
                <ChevronLeft className="mr-1 size-4" />
                Sebelumnya
            </Button>

            <div className="flex items-center gap-1">
                {links.pages.map((link, index) =>
                    link.page === null ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={link.page}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePageChange(link.page)}
                            disabled={link.active}
                            className={link.active ? 'cursor-default' : undefined}
                        >
                            {link.label}
                        </Button>
                    ),
                )}
            </div>

            <Button variant="outline" size="sm" onClick={() => handlePageChange(meta.current_page + 1)} disabled={!canGoNext}>
                Selanjutnya
                <ChevronRight className="ml-1 size-4" />
            </Button>
        </div>
    );
}

export default DataTablePagination;
