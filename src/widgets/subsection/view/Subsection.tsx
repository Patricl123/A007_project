import type { FC } from 'react';
import type { ISub, ISubsection } from '../types/ISubsection';
import { Button, Container, Loader, Typography } from 'shared/ui';
import { useSubjectSubsectionsQuery } from '../api/useSubsectionQuery';
import { useNavigate } from 'react-router-dom';
import styles from './Subsection.module.scss';
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react';

interface Props {
    subjectId: string | null;
    onSubsectionClick?: (subsection: ISubsection['subjection'][0]) => void;
}

export const SubjectSubsectionsBlock: FC<Props> = ({
    subjectId,
    onSubsectionClick,
}) => {
    const { data, isLoading } = useSubjectSubsectionsQuery(subjectId);
    const navigate = useNavigate();

    if (!subjectId) return null;
    if (isLoading) return <Loader />;
    if (!data || !data.subjection || data.subjection.length === 0) {
        return (
            <Typography variant="small" color="secondary">
                Нет подразделов для этого предмета
            </Typography>
        );
    }

    return (
        <Container>
            <div className={styles.subsection}>
                <div className={styles.backLink} onClick={() => navigate(-1)}>
                    <ArrowLeft className={styles.linkArrow} />
                    <Typography variant="large" className={styles.link}>
                        Назад к предметам
                    </Typography>
                </div>

                <div className={styles.textContent}>
                    <Typography variant="h2" className={styles.h2}>
                        {data.name}
                    </Typography>
                </div>

                <div className={styles.subsectionList}>
                    {data.subjection.map((s: ISub) => (
                        <div
                            key={s._id}
                            onClick={() => onSubsectionClick?.(s)}
                            className={styles.subsectionCard}
                        >
                            <div className={styles.title}>
                                <Brain color="#9233ea" />
                                <Typography variant="h3">{s.name}</Typography>
                            </div>

                            <Button
                                size="default"
                                className={styles.btn}
                                onClick={() => navigate(`/topics/${s._id}`)}
                            >
                                <Typography variant="small" color="white">
                                    Изучить с ИИ
                                </Typography>
                                <ArrowRight size={18} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};
