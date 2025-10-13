import { Link } from '@inertiajs/react';
import { Menu, Sparkles, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../lib/utils';
import { DashboardNavigation, type DashboardNavigationItem } from './navigation';
import { DashboardProfileMenu } from './profile-menu';

type DashboardHeaderProps = {
    brand?: string;
    navigation: DashboardNavigationItem[];
    user?: {
        name?: string | null;
        email?: string | null;
        avatar?: string | null;
    };
    className?: string;
};

export function DashboardHeader({ brand = 'autosort', navigation, user, className }: DashboardHeaderProps) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
        if (!mobileOpen) return;
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMobileOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [mobileOpen]);

    return (
        <header
            className={cn(
                'relative z-30 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75',
                className,
            )}
        >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.28em] text-primary uppercase transition hover:text-primary/80"
                    >
                        <span className="inline-flex size-9 items-center justify-center rounded-[1.75rem] border border-border/70 bg-primary/10 text-primary">
                            <Sparkles className="size-4" />
                        </span>
                        {brand}
                    </Link>
                    <DashboardNavigation items={navigation} className="hidden lg:flex" />
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden lg:block">
                        <DashboardProfileMenu user={user} />
                    </div>
                    <button
                        type="button"
                        className="inline-flex size-11 items-center justify-center rounded-[1.75rem] border border-border/70 bg-background/80 text-foreground transition hover:border-primary/50 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none lg:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle navigasi"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            <div
                className={cn(
                    'absolute inset-x-0 top-full z-20 origin-top rounded-b-[2.25rem] border-x border-b border-border/60 bg-card/95 px-5 pb-6 shadow-2xl shadow-primary/10 backdrop-blur-lg transition-all duration-200 ease-out sm:px-8 lg:hidden',
                    mobileOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
                )}
            >
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pt-4">
                    <DashboardProfileMenu user={user} className="w-full lg:hidden" variant="summary" />
                    <DashboardNavigation
                        items={navigation}
                        orientation="vertical"
                        onNavigate={() => setMobileOpen(false)}
                        className="rounded-[1.75rem] border border-border/70 bg-background/80 px-4 py-4 shadow-lg shadow-primary/10"
                    />
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
