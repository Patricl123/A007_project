import { $mainApi } from 'shared/lib/requester/requester';
import { useQuery } from '@tanstack/react-query';
import type { ITopics } from '../types/Topics';

export const useTopicsQuery = (topicsId: string | null) => {
    return useQuery<ITopics[]>({
        queryKey: ['topics', topicsId],
        queryFn: async () => {
            const { data } = await $mainApi.get<ITopics[]>(
                `/topics?topic=${topicsId}`,
            );
            return data;
        },
    });
};
