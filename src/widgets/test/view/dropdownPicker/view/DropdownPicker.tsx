import { Typography } from 'shared/ui';
import { ChevronDown } from 'lucide-react';
import styles from './DropdownPicker.module.scss';
import type { DropdownPickerProps } from '../types/IDropdown';

export const DropdownPicker = ({
    id,
    title,
    subtitle,
    icon,
    actionValue,
    options,
    isOpen,
    onToggle,
    onOptionSelect,
}: DropdownPickerProps) => {
    return (
        <div className={styles.pickerContainer}>
            <div className={styles.textArea}>
                <div className={styles.title}>
                    {icon} <Typography variant="h3">{title}</Typography>
                </div>
                <div className={styles.subtitle}>
                    <Typography variant="small">{subtitle}</Typography>
                </div>
            </div>
            <div className={styles.dropdownWrapper}>
                <div
                    className={`${styles.toggle} ${isOpen ? styles.active : ''}`}
                    onClick={() => onToggle(id)}
                >
                    <p>{actionValue}</p>
                    <ChevronDown
                        className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
                        size={20}
                    />
                </div>
                <div
                    className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => onOptionSelect(id, option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
