import { Button, Container, Typography } from 'shared/ui';
import styles from './TestAll.module.scss';
import { useAllTestQuery } from 'widgets/testGenerator/api/useTestQuery';
import {
    Calculator,
    BookOpen,
    BrainCircuit,
    FlaskConical,
    LayoutDashboard,
    PenTool,
    Clock,
    HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const icons = [
    Calculator,
    BookOpen,
    BrainCircuit,
    FlaskConical,
    LayoutDashboard,
    PenTool,
];

export const TestAll = () => {
    const { data: tests } = useAllTestQuery();

    return (
        <Container>
            <div className={styles.testAll}>
                <div className={styles.textPart}>
                    <Typography variant="h2" color="gradient">
                        Доступные тесты
                    </Typography>
                    <Typography variant="h4">
                        Выберите тест для проверки своих знаний
                    </Typography>
                </div>

                <div className={styles.testList}>
                    {Array.isArray(tests) &&
                        tests.map((test, index) => {
                            const Icon = icons[index % icons.length];
                            return (
                                <Link
                                    to={`/test/${test.testId}`}
                                    key={test.testId}
                                    className={styles.itemLink}
                                >
                                    <div className={styles.testCard}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.icon}>
                                                <Icon
                                                    color="#FFFFFF"
                                                    className={
                                                        styles.iconCalculator
                                                    }
                                                />
                                            </div>
                                            <Typography
                                                variant="large"
                                                className={styles.cardTitle}
                                            >
                                                {test.title}
                                            </Typography>
                                        </div>

                                        <div className={styles.cardInfo}>
                                            <div className={styles.infoItem}>
                                                <HelpCircle size={18} />
                                                <span>
                                                    Сложность: {test.difficulty}
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <HelpCircle size={18} />
                                                <span>
                                                    Вопросов:{' '}
                                                    {test.questionCount}
                                                </span>
                                            </div>
                                            <div className={styles.infoItem}>
                                                <Clock size={18} />
                                                <span>
                                                    Время: {test.timeLimit / 60}{' '}
                                                    мин.
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.cardFooter}>
                                            <Button variant="default">
                                                <Typography
                                                    variant="small"
                                                    color="white"
                                                >
                                                    Начать тест
                                                </Typography>
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </Container>
    );
};
