export interface ITestProgress {
    answers: { questionId: string; selectedOptionId: string }[];
    currentQuestionIndex: number;
    timeLeft: number;
}

export interface ITestPlayerProps {
    mode?: 'test' | 'review' | 'history';
    testId?: string;
    historyId?: string;
}
