import { Button, Typography } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import {
    Calculator,
    BookOpen,
    BrainCircuit,
    FlaskConical,
    LayoutDashboard,
    PenTool,
    Clock,
    HelpCircle,
    User,
} from 'lucide-react';
import styles from './TestCard.module.scss';
import type { TestCardProps } from '../types/ITestCard';

const icons = [
    Calculator,
    BookOpen,
    BrainCircuit,
    FlaskConical,
    LayoutDashboard,
    PenTool,
];

export const TestCard = ({
    test,
    index,
    isUserTest = false,
}: TestCardProps) => {
    const Icon = icons[index % icons.length];
    const navigate = useNavigate();
    return (
        <div
            className={styles.testCard}
            onClick={() => navigate(`/test/${test.testId}`)}
        >
            {isUserTest && (
                <div className={styles.userTestBadge}>
                    <User size={16} />
                    <span>Мои тесты</span>
                </div>
            )}

            <div className={styles.cardHeader}>
                <div className={styles.icon}>
                    <Icon color="#FFFFFF" className={styles.iconCalculator} />
                </div>
                <Typography variant="h4" className={styles.cardTitle}>
                    {test.title}
                </Typography>
            </div>

            <div className={styles.cardInfo}>
                <div className={styles.infoItem}>
                    <HelpCircle size={18} />
                    <span>Сложность: {test.difficulty}</span>
                </div>
                <div className={styles.infoItem}>
                    <HelpCircle size={18} />
                    <span>Вопросов: {test.questionCount}</span>
                </div>
                <div className={styles.infoItem}>
                    <Clock size={18} />
                    <span>Время: {test.timeLimit / 60} мин.</span>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <Button variant="default">
                    <Typography variant="small" color="white">
                        Начать тест
                    </Typography>
                </Button>
            </div>
        </div>
    );
};
