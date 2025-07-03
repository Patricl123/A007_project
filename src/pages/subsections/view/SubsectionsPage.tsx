import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { SubjectSubsectionsBlock } from 'widgets/subsection';

export const SubsectionsPage: FC = () => {
    const { subjectId } = useParams<{ subjectId: string }>();

    return (
        <>
            <h2>Подразделы предмета</h2>
            <SubjectSubsectionsBlock subjectId={subjectId ?? null} />
        </>
    );
};
