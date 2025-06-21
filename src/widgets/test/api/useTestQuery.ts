import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { ITest } from '../types/ITest';
import type { ITopic } from '../types/ITopic';

export const useSingleTestQuery = (testId: string | undefined) => {
    return useQuery<ITest>({
        queryKey: ['singleTest', testId],
        queryFn: async () => {
            const { data } = await $mainApi.get<ITest>(`/tests/${testId}`);
            return data;
        },
        enabled: !!testId,
    });
};

export const useAllTestQuery = () => {
    return useQuery<ITest>({
        queryKey: ['test'],
        queryFn: async () => {
            const { data } = await $mainApi.get<ITest>('/test');
            return data;
        },
    });
};

export const useAllTopicsQuery = () => {
    return useQuery<ITopic[]>({
        queryKey: ['topics'],
        queryFn: async () => {
            const { data } = await $mainApi.get<ITopic[]>('/topics/all');
            return data;
        },
    });
};
