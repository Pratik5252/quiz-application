import { useNavigate } from 'react-router-dom';
import { useAnswerContext } from '../context/AnswerContext';
import { useQuiz } from '../hooks/useQuiz';
import ShowResult from '../components/ShowResult';

const Result = () => {
    const { quizData } = useQuiz();
    const { answers, results, clearAnswers } = useAnswerContext();
    const { data } = quizData;
    const navigate = useNavigate();

    const handleRestart = () => {
        clearAnswers();
        navigate('/');
    };

    return (
        <div className="w-full h-full overflow-x-hidden p-6">
            <h1 className="text-2xl font-bold">Quiz Results</h1>
            <p className="text-black/80">
                Your answers have been submitted successfully 🎉
            </p>

            <div className="w-full flex justify-between items-center mt-4">
                <p className="text-2xl font-bold font-satoshi">
                    Score :{' '}
                    <span className="bg-green-100 text-lg font-bold border border-green-500 px-2 py-1 rounded">
                        {results?.score ?? 0}/{data?.length}
                    </span>
                </p>
                <button onClick={handleRestart} className="btn">
                    Restart
                </button>
            </div>
            <ShowResult data={data} answers={answers} results={results} />
        </div>
    );
};

export default Result;
