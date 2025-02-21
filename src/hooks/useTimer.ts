"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'

const useTimer = ({ initail }: { initail: number }): { seconds: number, handleTimerFormChange: () => string } => {

    const [seconds, setSeconds] = useState(initail);


    const handleTimerFormChange = useCallback(() => {
        let hour = parseInt(String(seconds / 3600));
        let min = parseInt(String((seconds % 3600) / 60));
        let sec = seconds % 60;

        if (initail >= 3600) return hour + "시간 " + min + "분 " + sec + "초"
        if (initail >= 60) return min + "분 " + sec + "초"
        return sec + "초"
    }, [seconds, initail]);

    useEffect(() => {
        // 설정된 시간 간격마다 setInterval 콜백이 실행된다. 
        const id = setInterval(() => {
            // 타이머 숫자가 하나씩 줄어들도록
            setSeconds((seconds) => seconds - 1);
        }, 1000);

        // 0이 되면 카운트가 멈춤
        if (seconds === 0) clearInterval(id);
        return () => clearInterval(id);
        // 카운트 변수가 바뀔때마다 useEffecct 실행
    }, [seconds]);

    // return { seconds, handleTimerFormChange }
    const memoizedValue = useMemo(() => ({ seconds, handleTimerFormChange }), [seconds, handleTimerFormChange]);

    return memoizedValue;
}

export default useTimer