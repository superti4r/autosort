import type { PropsWithChildren, ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import { cn } from '../lib/utils';
import { DashboardHeader } from '../components/header';
import type { DashboardNavigationItem } from '../components/navigation';
import type { SharedData, User } from '../types';

import DashboardController from '@/actions/App/Http/Controllers/Pages/DashboardController';

type DashboardLayoutProps = PropsWithChildren<{
    title?: string;
    navigation?: DashboardNavigationItem[];
    headerSlot?: ReactNode;
    className?: string;
}>;

const defaultNavigation: DashboardNavigationItem[] = [
    { label: 'Overview', href: DashboardController.show().url },
];

export function DashboardLayout({
    title,
    navigation = defaultNavigation,
    headerSlot,
    className,
    children,
}: DashboardLayoutProps) {
    const page = usePage<SharedData>();
    const user = (page.props.auth?.user ?? null) as User | null;

    const currentPath = page.url.split('?')[0];
    const navWithActive = navigation.map((item) => {
        const isActive = item.active ?? currentPath === item.href;
        return { ...item, active: isActive };
    });

    return (
        <div className="relative min-h-dvh bg-background text-foreground">
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_theme(colors.primary/12),_transparent_55%),radial-gradient(circle_at_bottom,_theme(colors.primary/10),_transparent_55%)]" />
            <div className="relative z-10 flex min-h-dvh flex-col">
                <DashboardHeader navigation={navWithActive} user={user ?? undefined} brand="autosort" />

                {headerSlot ? (
                    <div className="border-b border-border/60 bg-card/60">
                        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
                            <div>
                                {title ? (
                                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
                                ) : null}
                            </div>
                            {headerSlot}
                        </div>
                    </div>
                ) : title ? (
                    <div className="border-b border-border/60 bg-card/60">
                        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-6 sm:px-8">
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
                        </div>
                    </div>
                ) : null}

                <main className={cn('mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-8 sm:px-8 lg:py-12', className)}>
                    <div className="flex-1 rounded-[2.5rem] border border-border/70 bg-card/80 px-6 py-8 shadow-[0_28px_65px_-40px_theme(colors.primary/50)] backdrop-blur-lg sm:px-10 sm:py-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
