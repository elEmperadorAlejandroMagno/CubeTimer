import '../styles/table_timer.css';
import { useState } from 'react';

export default function Table({ times = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const TimesRegistered = times.length > 0 ? times : JSON.parse(localStorage.getItem('recordedTimes')) || [];

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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="times-section">
      {/* Estadísticas siempre visibles */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Solves:</span>
          <span className="stat-value">{TimesRegistered.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Average:</span>
          <span className="stat-value">{calculateAverage(TimesRegistered)}s</span>
        </div>
        <div className="stat">
          <span className="stat-label">Best:</span>
          <span className="stat-value">{getBestTime(TimesRegistered)}s</span>
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
            {TimesRegistered.length === 0 ? (
              <div className="no-times">
                <p>No times recorded yet</p>
                <p className="hint">Press spacebar to start timing!</p>
              </div>
            ) : (
              <div className="times-grid">
                {TimesRegistered.map((time, index) => (
                  <div key={index} className="time-chip">
                    <span className="solve-number">{index + 1}</span>
                    <span className="time-value">{time}s</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
