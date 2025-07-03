import { ChartColumn } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import styles from './AnalysisBlock.module.scss';
import { Container, Loader, Typography } from 'shared/ui';
import { useAnalysisQuery } from '../api/useAnalysisQuery';

export const AnalysisBlock = () => {
    const { data, error, isLoading } = useAnalysisQuery();
    if (error) return <div>failed with error: {error.message}</div>;
    if (isLoading) return <Loader />;

    return (
        <Container className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <ChartColumn color="#fafcfc" size={30} />
                    </div>
                    <Typography color="gradient" variant="h3">
                        ИИ Анализ ваших результатов
                    </Typography>
                </div>
                <Typography variant="small">
                    Искусственный интеллект проанализировал ваши результаты
                    тестов
                </Typography>
            </div>
            <div className={styles.textBlock}>
                {data ? (
                    <Typography variant="base">
                        <ReactMarkdown skipHtml>
                            {data.adviceText}
                        </ReactMarkdown>
                    </Typography>
                ) : (
                    <Typography variant="base">
                        Пока нет анализа ваших данных
                    </Typography>
                )}
            </div>
        </Container>
    );
};
