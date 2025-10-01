import { useNavigate } from 'react-router-dom';

const StartQuiz = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <h1>Start Quiz</h1>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => navigate('/quiz')}
            >
                Start
            </button>
        </div>
    );
};

export default StartQuiz;
