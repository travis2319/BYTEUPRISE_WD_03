import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elaspsedTime, setElaspsedTime] = useState(0);
  const interverlIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      interverlIdRef.current = setInterval(() => {
        setElaspsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(interverlIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elaspsedTime;

    console.log(startTimeRef.current);
  };
  const stop = () => {
    setIsRunning(false);
  };
  const reset = () => {
    setElaspsedTime(0);
    setIsRunning(false);
  };
  const resetTime = () => {
    let hours = Math.floor(elaspsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elaspsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elaspsedTime / 1000) % 60);
    let miliSeconds = Math.floor((elaspsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliSeconds = String(miliSeconds).padStart(2, "0");

    return ` ${minutes} : ${seconds} : ${miliSeconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="display">{resetTime()}</div>
      <div className="controls">
        <button className="start" onClick={start}>
          start
        </button>
        <button className="stop" onClick={stop}>
          stop
        </button>
        <button className="reset" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
