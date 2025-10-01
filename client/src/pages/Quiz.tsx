import type { Answer, ScoreResponse } from '../types/quiz';
import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { useNavigate } from 'react-router-dom';
import { useAnswerContext } from '../context/AnswerContext';

const Quiz = () => {
    // const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { answers, setAnswers } = useAnswerContext();
    const navigate = useNavigate();
    const { quizData, mutation } = useQuiz();
    const { isLoading, data } = quizData;
    const { mutateAsync } = mutation;

    const length = data?.length ?? 0;
    const currentQuizId = data?.[currentIndex].id;
    const selectedQuizId = answers.find(
        (ans) => ans.quizId === currentQuizId
    )?.answer;

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const answer: Answer = {
            quizId: currentQuizId ?? '',
            answer: Number(e.target.value),
        };
        setAnswers((prev) => {
            const existingAnswer = prev.findIndex(
                (quiz) => quiz.quizId === answer.quizId
            );
            if (existingAnswer !== -1) {
                const updatedAnswer = [...prev];
                updatedAnswer[existingAnswer] = answer;
                return updatedAnswer;
            }

            return [...prev, answer];
        });
    };

    const handleSubmit = async () => {
        const result: ScoreResponse = await mutateAsync(answers);
        navigate('/result', { state: { score: result } });
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };
    const handleNext = () => {
        if (currentIndex < length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            <div>
                <p>{data?.[currentIndex]?.question}</p>
                <div className="flex flex-col">
                    {data?.[currentIndex].options.map((option, index) => {
                        return (
                            <div
                                key={index}
                                className="flex  items-center gap-1"
                            >
                                <input
                                    type="radio"
                                    id={`option${index}`}
                                    name="radio_group"
                                    value={index}
                                    checked={selectedQuizId === index}
                                    onChange={handelChange}
                                />
                                <label htmlFor={`option${index}`}>
                                    {option}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
                {currentIndex === length - 1 && (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default Quiz;
