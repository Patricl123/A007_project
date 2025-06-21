import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { LoginPage } from 'pages/loginPage';

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
                    path: routes.login,
                    element: <LoginPage />,
                },
            ],
        },
    ]);
