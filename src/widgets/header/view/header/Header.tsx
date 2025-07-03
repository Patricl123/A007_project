import { useEffect, useState, type FC } from 'react';
import styles from './Header.module.scss';
import logo from 'shared/assets/images/mathGenieLogo.png';
import { Link } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';

export const Header: FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 780);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 756);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.wrapper}>
            <Link to={'/'}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="mathGenie LOGO" />
                </div>
            </Link>
            {isMobile && <hr />}
            <Navbar />
        </div>
    );
};
