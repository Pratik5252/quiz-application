import { useNavigate } from 'react-router-dom';

const StartQuiz = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-satoshi font-medium">
                    Take the Trivia Challenge!
                </h1>
                <p className="text-lg font-satoshi text-black/80">
                    Test Your Knowledge with Fun Facts
                </p>
            </div>
            <button className="btn" onClick={() => navigate('/quiz')}>
                Start
            </button>
        </div>
    );
};

export default StartQuiz;
