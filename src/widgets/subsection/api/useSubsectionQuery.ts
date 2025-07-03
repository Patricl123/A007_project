import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { ISubsection } from '../types/ISubsection';

export const useSubjectSubsectionsQuery = (subjectId: string | null) => {
    return useQuery<ISubsection | null>({
        queryKey: ['subjectSubsections', subjectId],
        enabled: !!subjectId,
        queryFn: async () => {
            if (!subjectId) return null;
            const { data } = await $mainApi.get<ISubsection>(
                `/subsections?subject=${subjectId}`,
            );
            return data;
        },
    });
};
