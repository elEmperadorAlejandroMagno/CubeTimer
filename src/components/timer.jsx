import '../styles/timer.css';
import { useState, useEffect, useRef } from 'react';
import { useMix } from '../context/MixContext';
import { useTimes } from '../context/TimesContext';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [ready, setReady] = useState(false);
  const [preparingTime, setPreparingTime] = useState(0);
  
  const startRef = useRef(null);
  const prevRunningRef = useRef(running);
  const preparingStartRef = useRef(null);
  const preparingIntervalRef = useRef(null);
  const { generateMix } = useMix();
  const { recordedTimes, addTime } = useTimes();
  
  const PREPARATION_TIME = 3000; // 3 segundos en milisegundos

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

  // Lógica para el sistema de preparación con spacebar
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        
        // Usar refs para valores actuales para evitar stale closures
        const isRunning = running;
        const isPreparing = preparing;
        const isReady = ready;
        
        if (isRunning) {
          // Si está corriendo, parar el timer
          setRunning(false);
          return;
        }
        
        if (!isPreparing && !isReady) {
          // Iniciar preparación
          setPreparing(true);
          preparingStartRef.current = performance.now();
          
          // Limpiar timer anterior si existe
          if (preparingIntervalRef.current) {
            clearInterval(preparingIntervalRef.current);
          }
        }
      }
    }
    
    function handleKeyUp(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        
        if (preparing) {
          // Si estaba preparando pero soltó antes de tiempo, cancelar
          setPreparing(false);
          setPreparingTime(0);
          if (preparingIntervalRef.current) {
            clearInterval(preparingIntervalRef.current);
            preparingIntervalRef.current = null;
          }
        } else if (ready) {
          // Si está listo, iniciar el timer
          if (time !== 0) setTime(0);
          setReady(false);
          setPreparingTime(0); // Resetear el tiempo de preparación
          setRunning(true);
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [time, running, preparing, ready]);
  
  // Efecto separado para manejar el intervalo de preparación
  useEffect(() => {
    if (preparing && !preparingIntervalRef.current) {
      setPreparingTime(0);
      
      // Actualizar el tiempo de preparación
      preparingIntervalRef.current = setInterval(() => {
        const elapsed = performance.now() - preparingStartRef.current;
        setPreparingTime(elapsed);
        
        if (elapsed >= PREPARATION_TIME) {
          setPreparing(false);
          setReady(true);
          setPreparingTime(PREPARATION_TIME);
          clearInterval(preparingIntervalRef.current);
          preparingIntervalRef.current = null;
        }
      }, 100);
    }
    
    return () => {
      if (!preparing && preparingIntervalRef.current) {
        clearInterval(preparingIntervalRef.current);
        preparingIntervalRef.current = null;
      }
    };
  }, [preparing, PREPARATION_TIME]);

  useEffect(() => {
    if (prevRunningRef.current && !running && time !== 0) {
      const formattedTime = (time / 1000).toFixed(2);
      addTime(formattedTime);
      // Generar nueva mezcla automáticamente después de completar un intento
      generateMix();
    }
    prevRunningRef.current = running;
  },[running, time, generateMix]);

  // Función para obtener el texto a mostrar
  const getDisplayText = () => {
    if (preparing) {
      // Calcular cuántos segundos han pasado desde que empezó la preparación
      const elapsedSeconds = Math.floor(preparingTime / 1000);
      // El countdown va de 3 a 1
      const countdown = 3 - elapsedSeconds;
      // Mostrar entre 1 y 3
      return Math.max(1, Math.min(3, countdown)).toString();
    }
    if (ready) {
      return 'GO!';
    }
    if (running) {
      return (time / 1000).toFixed(2);
    }
    // Si no hay tiempo registrado Y no hay tiempos previos, mostrar el mensaje inicial
    if (recordedTimes.length === 0) {
      return 'Press SPACE to start';
    }
    // Si hay tiempo registrado O hay tiempos previos, mostrar el tiempo
    return (time / 1000).toFixed(2);
  };
  
  // Función para obtener la clase CSS apropiada
  const getTimerClass = () => {
    let classes = 'timer';
    if (preparing) classes += ' preparing';
    if (ready) classes += ' ready';
    if (running) classes += ' running';
    return classes;
  };

  return (
    <div className={getTimerClass()}>
      <span className="time">{getDisplayText()}</span>
      {preparing && (
        <div className="preparation-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${(preparingTime / PREPARATION_TIME) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  )
};