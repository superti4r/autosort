import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const alertVariants = cva(
    'group relative flex w-full items-start gap-4 rounded-[1.75rem] border px-5 py-4 text-sm shadow-sm transition-all duration-300 ease-out data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=closed]:-translate-y-1 data-[state=closed]:opacity-0 sm:px-6 sm:py-5',
    {
        variants: {
            variant: {
                default: 'border-border/70 bg-card/95 text-foreground',
                success: 'border-emerald-300/50 bg-emerald-100/20 text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-50',
                warning: 'border-amber-300/50 bg-amber-100/20 text-amber-900 dark:border-amber-400/40 dark:bg-amber-400/10 dark:text-amber-50',
                destructive: 'border-red-300/50 bg-red-100/25 text-red-900 dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-100',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    icon?: React.ReactNode;
    dismissible?: boolean;
    defaultOpen?: boolean;
    onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant, icon, dismissible = true, defaultOpen = true, onClose, children, ...props }, ref) => {
        const [open, setOpen] = React.useState(defaultOpen);
        const [closing, setClosing] = React.useState(false);
        const timerRef = React.useRef<number | undefined>(undefined);

        const handleClose = () => {
            if (closing) return;
            setClosing(true);
            timerRef.current = window.setTimeout(() => {
                setClosing(false);
                setOpen(false);
                onClose?.();
            }, 220);
        };

        React.useEffect(() => {
            return () => {
                if (timerRef.current) {
                    window.clearTimeout(timerRef.current);
                }
            };
        }, []);

        if (!open && !closing) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="alert"
                data-state={closing ? 'closed' : 'open'}
                className={cn(alertVariants({ variant }), className)}
                {...props}
            >
                {icon ? (
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[1.25rem] border border-border/40 bg-background/60 text-current">
                        {icon}
                    </span>
                ) : null}
                <div className="flex flex-1 flex-col gap-1">{children}</div>
                {dismissible ? (
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full p-2 text-muted-foreground/70 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        aria-label="Tutup pemberitahuan"
                    >
                        <X className="size-4" />
                    </button>
                ) : null}
            </div>
        );
    }
);

Alert.displayName = 'Alert';

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('text-sm font-semibold tracking-tight text-foreground', className)} {...props} />
));

AlertTitle.displayName = 'AlertTitle';

export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm leading-relaxed text-muted-foreground', className)} {...props} />
));

AlertDescription.displayName = 'AlertDescription';
