import { AuthRedirectWatcher } from 'features/authWatcher/AuthWatcher';
import { type FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader, ScrollToTop } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export const Layout: FC = () => {
    return (
        <>
            <AuthRedirectWatcher />
            <Header />
            <Suspense fallback={<Loader />}>
                <main>
                    <Outlet />
                    <ScrollToTop />
                </main>
            </Suspense>
            <Footer />
        </>
    );
};
