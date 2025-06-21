import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { TestsPage } from 'pages/testsPage';
import { HomePage } from 'pages/home';
import { ProfilePage } from 'pages/profile';

export const router = () =>
    createBrowserRouter([
        {
            element: <Layout />,
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
                    path: routes.tests,
                    element: <TestsPage />,
                },
                {
                    path: routes.profile,
                    element: <ProfilePage />,
                },
            ],
        },
    ]);
