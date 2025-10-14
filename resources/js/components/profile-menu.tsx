import { Link, router } from '@inertiajs/react';
import { LogOut, Settings, UserRound } from 'lucide-react';
import * as React from 'react';
import { cn } from '../lib/utils';

import LogoutController from '@/actions/App/Http/Controllers/Auth/LogoutController';
import UserProfileController from '@/actions/App/Http/Controllers/Pages/UserProfileController';

type DashboardProfileMenuProps = {
    user?: {
        name?: string | null;
        email?: string | null;
        avatar?: string | null;
    };
    className?: string;
    variant?: 'button' | 'summary';
};

export function DashboardProfileMenu({ user, className, variant = 'button' }: DashboardProfileMenuProps) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKey);
        };
    }, []);

    const initials = React.useMemo(() => {
        const name = user?.name ?? '';
        if (!name.trim()) return 'A';
        return name
            .split(' ')
            .map((segment) => segment[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    }, [user?.name]);

    const isSummary = variant === 'summary';

    const handleLogout = () => {
        router.post(
            LogoutController.__invoke().url,
            {},
            {
                preserveScroll: true,
            },
        );
        setOpen(false);
    };

    React.useEffect(() => {
        if (!open && menuRef.current) {
            const active = document.activeElement as HTMLElement | null;
            if (active && menuRef.current.contains(active)) active.blur();
        }
    }, [open]);

    return (
        <div ref={containerRef} className={cn('relative', isSummary ? 'inline-flex w-full' : 'inline-flex', className)}>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
                className={cn(
                    'inline-flex items-center text-left transition hover:border-primary/50 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none',
                    isSummary
                        ? 'w-full gap-3 rounded-[2.25rem] border border-border/70 bg-background/85 px-4 py-3 shadow-sm shadow-primary/10 backdrop-blur'
                        : 'gap-3 rounded-full border border-border/70 bg-background/85 px-1.5 py-1.5',
                )}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <span
                    className={cn(
                        'grid place-items-center',
                        isSummary
                            ? 'size-12 rounded-full bg-primary/15 text-primary'
                            : 'size-11 rounded-full border border-border/60 bg-primary/12 text-sm font-semibold text-primary uppercase',
                    )}
                >
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user?.name ?? 'User avatar'} className="size-full rounded-full object-cover" />
                    ) : isSummary ? (
                        <UserRound className="size-5" />
                    ) : (
                        initials
                    )}
                </span>

                <div
                    className={cn(
                        'min-w-0 text-sm font-semibold text-foreground',
                        isSummary ? 'flex flex-col' : 'hidden sm:flex sm:flex-col sm:pr-1',
                    )}
                >
                    <span className={cn('truncate', isSummary ? 'text-base font-semibold' : undefined)}>{user?.name ?? 'Pengguna'}</span>
                    <span
                        className={cn(
                            'text-xs font-normal text-muted-foreground',
                            isSummary ? 'text-sm font-normal text-muted-foreground' : undefined,
                        )}
                    >
                        {user?.email ?? 'akun@contoh.com'}
                    </span>
                </div>
            </button>

            <div
                ref={menuRef}
                role="menu"
                aria-hidden={!open}
                className={cn(
                    'absolute top-[calc(100%+0.75rem)] right-0 w-56 overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/95 p-2 text-sm shadow-xl ring-1 shadow-primary/10 ring-border/60 transition-all duration-200 ease-out',
                    open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0',
                )}
            >
                <div className="flex items-center gap-3 rounded-[1.25rem] border border-border/60 bg-background/70 px-3 py-3">
                    <span className="grid size-10 place-items-center rounded-[1.25rem] bg-primary/15 text-primary">
                        <UserRound className="size-5" />
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{user?.name ?? 'Pengguna'}</p>
                        <p className="truncate text-xs text-muted-foreground">{user?.email ?? 'akun@contoh.com'}</p>
                    </div>
                </div>

                <div className="mt-2 space-y-1">
                    <Link
                        href={UserProfileController.show().url}
                        className="flex items-center gap-3 rounded-[1.25rem] px-3 py-2.5 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                    >
                        <Settings className="size-4" />
                        Profil Saya
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-[1.25rem] px-3 py-2.5 text-left text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                        role="menuitem"
                    >
                        <LogOut className="size-4" />
                        Keluar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardProfileMenu;
