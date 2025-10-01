import { useMutation, useQuery } from '@tanstack/react-query';
import type { QuizType } from '../types/quiz';
import { fetchQuizes, submitAnswers } from '../api/quiz';

export const useQuiz = () => {
    const quizData = useQuery<QuizType[]>({
        queryKey: ['quizes'],
        queryFn: fetchQuizes,
    });

    const mutation = useMutation({
        mutationKey: ['submitAnswers'],
        mutationFn: submitAnswers,
    });

    return { quizData, mutation };
};
