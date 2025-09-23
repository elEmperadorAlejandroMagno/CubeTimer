import { useState } from 'react'
import { MixProvider } from './context/MixContext.jsx'

import Mixer from './components/mixer.jsx'
import Timer from './components/timer.jsx'
import Table from './components/table_timer.jsx'
import Cube2d from './components/cube_2d.jsx'

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
    <MixProvider>
      <Mixer />
      <Timer onAddTime={addTime} />
      <button className="reset-times-btn" onClick={handleResetTimes}>Reset times</button>
      <Table times={recordedTimes} />
      <Cube2d />
    </MixProvider>
  )
}

export default App
