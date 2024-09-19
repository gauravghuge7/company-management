import React, { useEffect, useState } from 'react';
import './Watch.css'; // Make sure to create this CSS file

const Watch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRotation = (unit, max) => {
    return (unit / max) * 360;
  };

  const secondsRotation = getRotation(time.getSeconds(), 60);
  const minutesRotation = getRotation(time.getMinutes(), 60);
  const hoursRotation = getRotation(time.getHours() % 12, 12) + (time.getMinutes() / 60) * 30;

  return (
    <div className="watch rounded-circle border border-dark">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="number-circle"
          style={{
            transform: `rotate(${i * 30}deg) translate(85px) rotate(-${i * 30}deg)`,
          }}
        >
          {(i + 1)}
        </div>
      ))}
      <div
        className="hand hour"
        style={{ transform: `rotate(${hoursRotation}deg)` }}
      ></div>
      <div
        className="hand minute"
        style={{ transform: `rotate(${minutesRotation}deg)` }}
      ></div>
      <div
        className="hand second"
        style={{ transform: `rotate(${secondsRotation}deg)` }}
      ></div>
    </div>
  );
};

export default Watch;
