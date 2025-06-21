import { Typography } from 'shared/ui';
import styles from './TestTimer.module.scss';

interface TestTimerProps {
    time: string;
    isLowTime: boolean;
}

export const TestTimer = ({ time, isLowTime }: TestTimerProps) => {
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
