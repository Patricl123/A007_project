import type { ICard } from '../types/ICard';
import styles from './Card.module.scss';

export const Card = ({ children, className }: ICard) => {
    return <div className={`${styles.card} ${className}`}>{children}</div>;
};
