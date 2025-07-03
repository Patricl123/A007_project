import { Button, Container, Typography, Loader } from 'shared/ui';
import styles from './SubjectsBlock.module.scss';
import {
    Calculator,
    Globe,
    Beaker,
    Dna,
    Zap,
    BookOpen,
    PenTool,
    BookOpenCheck,
} from 'lucide-react';
import { useSubjectQuery } from '../api/useSubjectStore';
import { useNavigate } from 'react-router-dom';

export const SubjectsBlock = () => {
    const { data: subjects, isLoading } = useSubjectQuery();
    const navigate = useNavigate();
    const getSubjectIcon = (title: string) => {
        const normalizedTitle = title.toLowerCase().trim();

        if (normalizedTitle.includes('математика')) {
            return <Calculator color="white" />;
        } else if (normalizedTitle.includes('английский')) {
            return <Globe color="white" />;
        } else if (normalizedTitle.includes('химия')) {
            return <Beaker color="white" />;
        } else if (normalizedTitle.includes('биология')) {
            return <Dna color="white" />;
        } else if (normalizedTitle.includes('физика')) {
            return <Zap color="white" />;
        } else if (normalizedTitle.includes('история')) {
            return <BookOpen color="white" />;
        } else if (normalizedTitle.includes('кыргызский')) {
            return <PenTool color="white" />;
        } else if (normalizedTitle.includes('русский')) {
            return <BookOpenCheck color="white" />;
        } else {
            return <BookOpen color="white" />;
        }
    };

    if (isLoading || !subjects) return <Loader />;

    return (
        <Container>
            <div className={styles.subjectsBlock}>
                <div className={styles.textPart}>
                    <Typography variant="h2" color="gradient-blue">
                        Выберите предмет для изучения
                    </Typography>
                    <Typography variant="base">
                        Выберите категорию, чтобы начать персонализированное
                        обучение с ИИ-помощником
                    </Typography>
                </div>
                <div className={styles.subjectsList}>
                    {subjects.map((subject, index) => (
                        <div className={styles.subjectCard} key={index}>
                            <div className={styles.icon}>
                                {getSubjectIcon(subject.name)}
                            </div>
                            <div className={styles.cardText}>
                                <Typography variant="h4">
                                    {subject.name}
                                </Typography>
                                <Typography variant="small">
                                    Изучайте математические концепции с помощью
                                    ИИ
                                </Typography>
                            </div>
                            <Button
                                className={styles.cardButton}
                                onClick={() =>
                                    navigate(`/subsections/${subject._id}`)
                                }
                            >
                                <Typography variant="small" color="white">
                                    Выбрать предмет
                                </Typography>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};
