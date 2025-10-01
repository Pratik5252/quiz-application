import React, { createContext, useContext, useState } from 'react';
import type { Answer, ScoreResponse } from '../types/quiz';

type AnswerContextType = {
    answers: Answer[];
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
    results: ScoreResponse | undefined;
    setResults: React.Dispatch<React.SetStateAction<ScoreResponse | undefined>>;
};

const AnswerContext = createContext<AnswerContextType | null>(null);

export const AnswerProvider = ({ children }: { children: React.ReactNode }) => {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [results, setResults] = useState<ScoreResponse | undefined>();

    return (
        <AnswerContext.Provider
            value={{ answers, setAnswers, results, setResults }}
        >
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
