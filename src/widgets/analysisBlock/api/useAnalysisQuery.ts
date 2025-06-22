import { useMutation, useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { IAdvice } from '../types/types';

export const useUpdateAnalysisMutation = () => {
    return useMutation({
        mutationFn: async () => {
            await $mainApi.post('/api/advice');
        },
    });
};

export const useUpdatedAnalysisQuery = () => {
    return useQuery({
        queryKey: ['updated analysis'],
        queryFn: async () => {
            const { data } = await $mainApi.get<IAdvice[]>('/api/advice');
            return data[0];
        },
    });
};
