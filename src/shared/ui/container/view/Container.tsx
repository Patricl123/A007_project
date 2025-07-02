import type { FC } from 'react';
import styles from './Container.module.scss';
import classNames from 'classnames';
import type { ContainerProps } from '../types/IContainer';

export const Container: FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={classNames(styles.container, className)}>
            {children}
        </div>
    );
};
