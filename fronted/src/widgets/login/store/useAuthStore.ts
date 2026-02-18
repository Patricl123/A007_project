import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginApi } from '../api/login';
import type { AuthState } from '../types/types';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuth: false,
            accessToken: null,
            refreshToken: null,
            username: null,
            userId: null,
            role: null,

            async login({ username, password }) {
                const data = await loginApi({ username, password });

                set({
                    isAuth: true,
                    accessToken: data.access,
                    refreshToken: data.refresh,
                    username,
                    userId: data.user.id,
                    role: data.user.role,
                });
            },

            logout() {
                set({
                    isAuth: false,
                    accessToken: null,
                    refreshToken: null,
                    username: null,
                    userId: null,
                });
            },

            setAccessToken: (accessToken: string) => set({ accessToken }),
        }),
        {
            name: 'auth-storage',
        },
    ),
);
