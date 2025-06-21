import { AuthRedirectWatcher } from 'features/authWatcher/AuthWatcher';
import { type FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export const Layout: FC = () => {
    return (
        <>
            <AuthRedirectWatcher />
            <Header />
            <Suspense fallback={<div> Loading....</div>}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
            <Footer />
        </>
    );
};
