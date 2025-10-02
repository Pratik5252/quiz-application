// tests/unit/getScore.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getScore } from '../src/service/getScore.ts';
import { mockPrisma } from './__mocks__/prisma.ts';

interface Answer {
    quizId: string;
    answer: number;
}

describe('getScore Function', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockCorrectAnswers = [
        { id: 'quiz-1', answer: 2 },
        { id: 'quiz-2', answer: 0 },
        { id: 'quiz-3', answer: 1 },
    ];

    it('should calculate correct score for all correct answers', async () => {
        const userAnswers: Answer[] = [
            { quizId: 'quiz-1', answer: 2 },
            { quizId: 'quiz-2', answer: 0 },
            { quizId: 'quiz-3', answer: 1 },
        ];

        mockPrisma.quiz.findMany.mockResolvedValue(mockCorrectAnswers);
        mockPrisma.quiz.findUnique
            .mockResolvedValueOnce({ id: 'quiz-1', answer: 2 })
            .mockResolvedValueOnce({ id: 'quiz-2', answer: 0 })
            .mockResolvedValueOnce({ id: 'quiz-3', answer: 1 });

        const result = await getScore(userAnswers);

        expect(result.score).toBe(3);
        expect(result.correct_answers).toEqual(mockCorrectAnswers);
    });

    it('should calculate partial score for mixed answers', async () => {
        const userAnswers: Answer[] = [
            { quizId: 'quiz-1', answer: 2 },
            { quizId: 'quiz-2', answer: 1 },
            { quizId: 'quiz-3', answer: 1 },
        ];

        mockPrisma.quiz.findMany.mockResolvedValue(mockCorrectAnswers);
        mockPrisma.quiz.findUnique
            .mockResolvedValueOnce({ id: 'quiz-1', answer: 2 })
            .mockResolvedValueOnce({ id: 'quiz-2', answer: 0 })
            .mockResolvedValueOnce({ id: 'quiz-3', answer: 1 });

        const result = await getScore(userAnswers);

        expect(result.score).toBe(2);
    });

    it('should handle empty answers', async () => {
        const userAnswers: Answer[] = [];

        mockPrisma.quiz.findMany.mockResolvedValue(mockCorrectAnswers);

        const result = await getScore(userAnswers);

        expect(result.score).toBe(0);
        expect(result.correct_answers).toEqual(mockCorrectAnswers);
    });
});
