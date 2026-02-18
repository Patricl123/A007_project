import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Loader } from 'shared/ui';
import styles from './Topics.module.scss';
import { useTopicsQuery } from '../api/useTopicsQuery';
import { ArrowLeft, Lightbulb, Send } from 'lucide-react';
import type { ITopics } from '../types/Topics';

interface Props {
    topicId: string | null;
    subjectId: string | null;
}

export const Topics: FC<Props> = ({ topicId }) => {
    const { data, isLoading } = useTopicsQuery(topicId);
    const [openedId, setOpenedId] = useState<string | null>(null);
    const navigate = useNavigate();

    if (isLoading) return <Loader />;
    if (!data) return null;
    if (!data || data.length === 0)
        return <Typography variant="large">No data</Typography>;

    return (
        <section className={styles.topicSection}>
            <Container>
                <div className={styles.backLink} onClick={() => navigate(-1)}>
                    <ArrowLeft className={styles.linkArrow} />
                    <Typography variant="large" className={styles.link}>
                        Назад к подразделам
                    </Typography>
                </div>
                <div className={styles.topicList}>
                    {data.map((t: ITopics) => (
                        <div key={t._id} className={styles.topicCard}>
                            <div className={styles.text}>
                                <Lightbulb size={18} color=" #fbbf24" />
                                <Typography variant="h3">{t.name}</Typography>
                            </div>

                            <Button
                                size="default"
                                onClick={() =>
                                    setOpenedId(
                                        openedId === String(t._id)
                                            ? null
                                            : String(t._id),
                                    )
                                }
                                className={styles.btn}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles.loader} />
                                        Анализирую...
                                    </>
                                ) : (
                                    <>
                                        <Send className={styles.sendIcon} />
                                        Изучить с ИИ
                                    </>
                                )}
                            </Button>
                            {openedId === String(t._id) && t.explanation && (
                                <div className={styles.answerBlock}>
                                    <div className={styles.answerTitle}>
                                        <Lightbulb
                                            className={styles.answerIcon}
                                        />
                                        Ответ ИИ
                                    </div>
                                    <div className={styles.answerContent}>
                                        {t.explanation}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
