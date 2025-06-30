import { Button, Typography } from 'shared/ui';
import { memo } from 'react';
import styles from './QuestionNavigation.module.scss';
import type { QuestionNavigationProps } from '../types/IQuestionNavigation';

export const QuestionNavigation = memo<QuestionNavigationProps>(
    ({
        onPrev,
        onNext,
        onSubmit,
        isFirst,
        isLast,
        isSubmitting = false,
        answeredCount,
        totalQuestions,
        mode = 'test',
        isNextDisabled,
    }) => {
        const submitButtonText = isSubmitting
            ? 'Отправка...'
            : 'Завершить тест';

        const renderNextButton = () => (
            <Button
                onClick={onNext}
                disabled={isLast || isNextDisabled}
                variant="outline"
            >
                {isNextDisabled && <span className={styles.nextSpinner} />}
                Далее
            </Button>
        );

        const renderSubmitButton = () => (
            <Button
                onClick={onSubmit}
                disabled={isSubmitting}
                className={styles.submitBtn}
                aria-label={isSubmitting ? 'Отправка теста' : 'Завершить тест'}
            >
                {submitButtonText}
            </Button>
        );

        return (
            <nav
                className={styles.navigation}
                role="navigation"
                aria-label="Навигация по вопросам"
            >
                <Button
                    onClick={onPrev}
                    disabled={isFirst}
                    variant="outline"
                    aria-label="Предыдущий вопрос"
                >
                    Назад
                </Button>

                {mode === 'test' && (
                    <div
                        className={styles.progress}
                        role="status"
                        aria-live="polite"
                    >
                        <Typography variant="base">
                            {`Отвечено: ${answeredCount} из ${totalQuestions}`}
                        </Typography>
                    </div>
                )}

                {mode === 'test' && isLast
                    ? renderSubmitButton()
                    : renderNextButton()}
            </nav>
        );
    },
);
