export interface QuestionNavigationProps {
    onPrev: () => void;
    onNext: () => void;
    onSubmit?: () => void;
    isFirst: boolean;
    isLast: boolean;
    isSubmitting?: boolean;
    answeredCount: number;
    totalQuestions: number;
    mode?: 'test' | 'review';
    isNextDisabled?: boolean;
}
