import { useQuery } from '@tanstack/react-query';

import { $mainApi } from 'shared/lib/requester/requester';
import type { ITest } from 'widgets/testGenerator/types/ITest';

const getTest = async (testId: string): Promise<ITest> => {
    const { data } = await $mainApi.get<ITest>(`/test/${testId}`);
    return data;
};

export const useSingleTestQuery = (
    testId: string | undefined,
    options?: { enabled?: boolean },
) => {
    return useQuery({
        queryKey: ['single-test', testId],
        queryFn: () => getTest(testId!),
        enabled: options?.enabled ?? !!testId,
    });
};
