import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, Typography, Card, Container, Button } from 'shared/ui';
import styles from './TestPlayer.module.scss';

import { TestStatus, useTestTimer } from 'features/testStatus';
import { useTestSubmission } from 'features/testSubmission';
import { testProgressApi } from 'features/testProgress';

import { TestResultsModal } from 'features/testResults';
import { cleanQuestionText } from 'shared/helpers/helper';
import { useSingleTestQuery } from 'entities/test/api/useSingleTestQuery';
import { useTestAnswersQuery } from 'entities/test/api/useTestAnswersQuery';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import type { ITestResult } from 'entities/test/types/testResult';
import type { ITestAnswersResult } from 'entities/test/api/useTestAnswersQuery';
import { QuestionOption, useAnswerManagement } from 'features/answerManagement';
import {
    QuestionNavigation,
    useQuestionNavigation,
} from 'features/testNavigation';
import type { ITestPlayerProps, ITestProgress } from '../types/ITestPlayer';

export const TestPlayer = ({ mode = 'test' }: ITestPlayerProps) => {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const isAuth = useAuthStore((state) => state.isAuth);

    const [progressData, setProgressData] = useState<ITestProgress | null>(
        null,
    );
    const [isProgressLoaded, setIsProgressLoaded] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [testResults, setTestResults] = useState<ITestResult | null>(null);
    const [testAnswers, setTestAnswers] = useState<ITestAnswersResult | null>(
        null,
    );

    const { data: testData, isLoading, error } = useSingleTestQuery(testId);
    const { data: answersData } = useTestAnswersQuery(
        mode === 'review' ? testId : undefined,
    );

    const answerManagement = useAnswerManagement();

    const submission = useTestSubmission(testId, answerManagement.answers, {
        onSuccess: (results: ITestResult) => {
            setTestResults(results);
            setShowResults(true);
        },
    });

    const timer = useTestTimer(
        testData?.timeLimit || 0,
        mode === 'test' ? () => submission.submit() : () => {},
    );

    const navigation = useQuestionNavigation(testData?.questions.length || 0);

    useEffect(() => {
        if (answersData) {
            setTestAnswers(answersData);
        }
    }, [answersData]);

    useEffect(() => {
        if (mode !== 'test' || !isAuth || !testId) {
            setIsProgressLoaded(true);
            return;
        }

        const fetchProgress = async () => {
            try {
                const { data } = await testProgressApi.get(testId);
                setProgressData(data);
            } finally {
                setIsProgressLoaded(true);
            }
        };
        fetchProgress();
    }, [isAuth, testId, mode]);

    useEffect(() => {
        if (!isProgressLoaded || !testData) {
            return;
        }

        if (mode === 'test' && progressData) {
            const answersObject = (progressData.answers || []).reduce(
                (acc: Record<string, string>, answer) => {
                    acc[answer.questionId] = answer.selectedOptionId;
                    return acc;
                },
                {},
            );
            answerManagement.setAnswers(answersObject);
            const indexToSet = progressData.currentQuestionIndex ?? 0;
            navigation.setCurrentIndex(indexToSet);
            if (progressData.timeLeft) timer.setTimeLeft(progressData.timeLeft);
        } else {
            navigation.setCurrentIndex(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProgressLoaded, testData, progressData, mode]);

    const progressStateRef = useRef({
        answers: answerManagement.answers,
        currentIndex: navigation.currentIndex,
        timeLeft: timer.timeLeft,
    });

    useEffect(() => {
        progressStateRef.current = {
            answers: answerManagement.answers,
            currentIndex: navigation.currentIndex,
            timeLeft: timer.timeLeft,
        };
    }, [answerManagement.answers, navigation.currentIndex, timer.timeLeft]);

    const saveProgress = useCallback(async () => {
        if (
            mode !== 'test' ||
            !isProgressLoaded ||
            !isAuth ||
            !testId ||
            !testData ||
            submission.isSubmitting
        )
            return;

        const { answers, currentIndex, timeLeft } = progressStateRef.current;
        if (currentIndex === null) return;
        if (Object.keys(answers).length === 0 && currentIndex === 0) return;

        try {
            const formattedAnswers = Object.entries(answers).map(
                ([questionId, selectedOptionId]) => ({
                    questionId,
                    selectedOptionId: selectedOptionId as string,
                }),
            );
            await testProgressApi.save({
                testId,
                answers: formattedAnswers,
                currentQuestionIndex: currentIndex,
                timeLeft: timeLeft ?? 0,
            });
        } catch (err) {
            console.error('Не получилось сохранить прогресс', err);
        }
    }, [
        mode,
        isProgressLoaded,
        isAuth,
        testId,
        testData,
        submission.isSubmitting,
    ]);

    useEffect(() => {
        if (mode !== 'test') return;

        const handleBeforeUnload = () => {
            saveProgress();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            saveProgress();
        };
    }, [saveProgress, mode]);

    const handleNext = async () => {
        if (mode === 'test') {
            await saveProgress();
        }
        navigation.goNext();
    };

    const handleViewDetails = () => {
        setShowResults(false);
        navigate(`/test/${testId}/review`);
    };

    const handleCloseResults = () => {
        setShowResults(false);
        navigate('/profile');
    };

    const handleBackToProfile = () => {
        navigate('/profile');
    };

    if (isLoading || !isProgressLoaded || navigation.currentIndex === null) {
        return <Loader />;
    }

    if (error || !testData) {
        return <Container>Тест не найден или произошла ошибка.</Container>;
    }

    if (mode === 'review' && !testAnswers) {
        return (
            <Container>
                <div className={styles.header}>
                    <Typography variant="h2">{testData.title}</Typography>
                </div>
                <Card className={styles.card}>
                    <Typography variant="h3" className={styles.noDataMessage}>
                        Данные результатов теста недоступны
                    </Typography>
                    <Typography
                        variant="base"
                        className={styles.noDataDescription}
                    >
                        Для просмотра результатов необходимо завершить тест и
                        получить данные от сервера.
                    </Typography>
                    <div className={styles.actions}>
                        <Button onClick={handleBackToProfile} variant="default">
                            Вернуться в профиль
                        </Button>
                    </div>
                </Card>
            </Container>
        );
    }

    const currentQuestion = testData.questions[navigation.currentIndex];
    const currentAnswer = testAnswers?.answers.find(
        (answer) => answer.questionId === currentQuestion.questionId,
    );

    const correctAnswers =
        testAnswers?.answers.filter((answer) => answer.isCorrect).length || 0;
    const resultPercent = testAnswers
        ? Math.round((correctAnswers / testAnswers.totalQuestions) * 100)
        : 0;

    return (
        <Container>
            <div className={styles.header}>
                <Typography variant="h2">
                    {mode === 'review' ? testAnswers?.title : testData.title}
                </Typography>

                {mode === 'test' && timer.formattedTime && (
                    <TestStatus
                        time={timer.formattedTime}
                        isLowTime={
                            timer.timeLeft !== null && timer.timeLeft < 300
                        }
                        mode="timer"
                    />
                )}

                {mode === 'review' && (
                    <TestStatus
                        mode="result"
                        correctAnswers={correctAnswers}
                        totalQuestions={testAnswers?.totalQuestions}
                        resultPercent={resultPercent}
                        time=""
                        isLowTime={false}
                    />
                )}
            </div>

            <Typography
                variant="h4"
                className={styles.questionProgress}
                data-progress={Math.round(
                    ((navigation.currentIndex + 1) /
                        testData.questions.length) *
                        100,
                )}
            >
                Вопрос {navigation.currentIndex + 1} из{' '}
                {testData.questions.length}
            </Typography>

            <Card className={styles.card}>
                <Typography variant="h3" className={styles.questionText}>
                    {cleanQuestionText(currentQuestion.text)}
                </Typography>

                <ul className={styles.options}>
                    {currentQuestion.options.map((option) => {
                        const isSelected =
                            mode === 'test'
                                ? answerManagement.getAnswer(
                                      currentQuestion.questionId,
                                  ) === option.optionId
                                : currentAnswer?.selectedOptionId ===
                                  option.optionId;

                        const isCorrectAnswer =
                            mode === 'review'
                                ? currentAnswer?.correctOptionId ===
                                  option.optionId
                                : false;

                        return (
                            <QuestionOption
                                key={option.optionId}
                                option={option}
                                isSelected={isSelected}
                                onSelect={
                                    mode === 'test'
                                        ? () =>
                                              answerManagement.selectAnswer(
                                                  currentQuestion.questionId,
                                                  option.optionId,
                                              )
                                        : undefined
                                }
                                disabled={mode === 'review'}
                                showStatus={mode === 'review'}
                                isCorrectAnswer={isCorrectAnswer}
                            />
                        );
                    })}
                </ul>

                {mode === 'review' && currentAnswer?.explanation && (
                    <div className={styles.explanation}>
                        <Typography
                            variant="h4"
                            className={styles.explanationTitle}
                        >
                            Объяснение:
                        </Typography>
                        <Typography
                            variant="base"
                            className={styles.explanationText}
                        >
                            {currentAnswer.explanation}
                        </Typography>
                    </div>
                )}
            </Card>

            <QuestionNavigation
                onPrev={navigation.goPrev}
                onNext={handleNext}
                isFirst={navigation.isFirst}
                isLast={navigation.isLast}
                onSubmit={mode === 'test' ? submission.submit : undefined}
                isSubmitting={submission.isSubmitting}
                answeredCount={Object.keys(answerManagement.answers).length}
                totalQuestions={testData.questions.length}
                mode={mode}
            />

            {mode === 'test' && testResults && (
                <TestResultsModal
                    isOpen={showResults}
                    onClose={handleCloseResults}
                    results={testResults}
                    testTitle={testData.title}
                    onViewDetails={handleViewDetails}
                />
            )}

            {mode === 'review' && (
                <div className={styles.actions}>
                    <Button onClick={handleBackToProfile} variant="default">
                        Вернуться в профиль
                    </Button>
                </div>
            )}
        </Container>
    );
};
