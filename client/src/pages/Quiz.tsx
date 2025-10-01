import type { Answer } from '../types/quiz';
import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { useNavigate } from 'react-router-dom';
import { useAnswerContext } from '../context/AnswerContext';
import Timer from '../components/Timer';

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [time, setTime] = useState(1 * 60);
    const { answers, setAnswers, setResults } = useAnswerContext();
    const navigate = useNavigate();

    //get Data from useQuiz hook and mutation to submit answers
    const { quizData, mutation } = useQuiz();
    const { isLoading, data } = quizData;
    const { mutateAsync } = mutation;

    //constantly get length of quiz data and current quiz id
    const length = data?.length ?? 0;
    const currentQuizId = data?.[currentIndex].id;
    const selectedQuizId = answers.find(
        (ans) => ans.quizId === currentQuizId
    )?.answer;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const answer: Answer = {
            quizId: currentQuizId ?? '',
            answer: Number(e.target?.value),
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
        const result = await mutateAsync(answers);
        setResults(result);
        navigate('/result');
    };

    //Handles Previous and Next Toggles
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
        <div className="flex flex-col items-center justify-start w-full h-full p-6">
            {isLoading && <div>Loading...</div>}

            <div className="w-full max-w-4xl flex flex-col gap-4 justify-center ">
                <div className="flex justify-between items-center">
                    <p className="text-left">
                        Questions {currentIndex + 1} of {length}
                    </p>
                    <Timer
                        onTimeUp={handleSubmit}
                        time={time}
                        setTime={setTime}
                    />
                </div>
                <p className="text-lg font-medium">
                    {currentIndex + 1}
                    {')'} {data?.[currentIndex]?.question}
                </p>
                <div className="flex flex-col gap-2">
                    {data?.[currentIndex].options.map((option, index) => {
                        return (
                            <div
                                key={index}
                                className={`option ${
                                    selectedQuizId === index
                                        ? '!bg-primary/20 !border-primary'
                                        : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    id={`option${index}`}
                                    name="radio_group"
                                    value={index}
                                    checked={selectedQuizId === index}
                                    onChange={handleChange}
                                    className="cursor-pointer py-3"
                                />
                                <label
                                    htmlFor={`option${index}`}
                                    className="w-full cursor-pointer py-3"
                                >
                                    {option}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full max-w-4xl flex justify-between mt-4">
                <div className="flex gap-4">
                    <button
                        className="btn"
                        disabled={currentIndex === 0}
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>
                    <button
                        className="btn"
                        disabled={currentIndex === length - 1}
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
                {currentIndex === length - 1 && (
                    <button className="btn" onClick={handleSubmit}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Quiz;
