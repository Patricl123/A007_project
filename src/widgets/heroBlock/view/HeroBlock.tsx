import { Button, Typography } from 'shared/ui';
import { ArrowRight, Brain, Calculator, Zap } from 'lucide-react';
import styles from './HeroBlock.module.scss';
import classNames from 'classnames';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeroBlock: FC = () => {
    const navigate = useNavigate();
    return (
        <section className={styles.heroSection}>
            <div className={styles.gridBg}></div>

            <div className={styles.container}>
                <div className={styles.inner}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.brainContainer}>
                            <div className={styles.brainIcon}>
                                <Brain className={styles.brainSvg} />
                            </div>
                            <div className={styles.zapIcon}>
                                <Zap className={styles.zapSvg} />
                            </div>
                        </div>
                    </div>
                </div>

                <Typography variant="h1">
                    Изучайте науки с{' '}
                    <span className={styles.gradientText}>MathGenie</span>
                </Typography>

                <Typography variant="large" className={styles.description}>
                    Интерактивная платформа с искусственным интеллектом для
                    эффективного изучения математики, физики, химии, биологии и
                    других предметов. Генерируйте тесты, задавайте вопросы и
                    отслеживайте прогресс.
                </Typography>

                <div className={styles.buttonGroup}>
                    <Button
                        className={styles.startButton}
                        onClick={() => navigate('/subjects')}
                    >
                        <Calculator className={styles.icon} />
                        Начать обучение
                        <ArrowRight className={styles.icon} />
                    </Button>

                    <Button
                        className={styles.askButton}
                        onClick={() => navigate('/ask-ai')}
                    >
                        <Brain className={styles.icon} />
                        Задать вопрос ИИ
                    </Button>
                </div>
            </div>
            <div className={styles.list}>
                <div className={styles.listItem}>
                    <div
                        className={classNames(
                            styles.listIconWrapper,
                            styles.one,
                        )}
                    >
                        <Calculator
                            className={classNames(styles.listIcon, styles.oneI)}
                        />
                    </div>
                    <Typography
                        variant="h3"
                        weight="semibold"
                        className={styles.listTitle}
                    >
                        Персонализированные
                    </Typography>
                    <Typography
                        variant="base"
                        className={styles.listDescription}
                    >
                        Тесты адаптируются под ваш уровень знаний по всем
                        предметам
                    </Typography>
                </div>
                <div className={styles.listItem}>
                    <div
                        className={classNames(
                            styles.listIconWrapper,
                            styles.two,
                        )}
                    >
                        <Brain
                            className={classNames(styles.listIcon, styles.twoI)}
                        />
                    </div>
                    <Typography
                        variant="h3"
                        weight="semibold"
                        className={styles.listTitle}
                    >
                        ИИ-помощник
                    </Typography>
                    <Typography
                        variant="base"
                        className={styles.listDescription}
                    >
                        Получайте подробные объяснения от ИИ по любому предмету
                    </Typography>
                </div>
                <div className={styles.listItem}>
                    <div
                        className={classNames(
                            styles.listIconWrapper,
                            styles.three,
                        )}
                    >
                        <Zap
                            className={classNames(
                                styles.listIcon,
                                styles.threeI,
                            )}
                        />
                    </div>
                    <Typography
                        variant="h3"
                        weight="semibold"
                        className={styles.listTitle}
                    >
                        {' '}
                        Быстрый прогресс
                    </Typography>
                    <Typography
                        variant="base"
                        className={styles.listDescription}
                    >
                        Отслеживайте свои достижения в реальном времени
                    </Typography>
                </div>
            </div>
        </section>
    );
};
