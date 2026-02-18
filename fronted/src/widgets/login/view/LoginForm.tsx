import React, { useState, type FC } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import styles from './LoginForm.module.scss';
import { Input, Label, Button, Typography } from 'shared/ui';
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
                        <Typography variant="h4" weight="bold">
                            Вход в систему
                        </Typography>
                    </div>
                    <Typography
                        variant="small"
                        weight="regular"
                        color="secondary"
                    >
                        Войдите в свой аккаунт, чтобы сохранять прогресс
                    </Typography>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <Label>
                            <Typography variant="base" weight="semibold">
                                Логин
                            </Typography>
                        </Label>
                        <Input
                            type="text"
                            fullWidth={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите ваш логин"
                            isPaddingLeft
                        >
                            <KeyRound
                                size={18}
                                color="#6f7583"
                                style={{ opacity: 0.6 }}
                                strokeWidth={2}
                            />
                        </Input>
                    </div>
                    <div className={styles.field}>
                        <Label>
                            <Typography variant="base" weight="semibold">
                                Пароль
                            </Typography>
                        </Label>
                        <Input
                            type="password"
                            fullWidth={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите ваш пароль"
                            isPaddingLeft
                        >
                            <Lock
                                size={18}
                                style={{ opacity: 0.6 }}
                                color="#6f7583"
                                strokeWidth={2}
                            />
                        </Input>
                    </div>
                    <Button type="submit">Войти</Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};
