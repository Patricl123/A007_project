import React, { useState, type FC } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import styles from './LoginForm.module.scss';
import { Input, Label } from 'shared/ui';
import { KeyRound, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LoginForm: FC = () => {
    const login = useAuthStore((state) => state.login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ username, password });
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.textBox}>
                    <div className={styles.title}>
                        <LogIn color="black" />
                        <h3>Вход в систему</h3>
                    </div>
                    <p>Войдите в свой аккаунт, чтобы сохранять прогресс</p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            fullWidth={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите ваш логин"
                        >
                            <KeyRound color="grey" />
                        </Input>
                    </div>
                    <div className={styles.field}>
                        <Label>Пароль</Label>
                        <Input
                            type="password"
                            fullWidth={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите ваш пароль"
                        >
                            <Lock color="grey" />
                        </Input>
                    </div>
                    <button type="submit">Войти</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};
