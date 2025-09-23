import { createContext, useContext, useState } from 'react';

const TimesContext = createContext();

export function TimesProvider({ children }) {
  const [recordedTimes, setRecordedTimes] = useState(
    JSON.parse(localStorage.getItem('recordedTimes')) || []
  );

  const addTime = (newTime) => {
    const updatedTimes = [...recordedTimes, newTime];
    localStorage.setItem('recordedTimes', JSON.stringify(updatedTimes));
    setRecordedTimes(updatedTimes);
  };

  const resetTimes = () => {
    localStorage.removeItem('recordedTimes');
    setRecordedTimes([]);
  };

  const value = {
    recordedTimes,
    addTime,
    resetTimes
  };

  return (
    <TimesContext.Provider value={value}>
      {children}
    </TimesContext.Provider>
  );
}

export function useTimes() {
  const context = useContext(TimesContext);
  if (!context) {
    throw new Error('useTimes must be used within a TimesProvider');
  }
  return context;
}
