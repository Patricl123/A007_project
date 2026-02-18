import { User } from 'lucide-react';
import { Container, Label, Typography } from 'shared/ui';
import styles from './ProfileBlock.module.scss';
import { useAuthStore } from 'widgets/login/store/useAuthStore';

export const ProfileBlock = () => {
    const { username } = useAuthStore();
    return (
        <Container className={styles.wrapper}>
            <div className={styles.item}>
                <div className={styles.title}>
                    <div className={styles.userIcon}>
                        <User color="#fafcfc" size={30} />
                    </div>
                    <Typography color="gradient" variant="h3">
                        Профиль пользователя
                    </Typography>
                </div>
                <Typography variant="small">
                    Информация о вашем прогрессе в изучении уроков
                </Typography>
            </div>
            <div className={styles.item}>
                <Label className={styles.label}>Имя пользователя:</Label>
                <Typography variant="base">{username}</Typography>
            </div>
        </Container>
    );
};
