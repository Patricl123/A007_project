// Loader.jsx
import styles from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.container}>
                <div className={styles.outerOrbit}></div>
                <div className={styles.middleOrbit}></div>
                <div className={styles.orbit}>
                    <div className={styles.core}></div>
                    <div
                        className={`${styles.electron} ${styles.electron1}`}
                    ></div>
                    <div
                        className={`${styles.electron} ${styles.electron2}`}
                    ></div>
                    <div
                        className={`${styles.electron} ${styles.electron3}`}
                    ></div>
                    <div
                        className={`${styles.electron} ${styles.electron4}`}
                    ></div>
                </div>
                <div className={styles.glow}></div>
            </div>
        </div>
    );
};
