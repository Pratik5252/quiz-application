import express from 'express';
import cors from 'cors';
import prisma from './prisma/prismaClient.js';
import quizRoutes from './routes/quiz.js';

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);

app.use('/api', quizRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
