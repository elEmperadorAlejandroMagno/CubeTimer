import '../styles/table_timer.css';

export default function Table() {
  const TimesRegistered = JSON.parse(localStorage.getItem('recordedTimes')) || []; // Example times


  return (
    <div className="table">
      <div className="table-container">
        {
        TimesRegistered.length === 0 ? <div className="no-times">No times recorded</div> : (
        <div className="times-container">
        {
        TimesRegistered.map((time, index) => (
          <div key={index} className="time-entry">
            <span className="time-index">{index + 1}.</span>
            <span className="time-value">{time}</span>
          </div>
        ))
        }
        </div>
        )}
      </div>
    </div>
  )
};