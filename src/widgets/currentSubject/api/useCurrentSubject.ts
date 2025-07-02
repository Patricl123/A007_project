import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';

export const useCurrentSubject = ({ id }) => {
    return useQuery({
        queryKey: ['currentSubject', id],
        queryFn: async () => {
            const { data } = await $mainApi.get<string>(
                `/subjects/current/${id}`,
            );
            return data;
        },
    });
};
