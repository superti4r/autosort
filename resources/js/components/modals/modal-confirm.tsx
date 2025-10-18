import { ShieldAlert, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Modal, ModalActions, ModalBody } from '../ui/modal';

export type ConfirmVariant = 'default' | 'destructive' | 'success';

const variantStyles: Record<
    ConfirmVariant,
    {
        accent: string;
        iconClass: string;
        primaryVariant: 'default' | 'outline' | 'ghost';
        primaryClass?: string;
    }
> = {
    default: {
        accent: 'border-border/60',
        iconClass: 'text-primary',
        primaryVariant: 'default',
        primaryClass: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    destructive: {
        accent: 'border-red-200/70',
        iconClass: 'text-red-500',
        primaryVariant: 'outline',
        primaryClass: 'border-red-300/70 text-red-600 hover:bg-red-50',
    },
    success: {
        accent: 'border-emerald-200/70',
        iconClass: 'text-emerald-500',
        primaryVariant: 'default',
        primaryClass: 'bg-emerald-500 text-emerald-50 hover:bg-emerald-500/90',
    },
};

export interface ModalConfirmProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    variant?: ConfirmVariant;
    title: string;
    description?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    onConfirm: () => void;
}

export function ModalConfirm({
    open,
    onOpenChange,
    variant = 'default',
    title,
    description,
    confirmLabel = 'Ya, lanjutkan',
    cancelLabel = 'Batal',
    loading = false,
    onConfirm,
}: ModalConfirmProps) {
    const styles = variantStyles[variant];
    const [visible, setVisible] = React.useState(false);

    const handleConfirm = () => {
        onConfirm();
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    React.useEffect(() => {
        if (!open) {
            setVisible(false);
            return;
        }
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => {
            cancelAnimationFrame(raf);
            setVisible(false);
        };
    }, [open]);

    return (
        <Modal open={open} onOpenChange={onOpenChange} size="sm" closeButton={false} className="border-none bg-transparent shadow-none sm:max-w-md">
            <div
                className={cn(
                    'shadow-[0_35px_90px_-45px_theme(colors.primary/50)] relative flex w-full origin-center transform-gpu flex-col gap-6 rounded-[2rem] border border-border/60 bg-card/95 p-8 text-center transition-all duration-300 ease-out',
                    styles.accent,
                    visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                )}
            >
                <button
                    type="button"
                    onClick={handleCancel}
                    className="absolute top-5 right-5 inline-flex size-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                    aria-label="Tutup konfirmasi"
                >
                    <X className="size-5" />
                </button>

                <div className="shadow-[0_16px_36px_-28px_theme(colors.primary/55)] mx-auto flex size-14 items-center justify-center rounded-full border border-border/50 bg-background text-primary">
                    <ShieldAlert className={cn('size-6', styles.iconClass)} />
                </div>
                <div className="space-y-3 px-2">
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    {description && <ModalBody className="px-0 text-sm leading-relaxed text-muted-foreground">{description}</ModalBody>}
                </div>

                <ModalActions className="justify-center gap-3 sm:flex-row sm:justify-center">
                    <Button type="button" variant="ghost" onClick={handleCancel} className="w-full rounded-full px-6 sm:w-auto">
                        {cancelLabel}
                    </Button>
                    <Button
                        type="button"
                        variant={styles.primaryVariant}
                        onClick={handleConfirm}
                        disabled={loading}
                        className={cn('w-full rounded-full px-6 sm:w-auto', styles.primaryClass)}
                    >
                        {loading ? 'Memproses...' : confirmLabel}
                    </Button>
                </ModalActions>
            </div>
        </Modal>
    );
}

export default ModalConfirm;
