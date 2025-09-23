import { MixProvider } from './context/MixContext.jsx'
import { TimesProvider } from './context/TimesContext.jsx'

import Mixer from './components/mixer.jsx'
import Timer from './components/timer.jsx'
import Table from './components/table_timer.jsx'
import Cube2d from './components/cube_2d.jsx'

import './App.css'

function App() {

  return (
    <MixProvider>
      <TimesProvider>
        <Mixer />
        <Timer />
        <Table />
        <Cube2d />
      </TimesProvider>
    </MixProvider>
  )
}

export default App
