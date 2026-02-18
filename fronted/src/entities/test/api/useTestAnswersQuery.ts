import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';

export interface ITestAnswer {
    questionId: string;
    questionText: string;
    options: {
        optionId: string;
        text: string;
        _id: string;
    }[];
    correctOptionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
    explanation: string;
}

export interface ITestAnswersResult {
    testId: string;
    title: string;
    difficulty: string;
    totalQuestions: number;
    subject: string;
    answers: ITestAnswer[];
}

export const getTestAnswers = async (
    testId: string,
): Promise<ITestAnswersResult> => {
    const response = await $mainApi.get(`/test/answers/${testId}`);
    return response.data;
};

export const useTestAnswersQuery = (testId: string | undefined) => {
    return useQuery({
        queryKey: ['testAnswers', testId],
        queryFn: () => getTestAnswers(testId!),
        enabled: !!testId,
    });
};
