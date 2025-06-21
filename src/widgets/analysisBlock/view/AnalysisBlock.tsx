import { ChartColumn } from 'lucide-react';
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
                    <ChartColumn color="#9333ea" size={30} />
                    <Typography variant="h3">
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
                    <Typography variant="base">{data.adviceText}</Typography>
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
