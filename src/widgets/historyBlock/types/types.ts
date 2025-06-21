interface IItem {
    name: string;
    id: number;
}
export interface ISubject {
    subject: IItem;
    level: 'Начальный' | 'Продвинутый' | 'Средний';
    resultPercent: number;
    correct: number;
    total: number;
    date: string;
}
