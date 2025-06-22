import type { FC } from 'react';
import { Button, Container, Typography } from 'shared/ui';
import styles from './Interactive.module.scss';
import { BrainIcon, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Interactive: FC = () => {
    const navigate = useNavigate();
    return (
        <section className={styles.interactiveSection}>
            <Container>
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <Typography variant="h2">
                            Начните изучение наук прямо сейчас
                        </Typography>
                        <Typography
                            variant="large"
                            className={styles.description}
                        >
                            Выберите предмет, получите персонализированные
                            задания и развивайтесь вместе с ИИ-помощником.
                        </Typography>
                        <div className={styles.buttonGroup}>
                            <Button
                                variant="default"
                                size="lg"
                                onClick={() => navigate('/test')}
                            >
                                <Calculator />
                                Проверить знания
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/ask')}
                            >
                                <BrainIcon />
                                Задать вопрос ИИ
                            </Button>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.iconBook}>📚</div>
                        <Typography variant="h3" className={styles.bookTitle}>
                            Интерактивное обучение
                        </Typography>
                        <Typography variant="large">
                            Изучайте различные науки в интерактивном формате с
                            мгновенной обратной связью
                        </Typography>
                    </div>
                </div>
            </Container>
        </section>
    );
};
