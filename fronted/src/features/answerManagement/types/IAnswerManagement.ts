export interface QuestionOptionProps {
    option: {
        optionId: string;
        text: string;
    };
    isSelected: boolean;
    onSelect?: () => void;
    disabled?: boolean;
    showStatus?: boolean;
    isCorrectAnswer?: boolean;
}
