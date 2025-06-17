import { type FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
    return (
        <>
            <Suspense fallback={<div> Loading....</div>}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
        </>
    );
};
