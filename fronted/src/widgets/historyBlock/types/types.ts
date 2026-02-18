interface IItem {
    name: string;
    id: number;
}
export interface ISubject {
    id: string;
    testId?: string;
    subject: IItem;
    level: 'Начальный' | 'Продвинутый' | 'Средний';
    resultPercent: number;
    correct: number;
    total: number;
    date: string;
}

export interface IHistoryTestAnswer {
    questionId: string;
    questionText: string;
    options: { optionId: string; text: string }[];
    correctOptionId: string;
    selectedOptionId: string;
    explanation: string;
}

export interface IHistoryTestResult {
    id: string;
    testId?: string;
    subject: {
        name: string;
    };
    date: string;
    level: string;
    resultPercent: number;
    correct: number;
    total: number;
    answers: IHistoryTestAnswer[];
}
