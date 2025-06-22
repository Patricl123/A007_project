import { useState, type FC } from 'react';
import styles from './Header.module.scss';
import { Calculator, LogIn, MessageSquare } from 'lucide-react';
import logo from 'shared/assets/images/mathGenieLogo.png';
import classNames from 'classnames';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from 'shared/ui';

export const Header: FC = () => {
    const [active, setActive] = useState<string | null>(null);
    const { isAuth, username, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        setActive(path);
        navigate(`/${path}`);
    };

    return (
        <div className={styles.wrapper}>
            <Link to={'/'}>
                <div
                    onClick={() => setActive(null)}
                    className={styles.logoWrapper}
                >
                    <img src={logo} alt="mathGenie LOGO" />
                </div>
            </Link>
            <div className={styles.routes}>
                <div
                    onClick={() => handleClick('test')}
                    className={classNames(styles.item, {
                        [styles.active]: active === 'test',
                    })}
                >
                    <Calculator width={17} />
                    <Typography variant="base">Тесты</Typography>
                </div>
                <div
                    onClick={() => handleClick('questions')}
                    className={classNames(styles.item, {
                        [styles.active]: active === 'questions',
                    })}
                >
                    <MessageSquare width={17} />
                    <Typography variant="base">Вопросы ИИ</Typography>
                </div>
                {isAuth && (
                    <div
                        onClick={() => handleClick('profile')}
                        className={classNames(styles.item, {
                            [styles.active]: active === 'profile',
                        })}
                    >
                        <Typography variant="base">
                            Привет, {username}
                        </Typography>
                    </div>
                )}
                {isAuth ? (
                    <div
                        onClick={logout}
                        className={classNames(styles.item, styles.button)}
                    >
                        <LogIn width={17} />
                        <Typography variant="base">Выйти</Typography>
                    </div>
                ) : (
                    <div
                        onClick={() => handleClick('login')}
                        className={classNames(styles.item, styles.button, {
                            [styles.active]: active === 'login',
                        })}
                    >
                        <LogIn width={17} />
                        <Typography variant="base">Войти</Typography>
                    </div>
                )}
            </div>
        </div>
    );
};
