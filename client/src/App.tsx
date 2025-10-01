import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartQuiz from './pages/StartQuiz';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { AnswerProvider } from './context/AnswerContext';

const App = () => {
    const queryClient = new QueryClient();

    return (
        <AnswerProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<StartQuiz />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/result" element={<Result />} />
                    </Routes>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </AnswerProvider>
    );
};

export default App;
