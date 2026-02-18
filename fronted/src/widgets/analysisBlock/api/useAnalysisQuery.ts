import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { IAdvice } from '../types/types';

export const useAnalysisQuery = () => {
    return useQuery({
        queryKey: ['analysis'],
        queryFn: async () => {
            const { data } = await $mainApi.get<IAdvice[]>('/api/advice');
            return data[0] ?? null;
        },
    });
};
