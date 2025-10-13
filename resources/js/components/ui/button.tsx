import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-[1.75rem] text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-60',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-[0_18px_42px_-18px_theme(colors.primary/65)] hover:bg-primary/90',
                outline: 'border border-border/70 bg-background/90 text-foreground hover:border-primary/60 hover:bg-primary/10',
                ghost: 'text-foreground hover:bg-primary/10',
            },
            size: {
                default: 'h-12 px-6 gap-2',
                sm: 'h-10 px-5 text-xs',
                lg: 'h-14 px-8 text-base',
                icon: 'h-11 w-11',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;
