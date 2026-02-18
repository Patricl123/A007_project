import { Modal, Button, Typography } from 'shared/ui';
import type { ITestResult } from 'entities/test/types/testResult';
import type { IHistoryTestResult } from 'widgets/historyBlock/types/types';

import styles from './TestResultsModal.module.scss';
import type { TestResultsModalProps } from '../types/IResult';

const ShimmerBox = ({ className }: { className?: string }) => (
    <div className={`${styles.shimmer} ${className || ''}`} />
);

const ShimmerCircle = () => (
    <div className={styles.shimmerCircle}>
        <div className={styles.shimmerCircleInner} />
    </div>
);

export const TestResultsModal = ({
    isOpen,
    onClose,
    results,
    testTitle,
    onViewDetails,
    mode = 'test',
    isLoading = false,
}: TestResultsModalProps) => {
    const score = results
        ? mode === 'history'
            ? (results as IHistoryTestResult).correct
            : (results as ITestResult).score
        : 0;
    const total = results
        ? mode === 'history'
            ? (results as IHistoryTestResult).total
            : (results as ITestResult).total
        : 1;

    const percentage = Math.round((score / total) * 100);
    const isGoodResult = percentage >= 70;
    const isAverageResult = percentage >= 50 && percentage < 70;

    const getResultMessage = () => {
        if (isGoodResult) {
            return 'Отличный результат!';
        } else if (isAverageResult) {
            return 'Хороший результат!';
        } else {
            return 'Попробуйте еще раз!';
        }
    };

    const getResultColor = () => {
        if (isGoodResult) return '#10b981';
        if (isAverageResult) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Результаты теста">
            <div className={styles.content}>
                <div className={styles.header}>
                    {isLoading ? (
                        <>
                            <ShimmerBox className={styles.shimmerTitle} />
                            <ShimmerBox className={styles.shimmerMessage} />
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h3"
                                className={styles.testTitle}
                            >
                                {testTitle}
                            </Typography>
                            <Typography
                                variant="h4"
                                className={styles.resultMessage}
                            >
                                {getResultMessage()}
                            </Typography>
                        </>
                    )}
                </div>

                <div className={styles.scoreSection}>
                    {isLoading ? (
                        <ShimmerCircle />
                    ) : (
                        <div className={styles.scoreCircle}>
                            <div
                                className={styles.scoreProgress}
                                style={
                                    {
                                        '--progress': `${percentage * 3.6}`,
                                        '--color': getResultColor(),
                                    } as React.CSSProperties
                                }
                            >
                                <div className={styles.scoreText}>
                                    <span className={styles.scoreNumber}>
                                        {score}
                                    </span>
                                    <span className={styles.scoreTotal}>
                                        /{total}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <Typography variant="base" className={styles.statLabel}>
                            Правильных ответов
                        </Typography>
                        {isLoading ? (
                            <ShimmerBox className={styles.shimmerStatValue} />
                        ) : (
                            <Typography
                                variant="h4"
                                className={styles.statValue}
                            >
                                {score}
                            </Typography>
                        )}
                    </div>
                    <div className={styles.statItem}>
                        <Typography variant="base" className={styles.statLabel}>
                            Всего вопросов
                        </Typography>
                        {isLoading ? (
                            <ShimmerBox className={styles.shimmerStatValue} />
                        ) : (
                            <Typography
                                variant="h4"
                                className={styles.statValue}
                            >
                                {total}
                            </Typography>
                        )}
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        onClick={onViewDetails}
                        variant="default"
                        className={styles.viewDetailsBtn}
                        disabled={isLoading}
                    >
                        Просмотреть детали
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className={styles.closeBtn}
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
