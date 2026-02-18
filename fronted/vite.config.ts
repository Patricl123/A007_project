import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            app: '/src/app',
            shared: '/src/shared',
            widgets: '/src/widgets',
            pages: '/src/pages',
            features: '/src/features',
            entities: '/src/entities',
            mixins: '/src/app/styles/mixins.scss',
            var: '/src/app/styles/var.scss',
        },
    },

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @use "app/styles/forward.scss" as *;
        `,
            },
        },
    },
});
