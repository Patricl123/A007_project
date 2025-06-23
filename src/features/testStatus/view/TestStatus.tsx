import { Typography } from 'shared/ui';
import styles from './TestStatus.module.scss';
import type { TestStatusProps } from '../types/ITestStatus';

export const TestStatus = ({
    time,
    isLowTime,
    mode = 'timer',
    correctAnswers = 0,
    totalQuestions = 0,
    resultPercent = 0,
}: TestStatusProps) => {
    if (mode === 'result') {
        return (
            <div className={styles.resultContainer}>
                <div className={styles.resultCard}>
                    <div className={styles.resultHeader}>
                        <div className={styles.resultIcon}>
                            {resultPercent >= 80
                                ? '🎉'
                                : resultPercent >= 60
                                  ? '👍'
                                  : '📚'}
                        </div>
                        <Typography variant="h4" className={styles.resultTitle}>
                            Результат теста
                        </Typography>
                    </div>

                    <div className={styles.resultStats}>
                        <div className={styles.scoreDisplay}>
                            <span className={styles.scoreNumber}>
                                {correctAnswers}
                            </span>
                            <span className={styles.scoreDivider}>из</span>
                            <span className={styles.totalNumber}>
                                {totalQuestions}
                            </span>
                        </div>

                        <div className={styles.percentageContainer}>
                            <div className={styles.percentageBar}>
                                <div
                                    className={styles.percentageFill}
                                    style={{ width: `${resultPercent}%` }}
                                />
                            </div>
                            <Typography
                                variant="base"
                                className={styles.percentageText}
                            >
                                {resultPercent}%
                            </Typography>
                        </div>
                    </div>

                    <div className={styles.resultMessage}>
                        <Typography
                            variant="small"
                            className={styles.messageText}
                        >
                            {resultPercent >= 80
                                ? 'Отличный результат!'
                                : resultPercent >= 60
                                  ? 'Хороший результат!'
                                  : 'Есть над чем поработать'}
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${styles.timerContainer} ${isLowTime ? styles.lowTimeContainer : ''}`}
        >
            <div className={styles.timerIcon}>⏱️</div>
            <Typography
                variant="h3"
                className={`${styles.timer} ${isLowTime ? styles.lowTime : ''}`}
            >
                {time}
            </Typography>
            <div className={styles.timerLabel}>
                {isLowTime ? 'Мало времени!' : 'Осталось времени'}
            </div>
        </div>
    );
};
