import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Topics } from 'widgets/topics/view/Topics';

export const TopicPage: FC = () => {
    const { topicId, subjectId } = useParams<{
        topicId: string;
        subjectId: string;
    }>();
    return <Topics topicId={topicId ?? null} subjectId={subjectId ?? null} />;
};
