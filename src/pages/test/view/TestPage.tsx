import { type FC } from 'react';
import { TestAll } from 'widgets/testAll';
import { TestGenerator } from 'widgets/testGenerator';
import {
    useAllTestQuery,
    useAllTopicsQuery,
    useUserTestsQuery,
} from 'widgets/testGenerator/api/useTestQuery';
import { InProgressTests } from 'widgets/inProgressTests';
import { useInProgressTestsQuery } from 'widgets/inProgressTests/api/useInProgressTestsQuery';
import { Loader } from 'shared/ui';

export const TestPage: FC = () => {
    const { isLoading: testsLoading } = useAllTestQuery();
    const { isLoading: topicsLoading } = useAllTopicsQuery();
    const { isLoading: progressLoading } = useInProgressTestsQuery();
    const { isLoading: userTestsLoading } = useUserTestsQuery();

    const isLoading =
        testsLoading || topicsLoading || progressLoading || userTestsLoading;

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <InProgressTests />
            <TestAll />
            <TestGenerator />
        </>
    );
};
