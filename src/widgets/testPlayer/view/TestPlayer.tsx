import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader, Typography, Card, Container } from 'shared/ui';
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
import { useHistoryTestQuery } from 'widgets/historyBlock/api/useHistoryTestQuery';

export const TestPlayer = ({
    mode = 'test',
    testId: testIdProp,
    historyId: historyIdProp,
}: ITestPlayerProps) => {
    const params = useParams<{ testId: string; historyId: string }>();
    const testId = testIdProp || params.testId;
    const historyId = historyIdProp || params.historyId;
    const navigate = useNavigate();
    const location = useLocation();
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

    const { data: testData, error } = useSingleTestQuery(testId, {
        enabled: mode !== 'history',
    });

    const { data: answersData } = useTestAnswersQuery(
        mode === 'test' ? testId : undefined,
    );

    const { data: historyData, isLoading: isHistoryLoading } =
        useHistoryTestQuery(mode === 'history' ? historyId : undefined);

    const { data: historyTestData } = useSingleTestQuery(testId, {
        enabled: mode === 'history' && !!testId,
    });

    const answerManagement = useAnswerManagement();

    const submission = useTestSubmission(testId, answerManagement.answers, {
        onSuccess: (results: ITestResult) => {
            setTestResults(results);
            setShowResults(true);

            if (testData) {
                const formattedAnswers = testData.questions.map((question) => {
                    const correctAnswer = results.correctAnswers.find(
                        (ca) => ca.questionId === question.questionId,
                    );
                    const selectedAnswer =
                        answerManagement.answers[question.questionId];

                    return {
                        questionId: question.questionId,
                        questionText: question.text,
                        options: question.options,
                        correctOptionId: correctAnswer?.correctOptionId || '',
                        selectedOptionId: selectedAnswer || '',
                        isCorrect:
                            correctAnswer?.correctOptionId === selectedAnswer,
                        explanation: correctAnswer?.explanation || '',
                    };
                });

                const testAnswersData: ITestAnswersResult = {
                    testId: testId!,
                    title: testData.title,
                    difficulty: '',
                    totalQuestions: testData.questions.length,
                    subject: '',
                    answers: formattedAnswers.map((answer) => ({
                        questionId: answer.questionId,
                        questionText: answer.questionText,
                        options: answer.options.map((option) => ({
                            optionId: option.optionId,
                            text: option.text,
                            _id: option.optionId,
                        })),
                        correctOptionId: answer.correctOptionId,
                        selectedOptionId: answer.selectedOptionId,
                        isCorrect: answer.isCorrect,
                        explanation: answer.explanation,
                    })),
                };

                setTestAnswers(testAnswersData);
            }
        },
    });

    const timer = useTestTimer(
        testData?.timeLimit || 0,
        mode === 'test' ? () => submission.submit() : () => {},
    );

    const questionsCount =
        (mode === 'history' || mode === 'review') && historyData
            ? historyData.answers.length
            : testData?.questions.length || 0;

    const navigation = useQuestionNavigation(questionsCount);

    const [isNextDisabled, setIsNextDisabled] = useState(false);

    useEffect(() => {
        if (answersData) {
            setTestAnswers(answersData);
        }
    }, [answersData]);

    useEffect(() => {
        if (mode === 'review' && location.state?.testAnswers) {
            setTestAnswers(location.state.testAnswers);
        }
    }, [mode, location.state]);

    useEffect(() => {
        if ((mode === 'review' || mode === 'history') && historyData) {
            const transformedData: ITestAnswersResult = {
                testId: historyData.id,
                title: historyData.subject.name,
                difficulty: historyData.level,
                totalQuestions: historyData.total,
                subject: historyData.subject.name,
                answers: historyData.answers.map((answer: any) => ({
                    questionId: answer.questionId,
                    questionText: '',
                    options: [],
                    correctOptionId: answer.correctOptionId,
                    selectedOptionId: answer.selectedOptionId,
                    isCorrect:
                        answer.correctOptionId === answer.selectedOptionId,
                    explanation: answer.explanation,
                })),
            };
            setTestAnswers(transformedData);
        }
    }, [historyData, mode]);

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
            setIsNextDisabled(true);
            await saveProgress();
        }
        navigation.goNext();
    };

    useEffect(() => {
        setIsNextDisabled(false);
    }, [navigation.currentIndex]);

    const handleViewDetails = () => {
        setShowResults(false);
        if (testAnswers) {
            navigate(`/test/${testId}/review`, {
                state: { testAnswers },
            });
        } else {
            navigate(`/test/${testId}/review`);
        }
    };

    const handleCloseResults = () => {
        setShowResults(false);
        navigate('/profile');
    };

    if (
        (mode === 'test' && (!testData || !answersData)) ||
        (mode === 'review' && !testData) ||
        (mode === 'history' &&
            (!historyData || !historyTestData || isHistoryLoading))
    ) {
        return <Loader />;
    }

    if (mode === 'history') {
        if (!historyData || isHistoryLoading) {
            return <Loader />;
        }
    }

    if (mode === 'test' && (error || !testData)) {
        return <Container>Тест не найден или произошла ошибка.</Container>;
    }

    if (navigation.currentIndex === null) {
        return <Loader />;
    }

    let questions: { questionId: string; text: string; options: any[] }[] = [];
    if (mode === 'history' && historyData && historyTestData) {
        questions = historyTestData.questions.map((question) => {
            const historyAnswer = historyData.answers.find(
                (answer: any) => answer.questionId === question.questionId,
            );
            return {
                questionId: question.questionId,
                text: question.text,
                options: question.options,
                historyAnswer,
            };
        });
    } else if (mode === 'review' && testData?.questions) {
        questions = testData.questions;
    } else if (testData?.questions) {
        questions = testData.questions;
    }
    const currentQuestion = questions[navigation.currentIndex];
    const currentAnswer = testAnswers?.answers.find(
        (answer) => answer.questionId === currentQuestion?.questionId,
    );

    const historyAnswer = (mode === 'history' && (currentQuestion as any))
        ?.historyAnswer;

    const correctAnswers =
        testAnswers?.answers.filter((answer) => answer.isCorrect).length || 0;
    const resultPercent = testAnswers
        ? Math.round((correctAnswers / testAnswers.totalQuestions) * 100)
        : 0;

    return (
        <Container>
            <div className={styles.header}>
                <Typography variant="h2">
                    {mode === 'review' || mode === 'history'
                        ? testAnswers?.title || historyData?.subject.name
                        : testData?.title}
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

                {(mode === 'review' || mode === 'history') && (
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
                data-progress={
                    questions.length > 0
                        ? Math.round(
                              ((navigation.currentIndex + 1) /
                                  questions.length) *
                                  100,
                          )
                        : 0
                }
            >
                Вопрос {navigation.currentIndex + 1} из {questions.length}
            </Typography>

            <Card className={styles.card}>
                <Typography variant="h3" className={styles.questionText}>
                    {cleanQuestionText(currentQuestion?.text || '')}
                </Typography>

                <ul className={styles.options}>
                    {(currentQuestion?.options || []).map((option: any) => {
                        const isSelected =
                            mode === 'test'
                                ? answerManagement.getAnswer(
                                      currentQuestion.questionId,
                                  ) === option.optionId
                                : mode === 'history'
                                  ? historyAnswer?.selectedOptionId ===
                                    option.optionId
                                  : currentAnswer?.selectedOptionId ===
                                    option.optionId;

                        const isCorrectAnswer =
                            mode === 'history'
                                ? historyAnswer?.correctOptionId ===
                                  option.optionId
                                : mode === 'review'
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
                                disabled={
                                    mode === 'review' || mode === 'history'
                                }
                                showStatus={
                                    mode === 'review' || mode === 'history'
                                }
                                isCorrectAnswer={isCorrectAnswer}
                            />
                        );
                    })}
                </ul>

                {(mode === 'review' || mode === 'history') &&
                    (mode === 'history'
                        ? historyAnswer?.explanation
                        : currentAnswer?.explanation) && (
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
                                {mode === 'history'
                                    ? historyAnswer?.explanation
                                    : currentAnswer?.explanation}
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
                totalQuestions={questions.length}
                mode={mode === 'history' ? 'review' : mode}
                isNextDisabled={isNextDisabled}
            />

            {mode === 'test' && testResults && (
                <TestResultsModal
                    isOpen={showResults}
                    onClose={handleCloseResults}
                    results={testResults}
                    testTitle={testData?.title || ''}
                    onViewDetails={handleViewDetails}
                />
            )}
        </Container>
    );
};
