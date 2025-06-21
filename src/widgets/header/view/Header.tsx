import { useState, type FC } from 'react';
import styles from './Header.module.scss';
import { Calculator, LogIn, MessageSquare, User } from 'lucide-react';
import logo from 'shared/assets/images/mathGenieLogo.png';
import classNames from 'classnames';
import { useAuthStore } from 'widgets/login/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

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
            <div className={styles.logoWrapper}>
                <img src={logo} alt="mathGenie LOGO" />
            </div>
            <div className={styles.routes}>
                <div
                    onClick={() => handleClick('tests')}
                    className={classNames(styles.item, {
                        [styles.active]: active === 'tests',
                    })}
                >
                    <Calculator width={15} />
                    <p>Тесты</p>
                </div>
                <div
                    onClick={() => handleClick('questions')}
                    className={classNames(styles.item, {
                        [styles.active]: active === 'questions',
                    })}
                >
                    <MessageSquare width={15} />
                    <p>Вопросы ИИ</p>
                </div>
                {isAuth && (
                    <div
                        onClick={() => handleClick('profile')}
                        className={classNames(styles.item, {
                            [styles.active]: active === 'profile',
                        })}
                    >
                        <User width={15} />
                        <p>Привет, {username}</p>
                    </div>
                )}
                {isAuth ? (
                    <div onClick={logout} className={classNames(styles.item)}>
                        <LogIn width={15} />
                        <p>Выйти</p>
                    </div>
                ) : (
                    <div
                        onClick={() => handleClick('login')}
                        className={classNames(styles.item, {
                            [styles.active]: active === 'login',
                        })}
                    >
                        <LogIn width={15} />
                        <p>Войти</p>
                    </div>
                )}
            </div>
        </div>
    );
};
