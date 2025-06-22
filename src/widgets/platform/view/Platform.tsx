import { Typography } from 'shared/ui';
import styles from './Platform.module.scss';
import { Brain, Calculator, Target, TrendingUp } from 'lucide-react';

export const Platform = () => {
    const features = [
        {
            icon: Calculator,
            title: 'Генерация тестов',
            description:
                'Создавайте персонализированные тесты по математике, физике, химии, биологии и другим предметам',
            color: '#3b82f6',
        },
        {
            icon: Brain,
            title: 'ИИ-помощник',
            description:
                'Задавайте вопросы и получайте подробные пошаговые объяснения от искусственного интеллекта по любому предмету',
            color: '#6b5ce5',
        },
        {
            icon: Target,
            title: 'Адаптивное обучение',
            description:
                'Система автоматически подбирает сложность заданий на основе ваших результатов во всех дисциплинах',
            color: '#4f46e5',
        },
        {
            icon: TrendingUp,
            title: 'Отслеживание прогресса',
            description:
                'Следите за своими достижениями и анализируйте прогресс в изучении различных наук',
            color: '#10b981',
        },
    ];
    return (
        <section className={styles.platformSection}>
            <Typography variant="h2" className={styles.titleMain}>
                Возможности платформы
            </Typography>
            <Typography variant="large" className={styles.subtitle}>
                MathGenie предлагает полный спектр инструментов для эффективного
                изучения различных наук
            </Typography>
            <div className={styles.listPlatform}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.card}>
                        <div
                            className={styles.iconWrapper}
                            style={{ backgroundColor: feature.color }}
                        >
                            <feature.icon className={styles.icon} />
                        </div>
                        <Typography
                            variant="h4"
                            weight="semibold"
                            className={styles.title}
                        >
                            {feature.title}
                        </Typography>
                        <Typography
                            variant="base"
                            className={styles.description}
                        >
                            {feature.description}
                        </Typography>
                    </div>
                ))}
            </div>
        </section>
    );
};
