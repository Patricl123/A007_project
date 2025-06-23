import { Button, Typography } from 'shared/ui';
import styles from './QuestionNavigation.module.scss';

interface QuestionNavigationProps {
    onPrev: () => void;
    onNext: () => void;
    onSubmit?: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting?: boolean;
    answeredCount: number;
    totalQuestions: number;
    mode?: 'test' | 'review';
}

export const QuestionNavigation = ({
    onPrev,
    onNext,
    onSubmit,
    isFirst,
    isLast,
    isSubmitting = false,
    answeredCount,
    totalQuestions,
    mode = 'test',
}: QuestionNavigationProps) => {
    return (
        <div className={styles.navigation}>
            <Button onClick={onPrev} disabled={isFirst} variant="outline">
                Назад
            </Button>

            {mode === 'test' && (
                <div className={styles.progress}>
                    <Typography variant="base">
                        {`Отвечено: ${answeredCount} из ${totalQuestions}`}
                    </Typography>
                </div>
            )}

            {mode === 'test' && isLast ? (
                <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                >
                    {isSubmitting ? 'Отправка...' : 'Завершить тест'}
                </Button>
            ) : (
                <Button onClick={onNext} disabled={isLast} variant="outline">
                    Далее
                </Button>
            )}
        </div>
    );
};
