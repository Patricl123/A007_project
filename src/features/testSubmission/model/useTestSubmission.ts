import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTest } from 'entities/test/api/useSubmitTestMutation';

type SubmissionOptions = {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
};

export const useTestSubmission = (
    testId: string | undefined,
    answers: Record<string, string>,
    options: SubmissionOptions,
) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            if (!testId) {
                return Promise.reject(new Error('Test ID is not defined'));
            }
            const formattedAnswers = Object.entries(answers).map(
                ([questionId, selectedOptionId]) => ({
                    questionId,
                    selectedOptionId,
                }),
            );
            return submitTest({ testId, answers: formattedAnswers });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inProgressTests'] });
            if (options.onSuccess) {
                options.onSuccess();
            }
        },
        onError: options.onError,
    });

    return {
        submit: mutate,
        isSubmitting: isPending,
    };
};
