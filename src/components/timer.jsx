import '../styles/timer.css';
import { useState, useEffect, useRef } from 'react';

export default function Timer({ onAddTime }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const startRef = useRef(null);
  const prevRunningRef = useRef(running);

  useEffect(() => {
    let animationFrame;
    function update() {
      setTime(performance.now() - startRef.current);
      animationFrame = requestAnimationFrame(update);
    }
    if (running) {
      startRef.current = performance.now() - time;
      animationFrame = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [running, time]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Space') {
        setRunning(r => {
          if (!r && time !== 0) setTime(0);
          return !r
        });
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [time]);

  useEffect(() => {
    if (prevRunningRef.current && !running && time !== 0) {
      const formattedTime = (time / 1000).toFixed(2);
      onAddTime(formattedTime);
    }
    prevRunningRef.current = running;
  },[running, time, onAddTime]);

  function handleResetTimer() {
    setTime(0);
  }

  return (
    <div className="timer">
      <span className="time">{(time/1000).toFixed(2)}</span>
      <button onClick={handleResetTimer}>Reset</button>
    </div>
  )
};