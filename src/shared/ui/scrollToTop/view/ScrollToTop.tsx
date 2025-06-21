import { useEffect, useState } from 'react';
import styles from './ScrollToTop.module.scss';
import { ArrowBigUp } from 'lucide-react';
import { Button } from 'shared/ui/button/view/Button';

export const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <Button
            className={styles.scrollToTop}
            onClick={handleClick}
            variant="default"
            size="icon"
            aria-label="Scroll to top"
        >
            <ArrowBigUp size={28} color="#fff" />
        </Button>
    );
};
