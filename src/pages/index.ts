import { lazy } from 'react';

export const TestPage = lazy(() =>
    import('./test/view/TestPage').then((module) => ({
        default: module.TestPage,
    })),
);

export const TestPassPage = lazy(() =>
    import('./testMore/view/TestPassPage').then((module) => ({
        default: module.TestPassPage,
    })),
);
