import type { Quiz } from '@prisma/client';
import prisma from '../prisma/prismaClient.js';

export const getQuizes = async (): Promise<Omit<Quiz, 'answer'>[]> => {
    try {
        const questions = await prisma.quiz.findMany({
            select: {
                id: true,
                question: true,
                options: true,
            },
        });
        return questions;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        throw error;
    }
};
