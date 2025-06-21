import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, Typography, Card, Container } from 'shared/ui';
import styles from './TestPass.module.scss';
import {
    QuestionNavigation,
    useQuestionNavigation,
} from 'features/questionNavigation';
import { QuestionOption, useAnswerManagement } from 'features/answerManagement';
import { TestTimer, useTestTimer } from 'features/testTimer';
import { useTestSubmission } from 'features/testSubmission';
import { cleanQuestionText } from 'shared/helpers/helper';
import { useSingleTestQuery } from 'entities/test/api/useSingleTestQuery';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import { testProgressApi } from 'features/testSubmission/api/testProgressApi';

interface ITestProgress {
    answers: { questionId: string; selectedOptionId: string }[];
    currentQuestionIndex: number;
    timeLeft: number;
}

export const TestPass = () => {
    const { testId } = useParams<{ testId: string }>();
    const navigate = useNavigate();
    const isAuth = useAuthStore((state) => state.isAuth);

    const [progressData, setProgressData] = useState<ITestProgress | null>(
        null,
    );
    const [isProgressLoaded, setIsProgressLoaded] = useState(false);

    const { data: testData, isLoading, error } = useSingleTestQuery(testId);

    const answerManagement = useAnswerManagement();

    const submission = useTestSubmission(testId, answerManagement.answers, {
        onSuccess: () => navigate('/profile'),
    });

    const timer = useTestTimer(testData?.timeLimit || 0, () =>
        submission.submit(),
    );

    const navigation = useQuestionNavigation(testData?.questions.length || 0);

    useEffect(() => {
        const fetchProgress = async () => {
            if (!isAuth || !testId) {
                setIsProgressLoaded(true);
                return;
            }
            try {
                const { data } = await testProgressApi.get(testId);
                setProgressData(data);
            } finally {
                setIsProgressLoaded(true);
            }
        };
        fetchProgress();
    }, [isAuth, testId]);

    useEffect(() => {
        if (!isProgressLoaded || !testData) {
            return;
        }

        if (progressData) {
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
    }, [
        isProgressLoaded,
        testData,
        progressData,
        answerManagement,
        navigation,
        timer,
    ]);

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
                    selectedOptionId,
                }),
            );
            await testProgressApi.save({
                testId,
                answers: formattedAnswers,
                currentQuestionIndex: currentIndex,
                timeLeft: timeLeft ?? 0,
            });
        } catch (err) {
            console.error('Failed to save progress', err);
        }
    }, [isProgressLoaded, isAuth, testId, testData, submission.isSubmitting]);

    useEffect(() => {
        const intervalId = setInterval(saveProgress, 30000);
        return () => {
            clearInterval(intervalId);
            saveProgress();
        };
    }, [saveProgress, answerManagement, navigation, timer]);

    if (isLoading || !isProgressLoaded || navigation.currentIndex === null)
        return <Loader />;

    if (error || !testData) {
        return <Container>Тест не найден или произошла ошибка.</Container>;
    }

    const currentQuestion = testData.questions[navigation.currentIndex];
    const answeredCount = Object.keys(answerManagement.answers).length;

    return (
        <Container>
            <div className={styles.header}>
                <Typography variant="h2">{testData.title}</Typography>
                {timer.formattedTime && (
                    <TestTimer
                        time={timer.formattedTime}
                        isLowTime={
                            timer.timeLeft !== null && timer.timeLeft < 300
                        }
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
                    {currentQuestion.options.map((option) => (
                        <QuestionOption
                            key={option.optionId}
                            option={option}
                            isSelected={
                                answerManagement.getAnswer(
                                    currentQuestion.questionId,
                                ) === option.optionId
                            }
                            onSelect={() =>
                                answerManagement.selectAnswer(
                                    currentQuestion.questionId,
                                    option.optionId,
                                )
                            }
                        />
                    ))}
                </ul>
            </Card>

            <QuestionNavigation
                onPrev={navigation.goPrev}
                onNext={navigation.goNext}
                isFirst={navigation.isFirst}
                isLast={navigation.isLast}
                onSubmit={submission.submit}
                isSubmitting={submission.isSubmitting}
                answeredCount={answeredCount}
                totalQuestions={testData.questions.length}
            />
        </Container>
    );
};
