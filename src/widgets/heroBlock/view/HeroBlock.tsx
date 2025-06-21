import { Typography } from 'shared/ui';
import { Brain, Zap } from 'lucide-react';
import styles from './HeroBlock.module.scss';
import type { FC } from 'react';

export const HeroBlock: FC = () => {
    return (
        <section>
            <div className={styles.brain}>
                <div className={styles.left}>
                    <Brain className={styles.brain} />
                </div>
                <div className={styles.right}>
                    <Zap className={styles.icon} />
                </div>
            </div>
            <Typography variant="h1">Изучайте науки с MathGenie</Typography>
        </section>
    );
};
