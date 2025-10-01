import type { Answer, QuizType, ScoreResponse } from '../types/quiz';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchQuizes = async (): Promise<QuizType[]> => {
    try {
        const response = await fetch(`${API_URL}/api/questions`);
        if (!response.ok) {
            throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
};

export const submitAnswers = async (
    answers: Answer[]
): Promise<ScoreResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });
        if (!response.ok) {
            throw new Error('Failed to submit answers');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting answers:', error);
        throw error;
    }
};
