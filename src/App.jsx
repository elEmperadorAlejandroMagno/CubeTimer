import { useState } from 'react'

import Mixer from './components/mixer.jsx'
import Timer from './components/timer.jsx'
import Table from './components/table_timer.jsx'

import './App.css'

function App() {
  const [recordedTimes, setRecordedTimes] = useState(
    JSON.parse(localStorage.getItem('recordedTimes')) || []
  );

  function addTime(newTime) {
    const updatedTimes = [...recordedTimes, newTime];
    localStorage.setItem('recordedTimes', JSON.stringify(updatedTimes));
    setRecordedTimes(updatedTimes);
  }

  function handleResetTimes() {
    localStorage.removeItem('recordedTimes');
    setRecordedTimes([]);
  }

  return (
    <>
      <Mixer />
      <Timer onAddTime={addTime} />
      <button onClick={handleResetTimes}>Reset times</button>
      <Table times={recordedTimes} />
    </>
  )
}

export default App
