import prisma from '../prisma/prismaClient.js';
import type { Answer } from '../types/answer.js';

export const getScore = async (
    answers: Answer[]
): Promise<{ score: number; results: any[] }> => {
    try {
        let score = 0;
        const results = await prisma.quiz.findMany({
            select: { id: true, answer: true },
        });
        for (const answer of answers) {
            const question = await prisma.quiz.findUnique({
                where: { id: answer.quizId },
            });
            if (question && question.answer === answer.answer) score++;
        }
        return { score, results };
    } catch (error) {
        console.error('Error calculating score:', error);
        throw error;
    }
};
