import { CheckCircle2, Info, TriangleAlert, XCircle } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Modal, ModalBody, ModalFooter } from '../ui/modal';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

const variantConfig: Record<
    AlertVariant,
    {
        icon: React.ReactNode;
        accent: string;
        titleClass: string;
    }
> = {
    success: {
        icon: <CheckCircle2 className="size-7 text-emerald-500" />,
        accent: 'bg-emerald-50 border-emerald-200/80',
        titleClass: 'text-emerald-700',
    },
    error: {
        icon: <XCircle className="size-7 text-red-500" />,
        accent: 'bg-red-50 border-red-200/80',
        titleClass: 'text-red-700',
    },
    warning: {
        icon: <TriangleAlert className="size-7 text-amber-500" />,
        accent: 'bg-amber-50 border-amber-200/80',
        titleClass: 'text-amber-700',
    },
    info: {
        icon: <Info className="size-7 text-primary" />,
        accent: 'bg-primary/5 border-primary/20',
        titleClass: 'text-primary',
    },
};

export interface ModalAlertProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    variant?: AlertVariant;
    title: string;
    description?: React.ReactNode;
    primaryLabel?: string;
    onPrimary?: () => void;
}

export function ModalAlert({ open, onOpenChange, variant = 'info', title, description, primaryLabel = 'Tutup', onPrimary }: ModalAlertProps) {
    const config = variantConfig[variant];
    const [visible, setVisible] = React.useState(false);

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

    const handlePrimary = () => {
        onPrimary?.();
        onOpenChange(false);
    };

    return (
        <Modal open={open} onOpenChange={onOpenChange} size="sm" closeButton={false} className={config.accent}>
            <ModalBody
                className={cn(
                    'flex origin-center transform-gpu flex-col items-center gap-4 text-center transition-all duration-300 ease-out',
                    visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
                )}
            >
                <div className="flex size-16 items-center justify-center rounded-full bg-background shadow-inner transition-transform duration-300 ease-out will-change-transform hover:scale-105">
                    {config.icon}
                </div>
                <div className="space-y-2">
                    <h3 className={`text-lg font-semibold ${config.titleClass}`}>{title}</h3>
                    {description && <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handlePrimary} className="w-full justify-center">
                    {primaryLabel}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalAlert;
