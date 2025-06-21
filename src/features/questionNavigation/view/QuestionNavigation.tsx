import { Button, Typography } from 'shared/ui';
import styles from './QuestionNavigation.module.scss';

interface QuestionNavigationProps {
    onPrev: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting: boolean;
    answeredCount: number;
    totalQuestions: number;
}

export const QuestionNavigation = ({
    onPrev,
    onNext,
    onSubmit,
    isFirst,
    isLast,
    isSubmitting,
    answeredCount,
    totalQuestions,
}: QuestionNavigationProps) => {
    return (
        <div className={styles.navigation}>
            <Button onClick={onPrev} disabled={isFirst}>
                Назад
            </Button>

            <Typography variant="base" className={styles.progress}>
                Отвечено: {answeredCount} из {totalQuestions}
            </Typography>

            {isLast ? (
                <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                >
                    {isSubmitting ? 'Отправка...' : 'Завершить тест'}
                </Button>
            ) : (
                <Button onClick={onNext}>Далее</Button>
            )}
        </div>
    );
};
