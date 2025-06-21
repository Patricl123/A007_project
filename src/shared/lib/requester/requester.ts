import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from '../../constants/constants';
import axios from 'axios';

interface AuthStorage {
    state: {
        isAuth: boolean;
        accessToken: string;
        refreshToken: string;
        username: string;
        role: string;
    };
    version: number;
}

class ApiService {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: `${BASE_URL}`,
        });

        this.initializeInterceptors();
    }

    private getAuthToken(): string | null {
        try {
            const authData = localStorage.getItem('auth-storage');
            if (!authData) return null;

            const parsedAuth: AuthStorage = JSON.parse(authData);

            if (parsedAuth.state?.isAuth && parsedAuth.state?.accessToken) {
                return parsedAuth.state.accessToken;
            }

            return null;
        } catch (error) {
            console.error('Ошибка при получении токена авторизации:', error);
            return null;
        }
    }

    private initializeInterceptors(): void {
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = this.getAuthToken();
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error),
        );

        this.instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshed = await this.refreshToken();
                        if (refreshed) {
                            const newToken = this.getAuthToken();
                            if (newToken) {
                                originalRequest.headers['Authorization'] =
                                    `Bearer ${newToken}`;
                                return this.instance(originalRequest);
                            }
                        }
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (refreshError) {
                        this.clearAuthStorage();
                        window.location.href = '/login';
                    }
                }

                return Promise.reject(error);
            },
        );
    }

    private async refreshToken(): Promise<boolean> {
        try {
            const authData = localStorage.getItem('auth-storage');
            if (!authData) return false;

            const parsedAuth: AuthStorage = JSON.parse(authData);
            const refreshToken = parsedAuth.state?.refreshToken;

            if (!refreshToken) return false;

            const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                refresh: refreshToken,
            });

            if (response.data?.access) {
                const updatedAuth = {
                    ...parsedAuth,
                    state: {
                        ...parsedAuth.state,
                        accessToken: response.data.access,
                        refreshToken: response.data.refresh || refreshToken,
                    },
                };

                localStorage.setItem(
                    'auth-storage',
                    JSON.stringify(updatedAuth),
                );
                return true;
            }

            return false;
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            return false;
        }
    }

    private clearAuthStorage(): void {
        localStorage.removeItem('auth-storage');
    }

    async get<T = any>(url: string, config?: any): Promise<{ data: T }> {
        const response = await this.instance.get<T>(url, config);
        return { data: response.data };
    }

    async post<T = any, B = any>(
        url: string,
        body?: B,
        config?: any,
    ): Promise<{ data: T }> {
        const response = await this.instance.post<T>(url, body, config);
        return { data: response.data };
    }

    async put<T = any, B = any>(
        url: string,
        body?: B,
        config?: any,
    ): Promise<{ data: T }> {
        const response = await this.instance.put<T>(url, body, config);
        return { data: response.data };
    }

    async delete<T = any>(url: string, config?: any): Promise<{ data: T }> {
        const response = await this.instance.delete<T>(url, config);
        return { data: response.data };
    }

    async patch<T = any, B = any>(
        url: string,
        body?: B,
        config?: any,
    ): Promise<{ data: T }> {
        const response = await this.instance.patch<T>(url, body, config);
        return { data: response.data };
    }
}

export const $mainApi = new ApiService();
