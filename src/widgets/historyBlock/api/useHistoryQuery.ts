import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { ISubject } from '../types/types';

export const useHistoryQuery = () => {
    return useQuery({
        queryKey: ['history'],
        queryFn: async () => {
            const { data } = await $mainApi.get<ISubject[]>('/test-history');
            return data;
        },
    });
};
