export interface Test {
    id: string;
    title: string;
    timeLimit: number;
    questions: Question[];
}

export interface Question {
    questionId: string;
    text: string;
    options: Option[];
}

export interface Option {
    optionId: string;
    text: string;
}

export interface TestAnswer {
    questionId: string;
    selectedOptionId: string;
}
