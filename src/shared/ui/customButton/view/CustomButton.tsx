import styles from './CustomButton.module.scss';
import { type CustomButtonProps } from '../types/types';
import { type FC } from 'react';
import classNames from 'classnames';

export const CustomButton: FC<CustomButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    onClick,
    disabled = false,
    className = '',
}) => {
    const buttonClasses = classNames(
        styles.button,
        variant && styles[variant],
        size && styles[size],
        className,
    );
    return (
        <button className={buttonClasses} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};
