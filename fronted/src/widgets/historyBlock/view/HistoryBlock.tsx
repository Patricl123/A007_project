import { Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Container, Loader, Typography } from 'shared/ui';
import styles from './HistoryBlock.module.scss';
import { useHistoryQuery } from '../api/useHistoryQuery';
import { useHistoryTestQuery } from '../api/useHistoryTestQuery';
import type { IHistoryTestResult } from '../types/types';
import { TestResultsModal } from 'features/testResults';

export const HistoryBlock = () => {
    const { data, isLoading, error } = useHistoryQuery();
    const navigate = useNavigate();
    const [selectedTestId, setSelectedTestId] = useState<string | undefined>(
        undefined,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: selectedTestData, isLoading: isTestDataLoading } =
        useHistoryTestQuery(selectedTestId);

    const handleTestClick = (testId: string) => {
        setSelectedTestId(testId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTestId(undefined);
    };

    const handleViewDetails = () => {
        setIsModalOpen(false);
        if (selectedTestId && selectedTestData?.testId) {
            navigate(
                `/test-history/${selectedTestId}/${selectedTestData.testId}`,
            );
        } else if (selectedTestId) {
            navigate(`/test-history/${selectedTestId}/${selectedTestId}`);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <Container className={styles.wrapper}>
                <div className={styles.title}>
                    <div className={styles.icon}>
                        <Calculator size={30} color="#fafcfc" />
                    </div>
                    <Typography color="gradient" variant="h3">
                        История тестов
                    </Typography>
                </div>
                <div className={styles.history}>
                    {isLoading && (
                        <Typography variant="base">Загрузка...</Typography>
                    )}
                    {error && (
                        <Typography variant="base">Ошибка загрузки</Typography>
                    )}
                    {data?.length === 0 && (
                        <Typography variant="base">
                            Нет пройденных тестов
                        </Typography>
                    )}
                    {data?.map((subject) => (
                        <div
                            key={subject.id}
                            className={styles.item}
                            onClick={() => handleTestClick(subject.id)}
                        >
                            <div className={styles.left}>
                                <Typography variant="h4">
                                    {subject.subject.name}
                                </Typography>
                                <Typography variant="small">
                                    Уровень: {subject.level}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className={styles.date}
                                >
                                    {subject.date}
                                </Typography>
                            </div>
                            <div className={styles.right}>
                                <Typography
                                    variant="h3"
                                    className={styles.percentage}
                                >
                                    {subject.resultPercent}%
                                </Typography>
                                <Typography variant="small">
                                    {subject.correct}/{subject.total}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
            {isModalOpen && (
                <TestResultsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    isLoading={isTestDataLoading}
                    results={selectedTestData ?? ({} as IHistoryTestResult)}
                    testTitle={selectedTestData?.subject?.name || 'Загрузка...'}
                    onViewDetails={handleViewDetails}
                    mode="history"
                />
            )}
        </>
    );
};
