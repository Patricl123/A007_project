import { Button } from 'shared/ui';
import styles from './SubmitButton.module.scss';

interface SubmitButtonProps {
    onSubmit: () => void;
    isSubmitting: boolean;
    disabled?: boolean;
    answeredCount: number;
    totalQuestions: number;
}

export const SubmitButton = ({
    onSubmit,
    isSubmitting,
    disabled = false,
    answeredCount,
    totalQuestions,
}: SubmitButtonProps) => {
    const allAnswered = answeredCount === totalQuestions;

    return (
        <div className={styles.submitContainer}>
            {!allAnswered && (
                <div className={styles.warning}>
                    Отвечено на {answeredCount} из {totalQuestions} вопросов
                </div>
            )}

            <Button
                onClick={onSubmit}
                disabled={disabled || isSubmitting}
                className={`${styles.submitBtn} ${!allAnswered ? styles.incomplete : ''}`}
                variant="default"
            >
                {isSubmitting ? 'Отправка...' : 'Завершить тест'}
            </Button>
        </div>
    );
};
