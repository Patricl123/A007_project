import type { ICard } from '../types/ICard';
import styles from './Card.module.scss';

export const Card = ({ children, className, onClick }: ICard) => {
    return (
        <div onClick={onClick} className={`${styles.card} ${className}`}>
            {children}
        </div>
    );
};
