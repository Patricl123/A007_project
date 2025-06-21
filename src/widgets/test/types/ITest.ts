interface IOption {
    optionId: string;
    text: string;
}

interface IQuestion {
    questionId: string;
    text: string;
    options: IOption[];
}

export interface ITest {
    testId: string;
    title: string;
    questions: IQuestion[];
    timeLimit: number;
}
