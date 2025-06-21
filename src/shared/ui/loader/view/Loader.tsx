import styles from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loaderContent}>
                <div className={styles.mathSymbols}>
                    <span className={styles.symbol}>∫</span>
                    <span className={styles.symbol}>π</span>
                    <span className={styles.symbol}>√</span>
                    <span className={styles.symbol}>∑</span>
                </div>
                <div className={styles.progressBar}>
                    <div className={styles.progress}></div>
                </div>
            </div>
        </div>
    );
};
