export interface TestCardProps {
    test: {
        testId: string;
        title: string;
        difficulty: string;
        questionCount: number;
        timeLimit: number;
    };
    index: number;
    isUserTest?: boolean;
}
