import * as React from 'react';
import { cn } from '../../lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            'flex min-h-[140px] w-full rounded-3xl border border-border/60 bg-card/80 px-5 py-4 text-sm text-foreground shadow-[inset_0_1px_0_theme(colors.white/25),0_18px_40px_-32px_theme(colors.primary/40)] outline-none transition duration-300 ease-out focus:border-primary focus:shadow-[0_18px_55px_-30px_theme(colors.primary/55)] focus:ring-2 focus:ring-primary/35 disabled:cursor-not-allowed disabled:opacity-60 placeholder:text-muted-foreground/70',
            className
        )}
        {...props}
    />
));

Textarea.displayName = 'Textarea';

export default Textarea;
