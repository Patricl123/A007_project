import { Button, Container, Typography } from 'shared/ui';
import { ArrowRight, Brain, Calculator, Zap } from 'lucide-react';
import styles from './HeroBlock.module.scss';
import classNames from 'classnames';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeroBlock: FC = () => {
    const navigate = useNavigate();
    const list = [
        {
            title: 'Персонализированные',
            description:
                'Тесты адаптируются под ваш уровень знаний по всем предметам.',
            icon: (
                <Calculator
                    className={classNames(styles.listIcon, styles.oneI)}
                />
            ),
        },
        {
            title: 'Интерактивные',
            description:
                'Задавайте вопросы и получайте мгновенные ответы от ИИ.',
            icon: (
                <Brain className={classNames(styles.listIcon, styles.twoI)} />
            ),
        },
        {
            title: 'Адаптивные',
            description: 'Платформа подстраивается под ваш стиль обучения.',
            icon: (
                <Zap className={classNames(styles.listIcon, styles.threeI)} />
            ),
        },
    ];
    return (
        <section className={styles.heroSection}>
            <Container>
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
                        className={styles.askButton}
                        variant="default"
                        size="lg"
                        onClick={() => navigate('/subjects')}
                    >
                        <Calculator className={styles.icon} />
                        Начать обучение
                        <ArrowRight className={styles.icon} />
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        className={styles.askButton}
                        onClick={() => navigate('/questions')}
                    >
                        <Brain className={styles.icon} />
                        Задать вопрос ИИ
                    </Button>
                </div>
                <div className={styles.list}>
                    {list.map((item, index) => (
                        <div key={index} className={styles.listItem}>
                            <div
                                className={classNames(
                                    styles.listIconWrapper,
                                    styles[`item${index + 1}`],
                                )}
                            >
                                {item.icon}
                            </div>
                            <Typography
                                variant="h3"
                                weight="semibold"
                                className={styles.listTitle}
                            >
                                {item.title}
                            </Typography>
                            <Typography variant="base">
                                {item.description}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
