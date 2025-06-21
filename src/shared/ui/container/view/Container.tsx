import type { FC } from 'react';
import styles from './Container.module.scss';
import type { IContainerProps } from '../types/IContainerProps';
import classNames from 'classnames';

export const Container: FC<IContainerProps> = ({ children, className }) => {
    return (
        <div className={classNames(styles.container, className)}>
            {children}
        </div>
    );
};
