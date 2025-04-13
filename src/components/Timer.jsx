import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTimer } from '../redux/features/timerSlice';

function Timer() {
  const dispatch = useDispatch();
  const { timeRemaining, isRunning } = useSelector(state => state.timer);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(decrementTimer());
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, dispatch]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="text-xl font-medium">{formatTime(timeRemaining)}</div>
  );
}

export default Timer;