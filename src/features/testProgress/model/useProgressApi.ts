import { $mainApi } from 'shared/lib/requester/requester';

export interface IAnswer {
    questionId: string;
    selectedOptionId: string;
}

interface ISaveProgressPayload {
    testId: string;
    answers: { questionId: string; selectedOptionId: string }[];
    currentQuestionIndex: number;
    timeLeft: number;
}

export const testProgressApi = {
    save: (payload: ISaveProgressPayload) =>
        $mainApi.post('/test-progress/save', payload),
    get: (testId: string) => $mainApi.get(`/test-progress/${testId}`),
    getAllInProgress: () => $mainApi.get('/test-progress'),
    delete: (testId: string) => $mainApi.delete(`/test-progress/${testId}`),
};
