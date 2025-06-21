import { requester } from 'shared/api/requester';
import type { LoginParams, LoginResponse } from '../types/types';
import { useAuthStore } from '../store/useAuthStore';

export async function login(params: LoginParams): Promise<LoginResponse> {
    const response = await requester.post<LoginResponse>('/auth/login', params);
    return response.data;
}

export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        return false;
    }

    try {
        const response = await requester.post('/auth/refresh', {
            refresh: refreshToken,
        });

        useAuthStore.getState().setAccessToken(response.data.access);

        return true;
    } catch (error) {
        console.error('Failed to refresh token', error);
        useAuthStore.getState().logout();
        return false;
    }
}

export async function authorizedRequest(url: string, options: any = {}) {
    const { accessToken } = useAuthStore.getState();

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    let response = await requester(url, { ...options, headers });

    if (response.status === 401) {
        const refreshed = await refreshAccessToken();

        if (refreshed) {
            const newAccessToken = useAuthStore.getState().accessToken;

            headers.Authorization = `Bearer ${newAccessToken}`;
            response = await requester(url, { ...options, headers });
        } else {
            // logout already called in refreshAccessToken
        }
    }

    return response;
}
