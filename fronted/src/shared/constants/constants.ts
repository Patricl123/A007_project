export const BASE_URL = import.meta.env.VITE_API_URL;

export const routes = {
    home: '/',
    subjects: '/subjects',
    test: '/test',
    profile: '/profile',
    questions: '/questions',
    login: '/login',
    testMore: '/test/:testId',
    testReview: '/test/:testId/review',
};

export const navLink = {
    test: 'Тесты',
    questions: 'Вопросы ИИ',
    profile: 'Профиль',
};
