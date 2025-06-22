import { Typography } from 'shared/ui';
import { ChevronDown, Check } from 'lucide-react';
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
        <div
            className={`${styles.pickerContainer} ${
                isOpen ? styles.containerOpen : ''
            }`}
        >
            <div className={styles.textArea}>
                <div className={styles.title}>
                    <div className={styles.iconWrapper}>{icon}</div>
                    <Typography variant="h3">{title}</Typography>
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
                    <div className={styles.toggleContent}>
                        <span className={styles.selectedValue}>
                            {actionValue}
                        </span>
                        <div className={styles.toggleBadge}>
                            {options.length} опций
                        </div>
                    </div>
                    <ChevronDown
                        className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
                        size={20}
                    />
                </div>

                <div
                    className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}
                >
                    <div className={styles.dropdownHeader}>
                        <Typography variant="small">Выберите опцию</Typography>
                    </div>

                    <div className={styles.optionsList}>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`${styles.dropdownItem} ${
                                    option === actionValue
                                        ? styles.selected
                                        : ''
                                }`}
                                onClick={() => onOptionSelect(id, option)}
                            >
                                <span className={styles.optionText}>
                                    {option}
                                </span>
                                {option === actionValue && (
                                    <Check
                                        size={16}
                                        className={styles.checkIcon}
                                    />
                                )}
                                <div className={styles.hoverEffect}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
