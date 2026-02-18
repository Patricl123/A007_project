export interface ITestResult {
    score: number;
    total: number;
    correctAnswers: ICorrectAnswer[];
    testHistoryId?: string;
}

export interface ICorrectAnswer {
    questionId: string;
    correctOptionId: string;
    explanation: string;
}
