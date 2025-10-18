import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

interface DataTableRowActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

const MENU_WIDTH = 192;
const MENU_OFFSET = 8;
const VIEWPORT_MARGIN = 16;

type MenuSize = { width: number; height: number };

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const computePosition = (triggerRect: DOMRect, menuSize?: MenuSize) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const rawLeft = triggerRect.right - MENU_WIDTH;
    const left = clamp(rawLeft, VIEWPORT_MARGIN, viewportWidth - MENU_WIDTH - VIEWPORT_MARGIN);

    const rawTop = triggerRect.bottom + MENU_OFFSET;
    if (!menuSize) {
        return { left, top: clamp(rawTop, VIEWPORT_MARGIN, viewportHeight - VIEWPORT_MARGIN) };
    }

    const fitsBelow = rawTop + menuSize.height + VIEWPORT_MARGIN <= viewportHeight;
    const fitsAbove = triggerRect.top - menuSize.height - MENU_OFFSET >= VIEWPORT_MARGIN;
    let top = rawTop;

    if (!fitsBelow && fitsAbove) {
        top = triggerRect.top - menuSize.height - MENU_OFFSET;
    } else if (!fitsBelow) {
        top = clamp(viewportHeight - menuSize.height - VIEWPORT_MARGIN, VIEWPORT_MARGIN, viewportHeight - VIEWPORT_MARGIN);
    }

    return { left, top };
};

export function DataTableRowActions({ onEdit, onDelete }: DataTableRowActionsProps) {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [menuVisible, setMenuVisible] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    const syncPosition = React.useCallback((menuSize?: MenuSize) => {
        const trigger = triggerRef.current;
        if (!trigger) {
            return;
        }
        const rect = trigger.getBoundingClientRect();
        setPosition(computePosition(rect, menuSize));
    }, []);

    const toggleMenu = () => {
        if (!open) {
            syncPosition();
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    React.useEffect(() => {
        if (!open) {
            setMenuVisible(false);
            return;
        }

        const animateSync = () => {
            const menu = menuRef.current;
            if (menu) {
                const rect = menu.getBoundingClientRect();
                syncPosition({ width: rect.width, height: rect.height });
            }
        };
        animateSync();
        const raf = requestAnimationFrame(() => setMenuVisible(true));

        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!menuRef.current || !triggerRef.current) {
                return;
            }

            if (!menuRef.current.contains(target) && !triggerRef.current.contains(target)) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        const handleScrollOrResize = () => {
            const menu = menuRef.current;
            if (menu) {
                const rect = menu.getBoundingClientRect();
                syncPosition({ width: rect.width, height: rect.height });
            } else {
                syncPosition();
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        window.addEventListener('scroll', handleScrollOrResize, true);
        window.addEventListener('resize', handleScrollOrResize);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('scroll', handleScrollOrResize, true);
            window.removeEventListener('resize', handleScrollOrResize);
            cancelAnimationFrame(raf);
            setMenuVisible(false);
        };
    }, [open, syncPosition]);

    const handleAction = (callback?: () => void) => {
        callback?.();
        setOpen(false);
    };

    return (
        <>
            <Button
                ref={triggerRef}
                type="button"
                variant="ghost"
                size="icon"
                className="size-9 rounded-full transition-transform duration-200 ease-out hover:scale-105 hover:bg-accent/50"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={toggleMenu}
            >
                <MoreHorizontal className="size-4" />
            </Button>

            {open &&
                typeof window !== 'undefined' &&
                createPortal(
                    <div
                        ref={menuRef}
                        role="menu"
                        style={{ top: position.top, left: position.left, width: MENU_WIDTH }}
                        className={cn(
                            'fixed z-50 rounded-xl border border-border/70 bg-card/95 p-1 shadow-[0_18px_32px_-12px_rgba(15,23,42,0.35)] backdrop-blur transition-all duration-200 ease-out',
                            menuVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
                        )}
                    >
                        <button
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent/40"
                            onClick={() => handleAction(onEdit)}
                        >
                            <Edit className="size-4 text-primary" />
                            Edit
                        </button>
                        <button
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive transition-colors duration-150 hover:bg-destructive/10"
                            onClick={() => handleAction(onDelete)}
                        >
                            <Trash2 className="size-4" />
                            Hapus
                        </button>
                    </div>,
                    document.body,
                )}
        </>
    );
}
