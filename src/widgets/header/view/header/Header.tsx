import { type FC } from 'react';
import styles from './Header.module.scss';
import logo from 'shared/assets/images/mathGenieLogo.png';
import { Link } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';

export const Header: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Link to={'/'}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="mathGenie LOGO" />
                </div>
            </Link>
            <Navbar />
        </div>
    );
};
