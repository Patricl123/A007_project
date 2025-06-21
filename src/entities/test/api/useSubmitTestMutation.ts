import { useMutation } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { IAnswer } from 'features/testSubmission/api/testProgressApi';

interface ISubmitPayload {
    testId: string | undefined;
    answers: IAnswer[];
}

export const submitTest = async ({ testId, answers }: ISubmitPayload) => {
    return $mainApi.post('/test/submit', { testId, answers });
};

export const useSubmitTestMutation = () => {
    return useMutation({
        mutationFn: submitTest,
    });
};
