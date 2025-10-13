import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
    <textarea
        ref={ref}
        className={cn(
            'flex min-h-[120px] w-full rounded-[1.5rem] border border-border/70 bg-background/95 px-5 py-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 placeholder:text-muted-foreground/70',
            className
        )}
        {...props}
    />
));

Textarea.displayName = 'Textarea';

export default Textarea;
