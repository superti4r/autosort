import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <label
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer select-none',
        className
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'peer size-5 appearance-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)]',
          'transition-all duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]/40',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)]'
        )}
        {...props}
      />
      <Check
        className={cn(
          'absolute size-3.5 text-[var(--color-primary-foreground)] opacity-0 scale-75 transition-all duration-150 ease-in-out pointer-events-none',
          'peer-checked:opacity-100 peer-checked:scale-100'
        )}
        strokeWidth={2.5}
      />
    </label>
  )
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
