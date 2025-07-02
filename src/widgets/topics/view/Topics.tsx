import { useState, type FC } from 'react';
import { Button, Container, Loader, Typography } from 'shared/ui';
import { useTopicsQuery } from '../api/useTopicsQuery';
import styles from './Topics.module.scss';
import { Lightbulb, Send } from 'lucide-react';

interface Props {
    topicId: string | null;
}

export const Topics: FC<Props> = ({ topicId }) => {
    const { data, isLoading } = useTopicsQuery(topicId);
    const [openedId, setOpenedId] = useState<string | null>(null);
    if (!data) return null;
    if (isLoading) return <Loader />;
    if (!data || data.length === 0)
        return <Typography variant="large">No data</Typography>;

    return (
        <section className={styles.topicSection}>
            <Container>
                <div className={styles.topicList}>
                    {data.map((t) => (
                        <div key={t._id} className={styles.topicCard}>
                            <div className={styles.text}>
                                <Lightbulb size={18} color=" #fbbf24" />
                                <Typography variant="h3">{t.name}</Typography>
                            </div>

                            <Button
                                size="default"
                                onClick={() =>
                                    setOpenedId(
                                        openedId === t._id ? null : t._id,
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
