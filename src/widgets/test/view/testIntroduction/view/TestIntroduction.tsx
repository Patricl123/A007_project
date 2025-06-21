import { useState } from 'react';
import styles from './TestIntroduction.module.scss';
import { Button, Container, Loader, Typography } from 'shared/ui';
import { Calculator, Target } from 'lucide-react';
import { DropdownPicker } from '../../dropdownPicker/view/DropdownPicker';
import { useAllTopicsQuery } from 'widgets/test/api/useTestQuery';

export const TestIntroduction = () => {
    const { data: topics, isLoading } = useAllTopicsQuery();

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const [selectedValues, setSelectedValues] = useState<{
        [key: string]: string;
    }>({
        '1': 'Выберите тему...',
        '2': 'Выберите уровень...',
    });

    const dropdownOptions: { [key: string]: string[] } = {
        '1': topics ? topics.map((topic) => topic.name) : [],
        '2': ['Начальный', 'Средний', 'Продвинутый'],
    };

    const data = [
        {
            id: '1',
            title: 'Выберите тему',
            subtitle: 'Определите область математики для изучения',
            icon: <Target />,
            actionValue: selectedValues['1'],
        },
        {
            id: '2',
            title: 'Уровень сложности',
            subtitle: 'Выберите подходящий уровень для ваших знаний',
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

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Container>
            <div className={styles.introduction}>
                <div className={styles.textPart}>
                    <Typography variant="h2">Генератор тестов</Typography>
                    <Typography variant="base">
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
                <div className={styles.startPart}>
                    <div className={styles.icon}>
                        <Calculator
                            color="#FFFFFF"
                            className={styles.iconCalculator}
                        />
                    </div>
                    <div className={styles.textValue}>
                        <Typography variant="h3">Готовы начать?</Typography>
                        <Typography variant="base">
                            ИИ сгенерирует персонализированные вопросы на основе
                            выбранной темы и уровня. После каждого ответа вы
                            получите объяснение.
                        </Typography>
                    </div>
                    <Button variant="default">
                        <Typography variant="small" color="white">
                            Пройти тест
                        </Typography>
                    </Button>
                </div>
            </div>
        </Container>
    );
};
