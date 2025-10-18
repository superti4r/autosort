import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-5xl sm:max-h-[90vh] sm:overflow-hidden',
};

export interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    size?: ModalSize;
    closeButton?: boolean;
    className?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const modalRoot = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    let element = document.getElementById('modal-root');

    if (!element) {
        element = document.createElement('div');
        element.id = 'modal-root';
        document.body.appendChild(element);
    }

    return element;
};

export function Modal({
    open,
    onOpenChange,
    title,
    description,
    size = 'md',
    closeButton = true,
    className,
    children,
    footer,
}: ModalProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const [animateIn, setAnimateIn] = React.useState(false);

    React.useEffect(() => {
        if (!open) {
            return;
        }

        const raf = requestAnimationFrame(() => setAnimateIn(true));

        return () => {
            cancelAnimationFrame(raf);
            setAnimateIn(false);
        };
    }, [open]);

    React.useEffect(() => {
        if (!open) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open]);

    if (!open || !mounted) {
        return null;
    }

    const root = modalRoot();

    if (!root) {
        return null;
    }

    const handleClose = () => {
        onOpenChange(false);
    };

    return createPortal(
        <div
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/40 p-4 backdrop-blur-md transition-opacity duration-300 ease-out',
                animateIn ? 'opacity-100' : 'opacity-0',
            )}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="absolute inset-0"
                onClick={handleClose}
                aria-hidden="true"
            />
            <div
                className={cn(
                    'relative z-10 flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/95 shadow-[0_28px_65px_-40px_theme(colors.primary/60)] backdrop-blur-xl transition-all duration-300 ease-out',
                    animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                    sizeClasses[size],
                    className,
                )}
            >
                {(title || closeButton) && (
                    <header className="flex items-start justify-between gap-6 border-b border-border/60 px-6 py-5">
                        <div className="space-y-1.5">
                            {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
                            {description && <p className="text-sm text-muted-foreground">{description}</p>}
                        </div>
                        {closeButton && (
                            <button
                                type="button"
                                onClick={handleClose}
                                className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                aria-label="Tutup dialog"
                            >
                                <X className="size-5" />
                            </button>
                        )}
                    </header>
                )}
                <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
                {footer && <footer className="border-t border-border/60 bg-card/90 px-6 py-4">{footer}</footer>}
            </div>
        </div>,
        root,
    );
}

export type ModalSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const ModalBody = React.forwardRef<HTMLDivElement, ModalSectionProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)} {...props} />
));

ModalBody.displayName = 'ModalBody';

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalSectionProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-3 sm:flex-row sm:justify-end', className)} {...props} />
));

ModalFooter.displayName = 'ModalFooter';

export const ModalActions = React.forwardRef<HTMLDivElement, ModalSectionProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
));

ModalActions.displayName = 'ModalActions';
