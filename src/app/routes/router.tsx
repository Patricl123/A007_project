import { routes } from 'shared/constants/constants';
import { Layout } from '../layout/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { LoginPage } from 'pages/loginPage';
import { ProfilePage } from 'pages/profile';
import { TestPage, SubjectsPage } from 'pages/';
import { TestPassPage } from 'pages/testPass';

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
                    element: <SubjectsPage />,
                },
                {
                    path: routes.login,
                    element: <LoginPage />,
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
            ],
        },
    ]);
