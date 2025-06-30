import { TestPlayer } from 'widgets/testPlayer';

interface TestPassPageProps {
    mode?: 'test' | 'review';
}

export const TestPassPage = ({ mode = 'test' }: TestPassPageProps) => {
    return <TestPlayer mode={mode} />;
};
