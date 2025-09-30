import { getQuizes } from '../service/getQuizes.js';
import type { Request, Response } from 'express';
import { getScore } from '../service/getScore.js';

export const getQuizController = async (req: Request, res: Response) => {
    try {
        const questions = await getQuizes();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

export const submitAnswersController = async (req: Request, res: Response) => {
    const answers: number[] = req.body.answers;
    try {
        const score = await getScore(answers);
        res.json({ score });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate score' });
    }
};
