import React from 'react';
import styles from './Typography.module.scss';
import type { FC } from 'react';
import type { TypographyProps } from '../types/ITypography';

const tagMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    large: 'p',
    base: 'p',
    small: 'p',
    smallXs: 'p',
} as const;

export const Typography: FC<TypographyProps> = ({
    variant,
    weight,
    color,
    className,
    children,
}) => {
    const Tag = tagMap[variant] || 'p';
    const classes = [
        styles[variant],
        weight && styles[weight],
        color && styles[color],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return React.createElement(Tag, { className: classes }, children);
};
