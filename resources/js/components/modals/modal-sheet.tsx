import { ArrowLeft, X } from 'lucide-react';
import * as React from 'react';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

export interface ModalSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    onBack?: () => void;
}

export function ModalSheet({ open, onOpenChange, title, description, children, footer, onBack }: ModalSheetProps) {
    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            size="full"
            closeButton={false}
            className="bg-gradient-to-br from-card/95 via-card/90 to-card/80 sm:max-w-3xl"
            title={
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {onBack && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={onBack}
                                className="size-10 rounded-full border border-border/50 backdrop-blur-sm"
                            >
                                <ArrowLeft className="size-5" />
                            </Button>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground sm:text-xl">{title}</h3>
                            {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="size-10 rounded-full border border-border/50 backdrop-blur-sm"
                    >
                        <X className="size-5" />
                    </Button>
                </div>
            }
        >
            <div className="flex max-h-[80vh] flex-col gap-8 overflow-y-auto px-3 py-5 sm:px-8">
                <div className="space-y-8">{children}</div>
                {footer && <div className="border-t border-border/40 pt-6">{footer}</div>}
            </div>
        </Modal>
    );
}

export default ModalSheet;
