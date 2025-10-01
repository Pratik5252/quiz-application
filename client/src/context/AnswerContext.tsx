import React, { createContext, useContext, useState } from 'react';
import type { Answer } from '../types/quiz';

type AnswerContextType = {
    answers: { quizId: string; answer: number }[];
    setAnswers: React.Dispatch<
        React.SetStateAction<{ quizId: string; answer: number }[]>
    >;
};

const AnswerContext = createContext<AnswerContextType | null>(null);

export const AnswerProvider = ({ children }: { children: React.ReactNode }) => {
    const [answers, setAnswers] = useState<Answer[]>([]);

    return (
        <AnswerContext.Provider value={{ answers, setAnswers }}>
            {children}
        </AnswerContext.Provider>
    );
};

export const useAnswerContext = () => {
    const context = useContext(AnswerContext);
    if (!context) {
        throw new Error(
            'useAnswerContext must be used within an AnswerProvider'
        );
    }
    return context;
};
