import { useState } from 'react';
import styles from './TestIntroduction.module.scss';
import { Container } from 'shared/ui';
import { Calculator, Target, ChevronDown } from 'lucide-react';

export const TestIntroduction = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedValues, setSelectedValues] = useState({
        1: 'Выберите тему...',
        2: 'Выберите уровень...',
    });

    const dropdownOptions = {
        1: [
            'Алгебра',
            'Геометрия',
            'Тригонометрия',
            'Математический анализ',
            'Статистика',
            'Дискретная математика',
        ],
        2: ['Начальный', 'Базовый', 'Средний', 'Продвинутый', 'Экспертный'],
    };

    const data = [
        {
            id: 1,
            title: 'Выберите тему',
            subtile: 'Определите область математики для изучения',
            icon: <Target />,
            actionValue: selectedValues[1],
        },
        {
            id: 2,
            title: 'Уровень сложности',
            subtile: 'Выберите подходящий уровень для ваших знаний',
            icon: <Calculator />,
            actionValue: selectedValues[2],
        },
    ];

    const handleDropdownToggle = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleOptionSelect = (id, option) => {
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
                    <h2>Генератор тестов</h2>
                    <p>
                        Выберите тему и уровень сложности для создания
                        персонализированного теста
                    </p>
                </div>
                <div className={styles.choosePart}>
                    {data.map((elem) => (
                        <div key={elem.id} className={styles.pickerContainer}>
                            <div className={styles.textArea}>
                                <div className={styles.title}>
                                    {elem.icon} <h3>{elem.title}</h3>
                                </div>
                                <div className={styles.subtitle}>
                                    <p>{elem.subtile}</p>
                                </div>
                            </div>
                            <div className={styles.dropdownWrapper}>
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
                        <h3>Готовы начать?</h3>
                        <p>
                            ИИ сгенерирует персонализированные вопросы на основе
                            выбранной темы и уровня. После каждого ответа вы
                            получите объяснение.
                        </p>
                    </div>
                    <button className={styles.button}>Начать тест</button>
                </div>
            </div>
        </Container>
    );
};
