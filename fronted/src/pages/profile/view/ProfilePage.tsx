import { type FC } from 'react';
import { AnalysisBlock } from 'widgets/analysisBlock';
import { HistoryBlock } from 'widgets/historyBlock';
import { ProfileBlock } from 'widgets/profileBlock';

export const ProfilePage: FC = () => {
    return (
        <div>
            <ProfileBlock />
            <AnalysisBlock />
            <HistoryBlock />
        </div>
    );
};
