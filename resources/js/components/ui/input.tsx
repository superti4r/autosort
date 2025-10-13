import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => (
    <input
        type={type}
        className={cn(
            'flex h-12 w-full rounded-[1.5rem] border border-border/70 bg-background/95 px-5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 placeholder:text-muted-foreground/70',
            className
        )}
        ref={ref}
        {...props}
    />
));

Input.displayName = 'Input';

export default Input;
