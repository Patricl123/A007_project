import { useState } from 'react';
import styles from './TestGenerator.module.scss';
import { Container, Typography, Input } from 'shared/ui';
import { Calculator, Target, Sparkles } from 'lucide-react';
import { DropdownPicker } from '../../dropdownPicker/view/DropdownPicker';
import { useAllTopicsQuery } from 'widgets/testGenerator/api/useTestQuery';
import { useGenerateTestMutation } from 'widgets/testGenerator/api/useGenerateTestMutation';
import classNames from 'classnames';

export const TestGenerator = () => {
    const { data: topics } = useAllTopicsQuery();
    const generateTestMutation = useGenerateTestMutation();

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const [selectedValues, setSelectedValues] = useState<{
        [key: string]: string;
    }>({
        '1': 'Выберите тему...',
        '2': 'Выберите уровень...',
    });

    const [customTopicName, setCustomTopicName] = useState('');
    const [customTopicDescription, setCustomTopicDescription] = useState('');

    const dropdownOptions: { [key: string]: string[] } = {
        '1': topics
            ? ['Свой топик', ...topics.map((topic) => topic.name)]
            : ['Свой топик'],
        '2': ['Начальный', 'Средний', 'Продвинутый'],
    };

    const data = [
        {
            id: '1',
            title: 'Выберите тему',
            subtitle: 'Определите тему для изучения',
            icon: <Target />,
            actionValue: selectedValues['1'],
        },
        {
            id: '2',
            title: 'Уровень сложности',
            subtitle: 'Выберите подходящий уровень',
            icon: <Calculator />,
            actionValue: selectedValues['2'],
        },
    ];

    const handleDropdownToggle = (id: string) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleOptionSelect = (id: string, option: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [id]: option,
        }));
        setOpenDropdown(null);
    };

    const canStartTest =
        ((selectedValues['1'] !== 'Выберите тему...' &&
            selectedValues['1'] !== 'Свой топик') ||
            (selectedValues['1'] === 'Свой топик' &&
                customTopicName.trim() &&
                customTopicDescription.trim())) &&
        selectedValues['2'] !== 'Выберите уровень...';

    const handleGenerateTest = () => {
        if (!canStartTest || !topics) return;

        if (selectedValues['1'] === 'Свой топик') {
            const payload = {
                difficulty: selectedValues['2'].toLowerCase(),
                customTopicName: customTopicName.trim(),
                customTopicDescription: customTopicDescription.trim(),
            };
            generateTestMutation.mutate(payload);
            return;
        }

        const selectedTopic = topics.find(
            (topic) => topic.name === selectedValues['1'],
        );

        if (!selectedTopic) {
            console.error('Выбранная тема не найдена!');
            return;
        }

        const payload = {
            topicId: selectedTopic._id,
            difficulty: selectedValues['2'].toLowerCase(),
        };

        generateTestMutation.mutate(payload);
    };

    return (
        <Container>
            <div className={styles.introduction}>
                <div className={styles.textPart}>
                    <Typography variant="h2" color="gradient-blue">
                        Генератор тестов
                    </Typography>
                    <Typography variant="large" color="muted">
                        Выберите тему и уровень сложности для создания
                        персонализированного теста
                    </Typography>
                </div>

                <div className={styles.choosePart}>
                    {data.map((elem) => (
                        <DropdownPicker
                            key={elem.id}
                            id={elem.id}
                            title={elem.title}
                            subtitle={elem.subtitle}
                            icon={elem.icon}
                            actionValue={elem.actionValue}
                            options={dropdownOptions[elem.id] || []}
                            isOpen={openDropdown === elem.id}
                            onToggle={handleDropdownToggle}
                            onOptionSelect={handleOptionSelect}
                        />
                    ))}
                </div>
                {
                    <div
                        className={classNames(styles.customTopicFields, {
                            [styles.customTopicFieldsHidden]:
                                selectedValues['1'] !== 'Свой топик',
                        })}
                    >
                        <div className={styles.inputWrapper}>
                            <div className={styles.inputContainer}>
                                <Input
                                    placeholder="Введите название вашей темы"
                                    value={customTopicName}
                                    onChange={(e) =>
                                        setCustomTopicName(e.target.value)
                                    }
                                    fullWidth
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.textareaWrapper}>
                            <div className={styles.textareaContainer}>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Опишите, что должен включать тест"
                                    value={customTopicDescription}
                                    onChange={(e) =>
                                        setCustomTopicDescription(
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                }

                <div className={styles.startPart}>
                    <div className={styles.floatingElements}>
                        <div className={styles.element}></div>
                        <div className={styles.element}></div>
                        <div className={styles.element}></div>
                        <div className={styles.element}></div>
                    </div>

                    <div className={styles.icon}>
                        <Calculator className={styles.iconCalculator} />
                    </div>

                    <div className={styles.textValue}>
                        <Typography variant="h3">
                            {canStartTest
                                ? 'Все готово к запуску!'
                                : 'Готовы начать?'}
                        </Typography>
                        <Typography variant="base">
                            {canStartTest
                                ? `ИИ создаст персонализированный тест по теме "${selectedValues['1']}" на ${selectedValues['2'].toLowerCase()} уровне. Каждый вопрос будет сопровождаться подробным объяснением.`
                                : 'ИИ сгенерирует персонализированные вопросы на основе выбранной темы и уровня. После каждого ответа вы получите объяснение.'}
                        </Typography>
                    </div>

                    <button
                        className={styles.actionButton}
                        disabled={
                            !canStartTest || generateTestMutation.isPending
                        }
                        onClick={handleGenerateTest}
                    >
                        {generateTestMutation.isPending ? (
                            'Создание теста...'
                        ) : (
                            <>
                                <Sparkles
                                    size={16}
                                    style={{ marginRight: '8px' }}
                                />
                                {canStartTest
                                    ? 'Начать тест'
                                    : 'Выберите параметры'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Container>
    );
};
