import { useQuery } from '@tanstack/react-query';
import { testProgressApi } from 'features/testProgress';
import { useAuthStore } from 'widgets/login/store/useAuthStore';

export interface IInProgressTest {
    _id: string;
    testId: string;
    title: string;
    progress: number;
    timeLeft: number;
    currentQuestionIndex: number;
    status: 'in_progress' | 'completed';
}

export const useInProgressTestsQuery = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    return useQuery<IInProgressTest[]>({
        queryKey: ['inProgressTests', isAuth],
        queryFn: async () => {
            const { data } = await testProgressApi.getAllInProgress();
            return data;
        },
        enabled: isAuth,
        staleTime: 5 * 60 * 1000,
    });
};
