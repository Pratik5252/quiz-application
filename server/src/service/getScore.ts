import prisma from '../prisma/prismaClient.js';

export const getScore = async (answers: number[]) => {
    try {
        const questions = await prisma.quiz.findMany({
            orderBy: { id: 'asc' },
        });
        let score = 0;
        questions.forEach((question, index) => {
            if (question.answer === answers[index]) score++;
        });
        return score;
    } catch (error) {
        console.error('Error calculating score:', error);
        throw error;
    }
};
