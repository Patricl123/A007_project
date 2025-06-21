import { useState } from 'react';
import styles from './TestIntroduction.module.scss';
import { Container, Typography } from 'shared/ui';
import { Calculator, Target, ChevronDown } from 'lucide-react';
import { useOutsideClick } from 'shared/hooks/useOutsideClick';

export const TestIntroduction = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedValues, setSelectedValues] = useState<{
        [key: string]: string;
    }>({
        '1': 'Выберите тему...',
        '2': 'Выберите уровень...',
    });

    const dropdownOptions: { [key: string]: string[] } = {
        '1': [
            'Алгебра',
            'Геометрия',
            'Тригонометрия',
            'Математический анализ',
            'Статистика',
            'Дискретная математика',
        ],
        '2': ['Начальный', 'Базовый', 'Средний', 'Продвинутый', 'Экспертный'],
    };

    const data = [
        {
            id: '1',
            title: 'Выберите тему',
            subtile: 'Определите область математики для изучения',
            icon: <Target />,
            actionValue: selectedValues['1'],
        },
        {
            id: '2',
            title: 'Уровень сложности',
            subtile: 'Выберите подходящий уровень для ваших знаний',
            icon: <Calculator />,
            actionValue: selectedValues['2'],
        },
    ];

    const dropDownRef = useOutsideClick<HTMLDivElement>(() =>
        setOpenDropdown(null),
    );

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
                        <div key={elem.id} className={styles.pickerContainer}>
                            <div className={styles.textArea}>
                                <div className={styles.title}>
                                    {elem.icon}{' '}
                                    <Typography variant="h4">
                                        {elem.title}
                                    </Typography>
                                </div>
                                <div className={styles.subtitle}>
                                    <Typography variant="base">
                                        {elem.subtile}
                                    </Typography>
                                </div>
                            </div>
                            <div
                                className={styles.dropdownWrapper}
                                ref={dropDownRef}
                            >
                                <div
                                    className={`${styles.toggle} ${openDropdown === elem.id ? styles.active : ''}`}
                                    onClick={() =>
                                        handleDropdownToggle(elem.id)
                                    }
                                >
                                    <p>{elem.actionValue}</p>
                                    <ChevronDown
                                        className={`${styles.chevron} ${openDropdown === elem.id ? styles.rotated : ''}`}
                                        size={20}
                                    />
                                </div>
                                <div
                                    className={`${styles.dropdown} ${openDropdown === elem.id ? styles.open : ''}`}
                                >
                                    {dropdownOptions[elem.id]?.map(
                                        (option, index) => (
                                            <div
                                                key={index}
                                                className={styles.dropdownItem}
                                                onClick={() =>
                                                    handleOptionSelect(
                                                        elem.id,
                                                        option,
                                                    )
                                                }
                                            >
                                                {option}
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
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
                    <button className={styles.button}>Начать тест</button>
                </div>
            </div>
        </Container>
    );
};
