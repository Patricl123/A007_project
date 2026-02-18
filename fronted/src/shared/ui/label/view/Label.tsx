import { forwardRef } from 'react';
import type { LabelProps } from '../types/types';
import classNames from 'classnames';
import styles from './Label.module.scss';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {
        const labelClass = classNames(styles.label, className, {
            [styles.error]: variant == 'error',
            [styles.disabled]: variant == 'disabled',
        });
        return (
            <label ref={ref} className={labelClass} {...props}>
                {children}
            </label>
        );
    },
);

Label.displayName = 'Label';
