import { Link } from '@inertiajs/react';
import { LogOut, Settings, UserRound } from 'lucide-react';
import * as React from 'react';
import { cn } from '../lib/utils';

type DashboardProfileMenuProps = {
    user?: {
        name?: string | null;
        email?: string | null;
        avatar?: string | null;
    };
    settingsHref?: string;
    logoutHref?: string;
    className?: string;
    variant?: 'button' | 'summary';
};

export function DashboardProfileMenu({
    user,
    settingsHref = '/settings',
    logoutHref = '/logout',
    className,
    variant = 'button',
}: DashboardProfileMenuProps) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
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

    if (variant === 'summary') {
        return (
            <div
                className={cn(
                    'flex w-full items-center gap-3 rounded-[2.25rem] border border-border/70 bg-background/85 px-4 py-3 shadow-sm shadow-primary/10 backdrop-blur',
                    className,
                )}
            >
                <span className="grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user?.name ?? 'User avatar'} className="size-full rounded-full object-cover" />
                    ) : (
                        <UserRound className="size-5" />
                    )}
                </span>
                <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-foreground">{user?.name ?? 'Pengguna'}</p>
                    <p className="truncate text-sm text-muted-foreground">{user?.email ?? 'akun@contoh.com'}</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={cn('relative inline-flex', className)}>
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    setOpen((prev) => !prev);
                }}
                className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/85 px-1.5 py-1.5 text-left transition hover:border-primary/50 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <span className="grid size-11 place-items-center rounded-full border border-border/60 bg-primary/12 text-sm font-semibold text-primary uppercase">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user?.name ?? 'User avatar'} className="size-full rounded-full object-cover" />
                    ) : (
                        initials
                    )}
                </span>
                <div className="hidden min-w-[8rem] text-sm font-semibold text-foreground sm:flex sm:flex-col sm:pr-1">
                    <span className="truncate">{user?.name ?? 'Pengguna'}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user?.email ?? 'akun@contoh.com'}</span>
                </div>
            </button>

            <div
                className={cn(
                    'absolute top-[calc(100%+0.75rem)] right-0 w-56 overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/95 p-2 text-sm shadow-xl ring-1 shadow-primary/10 ring-border/60 transition-all duration-200 ease-out',
                    open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0',
                )}
                role="menu"
                aria-hidden={!open}
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
                        href={settingsHref}
                        className="flex items-center gap-3 rounded-[1.25rem] px-3 py-2.5 text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                    >
                        <Settings className="size-4" />
                        Pengaturan akun
                    </Link>
                    <Link
                        href={logoutHref}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-[1.25rem] px-3 py-2.5 text-left text-muted-foreground transition hover:bg-primary/10 hover:text-foreground"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                    >
                        <LogOut className="size-4" />
                        Keluar
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardProfileMenu;
