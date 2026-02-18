import type { ITestResult } from 'entities/test/types/testResult';
import type { IHistoryTestResult } from 'widgets/historyBlock/types/types';

export interface TestResultsModalProps {
    isOpen: boolean;
    onClose: () => void;
    results: ITestResult | IHistoryTestResult;
    testTitle: string;
    onViewDetails: () => void;
    mode?: 'test' | 'history';
    isLoading?: boolean;
}
