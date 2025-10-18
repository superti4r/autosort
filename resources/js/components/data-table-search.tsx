import { RotateCcw, Search } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface DataTableSearchProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (value: string) => void;
    onReset?: () => void;
    placeholder?: string;
    autoSubmit?: boolean;
}

export function DataTableSearch({ value, onChange, onSubmit, onReset, placeholder = 'Cari..', autoSubmit = true }: DataTableSearchProps) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(value.trim());
    };

    const handleChange = (nextValue: string) => {
        onChange(nextValue);
        if (autoSubmit) {
            onSubmit(nextValue.trim());
        }
    };

    const handleReset = () => {
        onReset?.();
        if (!onReset) {
            onSubmit('');
        }
    };

    const showReset = Boolean(onReset) && value.trim().length > 0;

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <form onSubmit={handleSubmit} className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    value={value}
                    onChange={(event) => handleChange(event.target.value)}
                    placeholder={placeholder}
                    className="h-11 w-full rounded-full border border-border/60 bg-card/80 pr-4 pl-11 text-sm"
                    aria-label={placeholder}
                />
            </form>

            {showReset && (
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                    <RotateCcw className="mr-1.5 size-4" />
                    Reset
                </Button>
            )}
        </div>
    );
}

export default DataTableSearch;
