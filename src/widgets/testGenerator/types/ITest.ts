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

interface ITopicInfo {
    _id: string;
    name: string;
}

export interface IAllTests {
    testId: string;
    title: string;
    topic: ITopicInfo;
    difficulty: string;
    questionCount: number;
    timeLimit: number;
}
