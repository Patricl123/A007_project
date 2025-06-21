import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testProgressApi } from 'features/testSubmission/api/testProgressApi';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import type { IInProgressTest } from './useInProgressTestsQuery';

export const useDeleteTestProgressMutation = () => {
    const queryClient = useQueryClient();
    const isAuth = useAuthStore((state) => state.isAuth);
    const queryKey = ['inProgressTests', isAuth];

    return useMutation({
        mutationFn: (testId: string) => testProgressApi.delete(testId),
        onMutate: async (testIdToDelete: string) => {
            await queryClient.cancelQueries({ queryKey });

            const previousTests =
                queryClient.getQueryData<IInProgressTest[]>(queryKey);

            if (previousTests) {
                queryClient.setQueryData<IInProgressTest[]>(
                    queryKey,
                    previousTests.filter(
                        (test) => test.testId !== testIdToDelete,
                    ),
                );
            }
            return { previousTests };
        },
        onError: (err, testId, context) => {
            console.error('Failed to delete test progress', err);
            if (context?.previousTests) {
                queryClient.setQueryData(queryKey, context.previousTests);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
