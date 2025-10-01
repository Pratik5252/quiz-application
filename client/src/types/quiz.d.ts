export type QuizType = {
    id: string;
    question: string;
    options: string[];
};

export type Answer = {
    quizId: string;
    answer: number;
};

export type ScoreResponse = {
    score: number;
    results: Answer[];
};
