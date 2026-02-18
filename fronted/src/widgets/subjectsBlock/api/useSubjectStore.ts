import { $mainApi } from 'shared/lib/requester/requester';
import type { ISubject } from '../types/ISubject';
import { useQuery } from '@tanstack/react-query';

export const useSubjectQuery = () => {
    return useQuery<ISubject[]>({
        queryKey: ['subject'],
        queryFn: async () => {
            const { data } = await $mainApi.get<ISubject[]>('/subjects');
            return data;
        },
    });
};
