export interface IAnswer {
    questionId: string;
    selectedOptionId: string;
}

export interface ISaveProgressPayload {
    testId: string;
    answers: { questionId: string; selectedOptionId: string }[];
    currentQuestionIndex: number;
    timeLeft: number;
}
