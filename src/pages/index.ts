import { lazy } from 'react';

export const TestPage = lazy(() =>
    import('./test/view/TestPage').then((module) => ({
        default: module.TestPage,
    })),
);
