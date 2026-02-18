import type { ReactNode } from 'react';

export interface DropdownPickerProps {
    id: string;
    title: string;
    subtitle: string;
    icon: ReactNode;
    actionValue: string;
    options: string[];
    isOpen: boolean;
    onToggle: (id: string) => void;
    onOptionSelect: (id: string, option: string) => void;
}
