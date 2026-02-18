import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { IHistoryTestResult } from '../types/types';

export const getHistoryTest = async (
    testId: string,
): Promise<IHistoryTestResult> => {
    const response = await $mainApi.get(`/test-history/${testId}`);
    return response.data;
};

export const useHistoryTestQuery = (testId: string | undefined) => {
    return useQuery({
        queryKey: ['historyTest', testId],
        queryFn: () => getHistoryTest(testId!),
        enabled: !!testId,
    });
};
