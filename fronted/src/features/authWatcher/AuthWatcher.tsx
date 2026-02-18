import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'widgets/login/store/useAuthStore';

export const AuthRedirectWatcher = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    return null;
};
