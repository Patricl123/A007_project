import type { ReactNode } from 'react';

export type TypographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'large'
    | 'base'
    | 'small'
    | 'smallXs';

export type TypographyWeight = 'bold' | 'semibold' | 'regular';
export type TypographyColor =
    | 'muted'
    | 'secondary'
    | 'white'
    | 'gradient'
    | 'gradient-blue'
    | 'lightgrey';

export interface TypographyProps {
    variant: TypographyVariant;
    weight?: TypographyWeight;
    color?: TypographyColor;
    className?: string;
    children: ReactNode;
}
