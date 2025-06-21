import { useState } from 'react';

export const useAnswerManagement = () => {
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const selectAnswer = (questionId: string, optionId: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const getAnswer = (questionId: string) => {
        return answers[questionId];
    };

    return {
        answers,
        selectAnswer,
        getAnswer,
        setAnswers,
    };
};
