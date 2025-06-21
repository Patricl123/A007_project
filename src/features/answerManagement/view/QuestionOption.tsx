import { Typography } from 'shared/ui';
import styles from './QuestionOption.module.scss';

interface QuestionOptionProps {
    option: {
        optionId: string;
        text: string;
    };
    isSelected: boolean;
    onSelect: () => void;
}

export const QuestionOption = ({
    option,
    isSelected,
    onSelect,
}: QuestionOptionProps) => {
    return (
        <li
            className={`${styles.option} ${isSelected ? styles.selected : ''}`}
            onClick={onSelect}
        >
            <span className={styles.optionLetter}>{option.optionId}</span>
            <Typography variant="base">{option.text}</Typography>
        </li>
    );
};
