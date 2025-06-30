import { $mainApi } from 'shared/lib/requester/requester';
import type { ISaveProgressPayload } from '../types/ITestProgress';

export const testProgressApi = {
    save: (payload: ISaveProgressPayload) =>
        $mainApi.post('/test-progress/save', payload),
    get: (testId: string) => $mainApi.get(`/test-progress/${testId}`),
    getAllInProgress: () => $mainApi.get('/test-progress'),
    delete: (testId: string) => $mainApi.delete(`/test-progress/${testId}`),
};
