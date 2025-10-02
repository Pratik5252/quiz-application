import express from 'express';
import cors from 'cors';
import quizRoutes from './routes/quiz.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(
    cors({
        origin: process.env.APP_URL,
    })
);

app.use('/api', quizRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
