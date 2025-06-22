import { useState, useCallback } from 'react';

export const useQuestionNavigation = (totalQuestions: number) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const goNext = useCallback(() => {
        if (currentIndex === null) return;
        setCurrentIndex((prev) =>
            prev !== null ? Math.min(prev + 1, totalQuestions - 1) : null,
        );
    }, [totalQuestions, currentIndex]);

    const goPrev = useCallback(() => {
        if (currentIndex === null) return;
        setCurrentIndex((prev) =>
            prev !== null ? Math.max(prev - 1, 0) : null,
        );
    }, [currentIndex]);

    return {
        currentIndex,
        setCurrentIndex,
        goNext,
        goPrev,
        isFirst: currentIndex === 0,
        isLast: currentIndex !== null && currentIndex === totalQuestions - 1,
    };
};
