export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export type ColumnMeta = {
    headerClassName?: string;
    cellClassName?: string;
    align?: 'left' | 'center' | 'right';
};

export interface PaginationLink {
    label: string;
    url: string | null;
    page: number | null;
    active: boolean;
}

export interface PaginationLinks {
    prev: string | null;
    next: string | null;
    pages: PaginationLink[];
}
