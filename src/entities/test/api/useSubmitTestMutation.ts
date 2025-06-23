import { useMutation } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { ITestResult } from '../types/testResult';
import type { IAnswer } from 'features/testProgress/types/ITestProgress';

interface ISubmitPayload {
    testId: string | undefined;
    answers: IAnswer[];
}

export const submitTest = async ({
    testId,
    answers,
}: ISubmitPayload): Promise<ITestResult> => {
    const response = await $mainApi.post('/test/submit', { testId, answers });
    return response.data;
};

export const useSubmitTestMutation = () => {
    return useMutation({
        mutationFn: submitTest,
    });
};
