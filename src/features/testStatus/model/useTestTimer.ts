import { useState, useEffect } from 'react';

export const useTestTimer = (initialTime: number, onTimeUp: () => void) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        if (initialTime > 0 && timeLeft === null) {
            setTimeLeft(initialTime);
        }
    }, [initialTime, timeLeft]);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) {
            if (timeLeft === 0) {
                onTimeUp();
            }
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => (prev !== null ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        timeLeft,
        formattedTime: timeLeft !== null ? formatTime(timeLeft) : '',
        setTimeLeft,
    };
};
