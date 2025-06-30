import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { LoginPage } from 'pages/loginPage';
import { ProfilePage } from 'pages/profile';
import { TestPassPage, TestPage } from 'pages/';
import { AskAiPage } from 'pages/askAi';
import { ProtectedRoute } from 'shared/lib/routing/ProtectedRoute';

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
                    element: <div>subjects</div>,
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
                    element: <TestPassPage />,
                },
                {
                    path: routes.questions,
                    element: <AskAiPage />,
                },
            ],
        },
    ]);
