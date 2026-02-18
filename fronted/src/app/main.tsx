import { router } from './routes/router';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'app/styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/global.scss';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: true,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router()} />
    </QueryClientProvider>,
);
