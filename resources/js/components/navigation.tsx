import { Link } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '../lib/utils';

export type DashboardNavigationItem = {
    label: string;
    href: string;
    icon?: ReactNode;
    active?: boolean;
};

type DashboardNavigationProps = {
    items: DashboardNavigationItem[];
    orientation?: 'horizontal' | 'vertical';
    onNavigate?: () => void;
    className?: string;
    pill?: boolean;
} & PropsWithChildren;

export function DashboardNavigation({ items, orientation = 'horizontal', onNavigate, className, pill = true }: DashboardNavigationProps) {
    return (
        <nav
            className={cn(
                'flex items-center gap-1 text-sm font-medium text-muted-foreground',
                orientation === 'vertical' && 'flex-col items-stretch gap-2',
                className,
            )}
        >
            {items.map(({ label, href, icon, active }) => (
                <Link
                    key={label}
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                        'inline-flex items-center gap-2 rounded-[1.75rem] px-4 py-2 transition-colors',
                        pill ? 'hover:bg-primary/10' : 'hover:text-foreground',
                        active ? 'shadow-[0_12px_28px_-16px_theme(colors.primary/70)] bg-primary text-primary-foreground' : 'text-muted-foreground',
                    )}
                >
                    {icon ? <span className="inline-flex size-4 items-center justify-center">{icon}</span> : null}
                    <span>{label}</span>
                </Link>
            ))}
        </nav>
    );
}

export default DashboardNavigation;
