import type { FC } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { Calculator, LogIn, MessageSquare } from 'lucide-react';
import { Typography } from 'shared/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'widgets/login/store/useAuthStore';

export const Navbar: FC = () => {
    const { isAuth, username, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (path: string) => {
        navigate(`/${path}`);
    };
    return (
        <div className={styles.container}>
            <ul className={styles.wrapper}>
                <li>
                    <div
                        onClick={() => handleClick('test')}
                        className={classNames(
                            styles.item,
                            location.pathname.includes('/test') &&
                                styles.active,
                        )}
                    >
                        <Calculator width={17} />
                        <Typography variant="base">Тесты</Typography>
                    </div>
                </li>
                <li>
                    <div
                        onClick={() => handleClick('questions')}
                        className={classNames(
                            styles.item,
                            location.pathname.includes('/questions') &&
                                styles.active,
                        )}
                    >
                        <MessageSquare width={17} />
                        <Typography variant="base">Вопросы ИИ</Typography>
                    </div>
                </li>
                {isAuth && (
                    <li>
                        <div
                            onClick={() => handleClick('profile')}
                            className={classNames(
                                styles.item,
                                location.pathname.includes('/profile') &&
                                    styles.active,
                            )}
                        >
                            <Typography variant="base">
                                Привет, {username}
                            </Typography>
                        </div>
                    </li>
                )}
                {isAuth ? (
                    <li>
                        <div
                            onClick={logout}
                            className={classNames(styles.item, styles.button)}
                        >
                            <LogIn width={17} />
                            <Typography variant="base">Выйти</Typography>
                        </div>
                    </li>
                ) : (
                    <li>
                        <div
                            onClick={() => handleClick('login')}
                            className={classNames(
                                styles.item,
                                styles.button,
                                location.pathname.includes('/login') &&
                                    styles.active,
                            )}
                        >
                            <LogIn width={17} />
                            <Typography variant="base">Войти</Typography>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
};
