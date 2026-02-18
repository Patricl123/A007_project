import { type FC, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Dropdown.module.scss';
import type { DropdownProps, DropdownOption } from '../types/IDropdown';
import { ChevronDown, Check } from 'lucide-react';

export const Dropdown: FC<DropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Выберите...',
    className = '',
    disabled = false,
    isOpen: controlledIsOpen,
    onOpenChange,
}) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

    const ref = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    const setIsOpen = useCallback(
        (newOpen: boolean) => {
            if (onOpenChange) {
                onOpenChange(newOpen);
            }
            if (!isControlled) {
                setUncontrolledIsOpen(newOpen);
            }
        },
        [isControlled, onOpenChange],
    );

    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen, setIsOpen]);

    const handleSelect = (opt: DropdownOption) => {
        if (opt.disabled) return;
        onChange?.(opt.value);
        setIsOpen(false);
    };

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div
            className={[styles.dropdown, className].filter(Boolean).join(' ')}
            ref={ref}
        >
            <div
                className={`${styles.toggle} ${isOpen ? styles.active : ''}`}
                onClick={handleToggle}
                onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                tabIndex={disabled ? -1 : 0}
            >
                <span className={styles.toggleContent}>
                    {selectedOption ? (
                        selectedOption.label
                    ) : (
                        <span className={styles.placeholder}>
                            {placeholder}
                        </span>
                    )}
                </span>
                <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${
                        isOpen ? styles.rotated : ''
                    }`}
                />
            </div>
            <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
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
                        onKeyDown={(e) =>
                            e.key === 'Enter' && handleSelect(opt)
                        }
                        role="option"
                        aria-selected={value === opt.value}
                        tabIndex={0}
                    >
                        <span>{opt.label}</span>
                        {value === opt.value && (
                            <Check size={16} className={styles.checkIcon} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
