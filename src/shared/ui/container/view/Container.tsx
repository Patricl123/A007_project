import type { FC } from 'react';
import classNames from 'classnames';
import styles from './Container.module.scss';
import type { ContainerProps } from '../types/Container';

export const Container: FC<ContainerProps> = ({ children, className = '' }) => {
    return (
        <div className={classNames(styles.container, className)}>
            {children}
        </div>
    );
};
