import { Typography } from 'shared/ui';
import styles from './QuestionOption.module.scss';
import type { QuestionOptionProps } from '../types/IAnswerManagement';

export const QuestionOption = ({
    option,
    isSelected,
    onSelect,
    disabled = false,
    showStatus = false,
    isCorrectAnswer = false,
}: QuestionOptionProps) => {
    let optionClass = styles.option;

    if (showStatus) {
        if (isSelected && isCorrectAnswer) {
            optionClass += ` ${styles.correct}`;
        } else if (isSelected && !isCorrectAnswer) {
            optionClass += ` ${styles.incorrect}`;
        } else if (isCorrectAnswer && !isSelected) {
            optionClass += ` ${styles.correctAnswer}`;
        }
    } else if (isSelected) {
        optionClass += ` ${styles.selected}`;
    }

    if (disabled) {
        optionClass += ` ${styles.disabled}`;
    }

    return (
        <li className={optionClass} onClick={!disabled ? onSelect : undefined}>
            <div className={styles.optionContent}>
                <span className={styles.optionLetter}>{option.optionId}</span>
                <Typography variant="base">{option.text}</Typography>
                {showStatus && (
                    <>
                        {isSelected && isCorrectAnswer && (
                            <span className={styles.statusIcon}>✓</span>
                        )}
                        {isSelected && !isCorrectAnswer && (
                            <span className={styles.statusIcon}>✗</span>
                        )}
                        {isCorrectAnswer && !isSelected && (
                            <span className={styles.statusIcon}>✓</span>
                        )}
                    </>
                )}
            </div>
        </li>
    );
};
