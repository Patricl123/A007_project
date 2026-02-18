export interface AskAiResponse {
    answer: string;
}

export interface PopularQuestion {
    _id: string;
    question: string;
    answer?: string;
    user?: string;
    count?: number;
    createdAt?: string;
}

export interface ListAiFeature {
    icon: string;
    text: string;
}
