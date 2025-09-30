import prisma from '../prisma/prismaClient.js';
import type { Answer } from '../types/answer.js';

export const getScore = async (answers: Answer[]) => {
    try {
        let score = 0;
        for (const answer of answers) {
            const question = await prisma.quiz.findUnique({
                where: { id: answer.questionId },
            });
            if (question && question.answer === answer.answer) score++;
        }
        return score;
    } catch (error) {
        console.error('Error calculating score:', error);
        throw error;
    }
};
