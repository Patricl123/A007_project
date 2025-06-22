import { ChartColumn } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import styles from './AnalysisBlock.module.scss';
import { Button, Typography } from 'shared/ui';
import {
    useUpdateAnalysisMutation,
    useUpdatedAnalysisQuery,
} from '../api/useAnalysisQuery';

export const AnalysisBlock = () => {
    const { mutateAsync: updateAnalysis, isPending } =
        useUpdateAnalysisMutation();
    const { data, refetch, isFetching } = useUpdatedAnalysisQuery();

    const handleUpdate = async () => {
        await updateAnalysis();
        refetch();
    };

    return (
        <div className={styles.wrapper}>
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
                        <ReactMarkdown>{data.adviceText}</ReactMarkdown>
                    </Typography>
                ) : (
                    <Typography variant="base">
                        Пока нет анализа ваших данных
                    </Typography>
                )}
            </div>
            <Button onClick={handleUpdate} disabled={isPending || isFetching}>
                {isPending || isFetching ? 'Обновляется' : 'Обновить'}
            </Button>
        </div>
    );
};
