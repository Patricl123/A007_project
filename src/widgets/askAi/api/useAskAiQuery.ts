import { useQuery } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';
import type { AskAiResponse, PopularQuestion } from '../types/IAskAi';

export const useAskAiQuery = (question: string) => {
    return useQuery<AskAiResponse, Error>({
        queryKey: ['askAi', question],
        queryFn: async () => {
            const { data } = await $mainApi.post<AskAiResponse>('/ai/ask', {
                question,
            });
            return data;
        },
        enabled: false,
        retry: false,
    });
};

export const usePopularQuestionsQuery = () => {
    return useQuery<PopularQuestion[]>({
        queryKey: ['popularQuestions'],
        queryFn: async () => {
            const { data } =
                await $mainApi.get<PopularQuestion[]>('/ai/top-questions');
            return data;
        },
    });
};
