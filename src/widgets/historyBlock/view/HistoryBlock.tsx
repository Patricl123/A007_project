import { Calculator } from 'lucide-react';
import { Typography } from 'shared/ui';
import styles from './HistoryBlock.module.scss';
import { useHistoryQuery } from '../api/useHistoryQuery';

export const HistoryBlock = () => {
    const { data, isLoading, error } = useHistoryQuery();

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div className={styles.icon}>
                    <Calculator size={30} color="#fafcfc" />
                </div>
                <Typography color="gradient" variant="h3">
                    История тестов
                </Typography>
            </div>
            <div className={styles.history}>
                {isLoading && (
                    <Typography variant="base">Загрузка...</Typography>
                )}
                {error && (
                    <Typography variant="base">Ошибка загрузки</Typography>
                )}
                {data?.length === 0 && (
                    <Typography variant="base">
                        Нет пройденных тестов
                    </Typography>
                )}
                {data?.map((subject) => (
                    <div className={styles.item}>
                        <div className={styles.left}>
                            <Typography variant="h4">
                                {subject.subject.name}
                            </Typography>
                            <Typography variant="small">
                                Уровень: {subject.level}
                            </Typography>
                            <Typography variant="small" className={styles.date}>
                                {subject.date}
                            </Typography>
                        </div>
                        <div className={styles.right}>
                            <Typography
                                variant="h3"
                                className={styles.percentage}
                            >
                                {subject.resultPercent}%
                            </Typography>
                            <Typography variant="small">
                                {subject.correct}/{subject.total}
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
