export interface TestStatusProps {
    time: string;
    isLowTime: boolean;
    mode?: 'timer' | 'result';
    correctAnswers?: number;
    totalQuestions?: number;
    resultPercent?: number;
}
