import type { ReactNode, HTMLAttributes } from 'react';

export type DropdownVariant = 'default' | 'outline' | 'ghost';
export type DropdownSize = 'default' | 'sm' | 'lg';

export interface DropdownOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}

export interface DropdownProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    options: DropdownOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    variant?: DropdownVariant;
    size?: DropdownSize;
    className?: string;
    disabled?: boolean;
}
