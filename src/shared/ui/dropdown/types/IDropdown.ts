import type { ReactNode, HTMLAttributes } from 'react';

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
    className?: string;
    disabled?: boolean;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}
