import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import type { IInProgressTest } from './useInProgressTestsQuery';
import { testProgressApi } from 'features/testProgress';

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
        onError: (err, _testId, context) => {
            console.error('Ошибка при удалении теста', err);
            if (context?.previousTests) {
                queryClient.setQueryData(queryKey, context.previousTests);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
