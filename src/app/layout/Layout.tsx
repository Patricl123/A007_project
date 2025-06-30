import { AuthRedirectWatcher } from 'features/authWatcher/AuthWatcher';
import { type FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollToTop } from 'shared/lib/routing/ScrollToTop';
import { Loader, ScrollToTopButton } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export const Layout: FC = () => {
    return (
        <>
            <AuthRedirectWatcher />
            <Header />
            <ScrollToTop />
            <Suspense fallback={<Loader />}>
                <main>
                    <Outlet />
                    <ScrollToTopButton />
                </main>
            </Suspense>
            <Footer />
        </>
    );
};
