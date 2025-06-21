import type { ButtonProps } from '../types/IButton';
import styles from './Button.module.scss';
import type { FC } from 'react';

export const Button: FC<ButtonProps> = ({
    variant = 'default',
    size = 'default',
    className = '',
    children,
    ...rest
}) => {
    const classes = [styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
};
