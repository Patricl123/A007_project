import type { FC, ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Button, Container, Typography } from 'shared/ui';
import styles from './AskAi.module.scss';
import { useAskAiQuery, usePopularQuestionsQuery } from '../api/useAskAiQuery';
import { Brain, Lightbulb, BookOpen, Calculator, Send } from 'lucide-react';

import type { PopularQuestion, ListAiFeature } from '../types/IAskAi';

export const AskAi: FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const { data, isFetching, error, refetch } = useAskAiQuery(currentQuestion);
    const { data: popularQuestions, isLoading: isPopularLoading } =
        usePopularQuestionsQuery();

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (question.trim()) {
            setCurrentQuestion(question);
            await refetch();
            setQuestion('');
        }
    };
    const listAi: ListAiFeature[] = [
        { icon: '#3b82f6', text: 'Решение уравнений' },
        { icon: '#a855f7', text: 'Геометрические задачи' },
        { icon: '#10b981', text: 'Статистика и вероятности' },
        { icon: '#f59e42', text: 'Математический анализ' },
    ];

    return (
        <section className={styles.askAiSection}>
            <Container>
                <Typography variant="h2" className={styles.title}>
                    ИИ-помощник по наукам
                </Typography>
                <Typography variant="large">
                    Задайте любой вопрос по различным предметам и получите
                    подробное объяснение
                </Typography>
                <div className={styles.inner}>
                    <div className={styles.questionBlock}>
                        <form
                            className={styles.inputBlock}
                            onSubmit={handleSubmit}
                        >
                            <div className={styles.inputTitle}>
                                <Brain className={styles.icon} />
                                <Typography variant="h3">Ваш вопрос</Typography>
                            </div>
                            <Typography variant="base">
                                Опишите задачу или вопрос по любому предмету как
                                можно подробнее
                            </Typography>
                            <textarea
                                className={styles.input}
                                placeholder="Например: Как найти корни уравнения x² - 4x + 3 = 0?"
                                value={question}
                                onChange={handleInput}
                                rows={4}
                                disabled={isFetching}
                            />
                            <Button
                                type="submit"
                                className={styles.sendButton}
                                disabled={!question.trim() || isFetching}
                            >
                                {isFetching ? (
                                    <>
                                        <span className={styles.loader} />
                                        Анализирую...
                                    </>
                                ) : (
                                    <>
                                        <Send className={styles.sendIcon} />
                                        Получить ответ
                                    </>
                                )}
                            </Button>
                        </form>
                        {error && (
                            <div className={styles.error}>{error.message}</div>
                        )}
                        {data && (
                            <div className={styles.answerBlock}>
                                <div className={styles.answerTitle}>
                                    <Lightbulb className={styles.answerIcon} />
                                    Ответ ИИ
                                </div>
                                <div className={styles.answerContent}>
                                    {data.answer}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.toolsBlock}>
                        <div className={styles.popularQuestions}>
                            <div className={styles.popularTitle}>
                                <BookOpen className={styles.icon} />
                                <Typography variant="h3">
                                    Популярные вопросы
                                </Typography>
                            </div>
                            <Typography variant="base">
                                Нажмите на вопрос, чтобы использовать его
                            </Typography>
                            <ul className={styles.questionsList}>
                                {isPopularLoading && (
                                    <li className={styles.noQuestions}>
                                        <span className={styles.loader} />
                                    </li>
                                )}
                                {Array.isArray(popularQuestions) &&
                                    popularQuestions.length === 0 &&
                                    !isPopularLoading && (
                                        <li>
                                            <Typography variant="base">
                                                Нет популярных вопросов
                                            </Typography>
                                        </li>
                                    )}
                                {Array.isArray(popularQuestions) &&
                                    popularQuestions.map(
                                        (
                                            item: PopularQuestion,
                                            idx: number,
                                        ) => (
                                            <li
                                                key={item._id || idx}
                                                className={styles.questionItem}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setQuestion(
                                                            item.question,
                                                        );
                                                        setCurrentQuestion(
                                                            item.question,
                                                        );
                                                        refetch();
                                                    }}
                                                >
                                                    {item.question}
                                                </button>
                                            </li>
                                        ),
                                    )}
                            </ul>
                        </div>
                        <div className={styles.aiFeatures}>
                            <Typography variant="h3">Возможности ИИ</Typography>
                            <ul className={styles.featuresList}>
                                {listAi.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className={styles.featureItem}
                                    >
                                        <Calculator color={item.icon} />
                                        <Typography variant="base">
                                            {item.text}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
