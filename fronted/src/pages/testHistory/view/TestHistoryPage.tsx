import { TestPlayer } from 'widgets/testPlayer';
import { useParams } from 'react-router-dom';

export const TestHistoryPage = () => {
    const { historyId, testId } = useParams();

    return <TestPlayer mode="history" testId={testId} historyId={historyId} />;
};
