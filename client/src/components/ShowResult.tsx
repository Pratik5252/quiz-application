import type { Answer, QuizType, ScoreResponse } from '../types/quiz';

const ShowResult = ({
    data,
    answers,
    results,
}: {
    data: QuizType[] | undefined;
    answers: Answer[];
    results: ScoreResponse | undefined;
}) => {
    return (
        <div className="mt-6">
            {data?.map((quiz, index) => {
                const userAnswer = answers.find(
                    (ans) => ans.quizId == quiz.id
                )?.answer;
                const correctAnswer = results?.correct_answers.find(
                    (ans) => ans.id == quiz.id
                )?.answer;

                console.log(
                    `Question ${quiz.id}: User=${userAnswer}, Correct=${correctAnswer}`
                );

                return (
                    <div key={quiz.id} className="mb-6">
                        <h3 className="font-medium mb-2">
                            {index + 1}
                            {')'} {quiz.question}
                        </h3>
                        {userAnswer === undefined && (
                            <div className="mt-2 text-sm text-yellow-800 font-medium">
                                You did not answer this question.
                            </div>
                        )}
                        <div className="space-y-1">
                            {quiz.options.map((option, idx) => {
                                let style = 'px-3 py-2 rounded';

                                if (idx === correctAnswer) {
                                    style += ` bg-green-200 text-green-800 border-2 border-green-500 ${
                                        userAnswer === undefined
                                            ? 'border-neutral-300 bg-neutral-200 text-yellow-800'
                                            : ''
                                    }`;
                                } else if (
                                    idx === userAnswer &&
                                    userAnswer !== correctAnswer
                                ) {
                                    style +=
                                        ' bg-red-200 text-red-800 border-2 border-red-500';
                                } else {
                                    style += ' bg-gray-100 text-gray-700';
                                }

                                return (
                                    <div key={idx} className={style}>
                                        {option}
                                        {idx === correctAnswer && (
                                            <span className="ml-2 text-green-600 font-semibold">
                                                ✓
                                            </span>
                                        )}
                                        {idx === userAnswer &&
                                            userAnswer !== correctAnswer && (
                                                <span className="ml-2 text-red-600 font-semibold">
                                                    ✗
                                                </span>
                                            )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ShowResult;
