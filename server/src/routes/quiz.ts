import { Router } from 'express';
import {
    getQuizController,
    submitAnswersController,
} from '../controllers/quizController.js';

const router: Router = Router();

router.get('/questions', getQuizController);
router.post('/submit', submitAnswersController);

export default router;
