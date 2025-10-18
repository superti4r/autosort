import * as React from 'react';
import { cn } from '../../lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => (
    <input
        type={type}
        className={cn(
            'flex h-12 w-full rounded-full border border-border/60 bg-card/80 px-5 text-sm text-foreground shadow-[inset_0_1px_0_theme(colors.white/25),0_18px_40px_-32px_theme(colors.primary/40)] outline-none transition duration-300 ease-out focus:border-primary focus:shadow-[0_18px_55px_-30px_theme(colors.primary/55)] focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 placeholder:text-muted-foreground/70',
            className
        )}
        ref={ref}
        {...props}
    />
));

Input.displayName = 'Input';

export default Input;
