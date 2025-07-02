import { useInProgressTestsQuery } from '../api/useInProgressTestsQuery';
import { Typography, Card, Container } from 'shared/ui';
import styles from './InProgressTests.module.scss';
import { useNavigate } from 'react-router-dom';
import { Hourglass, Clock, CheckCircle2, Play, Trash2 } from 'lucide-react';
import { useDeleteTestProgressMutation } from '../api/useDeleteTestProgressMutation';

export const InProgressTests = () => {
    const { data: tests, error } = useInProgressTestsQuery();
    const navigate = useNavigate();
    const deleteMutation = useDeleteTestProgressMutation();

    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        testId: string,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        deleteMutation.mutate(testId);
    };

    if (error) {
        console.error('Ошибка в запросе прогресса', error);
        return null;
    }

    if (!tests || tests.length === 0) {
        return null;
    }

    const validTests = tests.filter(
        (progress) => progress.testId && progress.title,
    );

    if (validTests.length === 0) {
        return null;
    }

    const formatTime = (seconds: number) => {
        if (!seconds) return '0 мин';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes > 0) {
            return remainingSeconds > 0
                ? `${minutes} мин ${remainingSeconds} сек`
                : `${minutes} мин`;
        }
        return `${seconds} сек`;
    };

    const getProgressStatus = (progress: number) => {
        if (progress >= 75) return { text: 'Почти готово!', color: '#059669' };
        if (progress >= 50) return { text: 'Половина пути', color: '#d97706' };
        if (progress >= 25) return { text: 'Хорошее начало', color: '#7c3aed' };
        return { text: 'Только начали', color: '#6366f1' };
    };

    return (
        <Container className={styles.wrapper}>
            <div className={styles.header}>
                <Typography variant="h2" color="gradient-blue">
                    Продолжить прохождение
                </Typography>
                <Typography variant="large">
                    У вас есть {validTests.length} незавершенных тестов
                </Typography>
            </div>

            <div className={styles.list}>
                {validTests.map((progress) => {
                    const progressStatus = getProgressStatus(progress.progress);

                    return (
                        <Card
                            onClick={() => navigate(`/test/${progress.testId}`)}
                            className={styles.card}
                            key={progress._id || progress.testId}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.headerLeft}>
                                    <div
                                        className={styles.statusBadge}
                                        style={{
                                            backgroundColor: `${progressStatus.color}15`,
                                            color: progressStatus.color,
                                        }}
                                    >
                                        <CheckCircle2 size={14} />
                                        {progressStatus.text}
                                    </div>
                                </div>
                                <div className={styles.headerRight}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={(e) =>
                                            handleDelete(e, progress.testId)
                                        }
                                        disabled={deleteMutation.isPending}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className={styles.progressPercent}>
                                        {progress.progress}%
                                    </div>
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <Typography
                                    variant="h4"
                                    className={styles.testTitle}
                                >
                                    {progress.title}
                                </Typography>

                                <div className={styles.progressSection}>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: `${progress.progress}%`,
                                                backgroundColor:
                                                    progressStatus.color,
                                            }}
                                        />
                                    </div>
                                    <Typography
                                        variant="small"
                                        className={styles.progressText}
                                    >
                                        Прогресс: {progress.progress}% завершено
                                    </Typography>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.infoRow}>
                                    <div className={styles.infoItem}>
                                        <Hourglass
                                            size={16}
                                            className={styles.icon}
                                        />
                                        <span>
                                            Вопрос{' '}
                                            {progress.currentQuestionIndex + 1}
                                        </span>
                                    </div>

                                    {progress.timeLeft && (
                                        <div className={styles.infoItem}>
                                            <Clock
                                                size={16}
                                                className={styles.icon}
                                            />
                                            <span>
                                                Осталось:{' '}
                                                {formatTime(progress.timeLeft)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.continueButton}>
                                    <Play size={16} />
                                    <span>Продолжить</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </Container>
    );
};
