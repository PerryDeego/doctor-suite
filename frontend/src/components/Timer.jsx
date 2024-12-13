// Timer.js
import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  // Format time to HH:MM:SS AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second:'2-digit',  hour12: true });
  };

  return (
    <div className="text-lg">
      {formatTime(currentTime)}
    </div>
  );
};

export default Timer;
