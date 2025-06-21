export interface AuthState {
    isAuth: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
    userId: string | null;
    role: string | null;

    login: (params: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    setAccessToken: (accessToken: string) => void;
}

export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginResponse {
    access: string;
    refresh: string;
    user: {
        id: string;
        username: string;
        role: string;
    };
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
