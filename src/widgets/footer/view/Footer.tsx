import type { FC } from 'react';
import styles from './Footer.module.scss';
import { Typography } from 'shared/ui';
import logo from 'shared/assets/images/mathGenieWhite.png';
import { navLink } from 'shared/constants/constants';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.blockLogo}>
                    <Link to={'/'}>
                        <div className={styles.logo}>
                            <img src={logo} alt="MathGenie logo white" />
                        </div>
                    </Link>
                    <Typography variant="base" color="lightgrey">
                        Современная платформа для изучения различных наук с
                        помощью искусственного интеллекта.
                    </Typography>
                </div>
                <div className={styles.navBar}>
                    <Typography
                        className={styles.sections}
                        color="white"
                        variant="h4"
                    >
                        Разделы
                    </Typography>
                    <ul>
                        {(
                            Object.keys(navLink) as Array<keyof typeof navLink>
                        ).map((link) => (
                            <li>
                                <Link to={`/${link}`}>
                                    <Typography
                                        color="lightgrey"
                                        variant="base"
                                    >
                                        {navLink[link]}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.contacts}>
                    <Typography color="white" variant="h4">
                        Контакты
                    </Typography>
                    <Typography variant="base" color="lightgrey">
                        Создано с ❤️ для подготовки к орт для школьников
                        Кыргызстана
                    </Typography>
                </div>
            </div>
            <hr />
            <div className={styles.bottom}>
                <Typography weight="bold" color="lightgrey" variant="large">
                    The Day X
                </Typography>
            </div>
        </div>
    );
};
