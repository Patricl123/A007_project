import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { IAllTests } from '../types/ITest';
import type { ITopic } from '../types/ITopic';

export const useAllTestQuery = () => {
    return useQuery<IAllTests>({
        queryKey: ['test'],
        queryFn: async () => {
            const { data } = await $mainApi.get<IAllTests>('/test');
            return data;
        },
    });
};

export const useUserTestsQuery = () => {
    return useQuery<IAllTests>({
        queryKey: ['user-tests'],
        queryFn: async () => {
            const { data } = await $mainApi.get<IAllTests>('/test/user');
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
