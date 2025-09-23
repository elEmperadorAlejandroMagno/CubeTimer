import '../styles/table_timer.css';
import { useState } from 'react';
import { useTimes } from '../context/TimesContext';

export default function Table() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { recordedTimes, resetTimes } = useTimes();

  // Calcular estadísticas
  const calculateAverage = (timesList) => {
    if (timesList.length === 0) return '0.00';
    const sum = timesList.reduce((acc, time) => acc + parseFloat(time), 0);
    return (sum / timesList.length).toFixed(2);
  };

  const getBestTime = (timesList) => {
    if (timesList.length === 0) return '0.00';
    return Math.min(...timesList.map(time => parseFloat(time))).toFixed(2);
  };

  const getLastTime = (timesList) => {
    if (timesList.length === 0) return '0.00';
    return parseFloat(timesList[timesList.length - 1]).toFixed(2);
  };

  function handleResetTimes() {
    resetTimes();
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="times-section">
      {/* Estadísticas siempre visibles */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Solves:</span>
          <span className="stat-value">{recordedTimes.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Average:</span>
          <span className="stat-value">{calculateAverage(recordedTimes)}s</span>
        </div>
        <div className="stat">
          <span className="stat-label">Best:</span>
          <span className="stat-value">{getBestTime(recordedTimes)}s</span>
        </div>
        <div className="stat">
          <span className="stat-label">Last:</span>
          <span className="stat-value">{getLastTime(recordedTimes)}</span>
          </div>
        <button className="toggle-table-btn" onClick={toggleExpanded}>
          {isExpanded ? 'Hide Times' : 'Show All Times'} 
          <span className={`arrow ${isExpanded ? 'up' : 'down'}`}>▼</span>
        </button>
      </div>

      {/* Tabla expandible */}
      {isExpanded && (
        <div className="times-table-wrapper">
          <div className="table-container">
            {recordedTimes.length === 0 ? (
              <div className="no-times">
                <p>No times recorded yet</p>
                <p className="hint">Press spacebar to start timing!</p>
              </div>
            ) : (
              <>
                <div className="table-header">
                  <h3>All Solves</h3>
                  <button className="reset-times-btn" onClick={handleResetTimes}>
                    Reset All Times
                  </button>
                </div>
                <div className="times-grid">
                  {recordedTimes.map((time, index) => (
                    <div key={index} className="time-chip">
                      <span className="solve-number">{index + 1}</span>
                      <span className="time-value">{time}s</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
