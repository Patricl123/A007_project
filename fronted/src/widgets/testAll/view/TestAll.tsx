import { Container, Typography, TestCard } from 'shared/ui';
import styles from './TestAll.module.scss';
import {
    useAllTestQuery,
    useUserTestsQuery,
} from 'widgets/testGenerator/api/useTestQuery';

export const TestAll = () => {
    const { data: tests } = useAllTestQuery();
    const { data: userTests } = useUserTestsQuery();

    const hasUserTests =
        userTests && Array.isArray(userTests) && userTests.length > 0;

    return (
        <Container>
            <div className={styles.testAll}>
                <div className={styles.textPart}>
                    <Typography variant="h2" color="gradient-blue">
                        Доступные тесты
                    </Typography>
                    <Typography variant="large" color="muted">
                        Выберите тест для проверки своих знаний
                    </Typography>
                </div>

                <div className={styles.testList}>
                    {Array.isArray(tests) &&
                        tests.map((test, index) => (
                            <TestCard key={index} test={test} index={index} />
                        ))}
                </div>

                {hasUserTests && (
                    <div className={styles.userTestsSection}>
                        <div className={styles.userTestsHeader}>
                            <Typography variant="h2" color="gradient-blue">
                                Мои тесты
                            </Typography>
                            <Typography variant="large" color="muted">
                                Ваши созданные тесты для быстрого доступа
                            </Typography>
                        </div>

                        <div className={styles.userTestsList}>
                            {userTests.map((test, index) => (
                                <TestCard
                                    key={`user-${index}`}
                                    test={test}
                                    index={index}
                                    isUserTest={true}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};
