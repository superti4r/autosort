import * as React from 'react';
import { cn } from '../lib/utils';
import { DataTableSearch, type DataTableSearchProps } from './data-table-search';
import { Button } from './ui/button';

interface DataTableLayoutAction {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
}

interface DataTableLayoutProps {
    title: string;
    action?: DataTableLayoutAction;
    search?: DataTableSearchProps;
    summary?: string;
    pagination?: React.ReactNode;
    message?: string;
    children: React.ReactNode;
}

export function DataTableLayout({ title, action, search, summary, pagination, message, children }: DataTableLayoutProps) {
    return (
        <div className="space-y-6 transition-all duration-300 ease-out">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-foreground">{title}</h2>
                {action && (
                    <Button
                        variant={action.variant ?? 'outline'}
                        size="lg"
                        onClick={action.onClick}
                        className="w-full justify-center gap-2 transition-transform duration-200 ease-out hover:-translate-y-0.5 sm:w-auto"
                    >
                        {action.icon && <span className="mr-2 inline-flex items-center">{action.icon}</span>}
                        <span>{action.label}</span>
                    </Button>
                )}
            </div>

            {search && <DataTableSearch {...search} />}

            {message && <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">{message}</div>}

            <div>{children}</div>

            {(summary || pagination) && (
                <div
                    className={cn(
                        'flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center',
                        summary && pagination ? 'sm:justify-between' : summary ? 'sm:justify-start' : 'sm:justify-end',
                    )}
                >
                    {summary && <span>{summary}</span>}
                    {pagination && <div className={cn(!summary && 'sm:ml-auto')}>{pagination}</div>}
                </div>
            )}
        </div>
    );
}

export default DataTableLayout;
