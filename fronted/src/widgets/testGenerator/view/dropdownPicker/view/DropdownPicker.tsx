import { Dropdown, Typography } from 'shared/ui';
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
    const dropdownOptions = options.map((option) => ({
        value: option,
        label: option,
    }));

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
                <Dropdown
                    isOpen={isOpen}
                    onOpenChange={() => onToggle(id)}
                    value={actionValue}
                    onChange={(newValue: string) =>
                        onOptionSelect(id, newValue)
                    }
                    options={dropdownOptions}
                    placeholder={actionValue}
                />
            </div>
        </div>
    );
};
