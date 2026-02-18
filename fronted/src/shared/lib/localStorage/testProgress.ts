export const testProgressStorage = {
    saveQuestionIndex: (testId: string, index: number) => {
        localStorage.setItem(`test-question-index-${testId}`, index.toString());
    },

    getQuestionIndex: (testId: string): number => {
        const saved = localStorage.getItem(`test-question-index-${testId}`);
        return saved ? parseInt(saved, 10) : 0;
    },

    clearTestProgress: (testId: string) => {
        localStorage.removeItem(`test-question-index-${testId}`);
        localStorage.removeItem(`test-answers-${testId}`);
        localStorage.removeItem(`test-timeLeft-${testId}`);
    },
};
