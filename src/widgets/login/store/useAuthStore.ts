// features/auth-by-username/model/useAuthStore.ts
import { create } from 'zustand';
import { login as loginApi } from '../api/login';
import type { AuthState } from '../types/types';

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    accessToken: null,
    refreshToken: null,
    username: null,
    role: null,

    async login({ username, password }) {
        const data = await loginApi({ username, password });

        set({
            isAuth: true,
            accessToken: data.access,
            refreshToken: data.refresh,
            username,
            role: data.user.role,
        });

        localStorage.setItem('refreshToken', data.refresh);
    },

    logout() {
        set({
            isAuth: false,
            accessToken: null,
            refreshToken: null,
            username: null,
        });

        localStorage.removeItem('refreshToken');
    },

    setAccessToken: (accessToken: string) => set({ accessToken }),
}));
