import { lazy } from 'react';

export const TestPage = lazy(() =>
    import('./test/view/TestPage').then((module) => ({
        default: module.TestPage,
    })),
);

export const TestPassPage = lazy(() =>
    import('./testPass/view/TestPassPage').then((module) => ({
        default: module.TestPassPage,
    })),
);
export const SubjectsPage = lazy(() =>
    import('./subjects/view/SubjectsPage').then((module) => ({
        default: module.SubjectsPage,
    })),
);
