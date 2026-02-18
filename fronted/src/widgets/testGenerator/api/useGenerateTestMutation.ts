import { useMutation, useQueryClient } from '@tanstack/react-query';
import { $mainApi } from 'shared/lib/requester/requester';

interface IGenerateTestPayload {
    topicId?: string;
    difficulty: string;
    customTopicName?: string;
    customTopicDescription?: string;
}

export const useGenerateTestMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IGenerateTestPayload) => {
            return $mainApi.post('/test/generate', payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-tests'] });
        },
    });
};
