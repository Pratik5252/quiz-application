import React, { useEffect } from 'react';

type TimerProps = {
    onTimeUp: () => void;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    isSubmitting?: boolean;
};

const Timer = ({ onTimeUp, time, setTime, isSubmitting }: TimerProps) => {
    useEffect(() => {
        if (time <= 0) {
            onTimeUp();
            return;
        }
        if (isSubmitting) return;
        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [time, isSubmitting]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`;
    };
    const lessTime = time <= Math.floor(1 * 60) / 4;

    const timerStyle = lessTime ? 'text-red-600 font-bold' : '';
    return <div className={timerStyle}>Time Left: {formatTime(time)}</div>;
};

export default Timer;
