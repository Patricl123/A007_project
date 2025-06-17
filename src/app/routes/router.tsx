import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';

export const router = () =>
    createBrowserRouter([
        {
            element: <Layout />,
            children: [
                {
                    path: routes.home,
                    element: <div>Home</div>,
                },
                {
                    path: routes.subjects,
                    element: <div>subjects</div>,
                },
            ],
        },
    ]);
