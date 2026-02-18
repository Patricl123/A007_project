import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import type { InputProps } from '../types/types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            size = 'medium',
            type = 'text',
            placeholder,
            value,
            defaultValue,
            onChange,
            disabled = false,
            name,
            id,
            className,
            required = false,
            autoFocus = false,
            pattern,
            fullWidth = false,
            children,
            isPaddingLeft = false,
            ...props
        },
        ref,
    ) => {
        const inputClass = classNames(
            styles.input,
            {
                [styles.medium]: size === 'medium',
                [styles.short]: size === 'short',
                [styles.long]: size === 'long',
                [styles.disabled]: disabled,
                [styles.fullWidth]: fullWidth,
                [styles.isPaddingLeft]: isPaddingLeft,
            },
            className,
        );

        return (
            <div className={styles.wrapper}>
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    disabled={disabled}
                    name={name}
                    id={id}
                    required={required}
                    autoFocus={autoFocus}
                    pattern={pattern}
                    className={inputClass}
                    {...props}
                />
                {children && <div className={styles.icon}>{children}</div>}
            </div>
        );
    },
);

Input.displayName = 'Input';
