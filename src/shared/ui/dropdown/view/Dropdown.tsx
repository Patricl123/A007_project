import { type FC, useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';
import type { DropdownProps, DropdownOption } from '../types/IDropdown';
import { Button } from 'shared/ui/button/view/Button';
import { ChevronDown } from 'lucide-react';

export const Dropdown: FC<DropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Выберите...',
    variant = 'default',
    size = 'default',
    className = '',
    disabled = false,
    ...rest
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = options.find((opt) => opt.value === value);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    const handleSelect = (opt: DropdownOption) => {
        if (opt.disabled) return;
        onChange?.(opt.value);
        setOpen(false);
    };

    return (
        <div
            className={[styles.dropdown, styles[size], className]
                .filter(Boolean)
                .join(' ')}
            ref={ref}
            {...rest}
        >
            <Button
                variant={variant}
                size={size}
                className={styles.control}
                onClick={() => !disabled && setOpen((v) => !v)}
                disabled={disabled}
            >
                {selected ? (
                    selected.label
                ) : (
                    <span className={styles.placeholder}>{placeholder}</span>
                )}
                <ChevronDown size={20} style={{ marginLeft: 8 }} />
            </Button>
            {open && (
                <div className={styles.menu}>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={[
                                styles.option,
                                value === opt.value && styles.selected,
                                opt.disabled && styles.disabled,
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
