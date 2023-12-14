import {useEffect, useState} from 'react';

const convertToSeconds = (timeString) => {
    if (!timeString) return -1;
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
};

const formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const useCountdown = (initialTime, interval = 1000) => {
    const [time, setTime] = useState(() => {
        const storedTime = localStorage.getItem('countdownTime');
        return storedTime ? convertToSeconds(storedTime) : convertToSeconds(initialTime);
    });
    const [displayTime, setDisplayTime] = useState(initialTime);
    const [canStart, setCanStart] = useState(false);

    useEffect(() => {
        if (initialTime !== null && canStart) {
            const countdown = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(countdown);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, interval);

            return () => clearInterval(countdown);
        } else {
            if (localStorage.getItem('countdownTime')) {
                setCanStart(true)
                return;
            }
            setTime(convertToSeconds(initialTime));
            setDisplayTime(initialTime)
            setCanStart(true)
        }
    }, [interval, initialTime, canStart]);

    useEffect(() => {
        if (time < 0) return;
        setDisplayTime(formatTime(time));
        localStorage.setItem('countdownTime', formatTime(time));
    }, [time]);

    return displayTime;
};

export default useCountdown;
