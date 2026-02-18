import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { LoginPage } from 'pages/loginPage';
import { ProfilePage } from 'pages/profile';
import { SubjectsPage } from 'pages/';
import { TestPassPage, TestPage } from 'pages/';
import { AskAiPage } from 'pages/askAi';
import { TestHistoryPage } from 'pages/testHistory';
import { ProtectedRoute } from 'shared/lib/routing/ProtectedRoute';

import { SubsectionsPage } from 'pages/subsections';
import { TopicPage } from 'pages/topicPage/view/TopicPage';

export const router = () =>
    createBrowserRouter([
        {
            path: routes.login,
            element: <LoginPage />,
        },
        {
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: routes.home,
                    element: <HomePage />,
                },
                {
                    path: routes.subjects,
                    element: <SubjectsPage />,
                },
                {
                    path: routes.test,
                    element: <TestPage />,
                },
                {
                    path: routes.profile,
                    element: <ProfilePage />,
                },
                {
                    path: routes.testMore,
                    element: <TestPassPage mode="test" />,
                },
                {
                    path: routes.testReview,
                    element: <TestPassPage mode="review" />,
                },
                {
                    path: routes.questions,
                    element: <AskAiPage />,
                },
                {
                    path: '/test-history/:historyId/:testId',
                    element: <TestHistoryPage />,
                },
                {
                    path: '/subsections/:subjectId',
                    element: <SubsectionsPage />,
                },
                {
                    path: '/topics/:topicId',
                    element: <TopicPage />,
                },
            ],
        },
    ]);
