import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { ProfilePage } from 'pages/profile';
import { TestsPage } from 'pages/testsPage';

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
                    path: routes.test,
                    element: <TestsPage />,
                },
                {
                    path: routes.profile,
                    element: <ProfilePage />,
                },
            ],
        },
    ]);
