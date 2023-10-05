import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './ViteStarterApp.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="logo-section">
        {/* TODO: add LFG! app SVG logo here */}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="app-name">LFG! App</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          LFG! App Development - In Progress - 🧑‍🔧 🚧 📋
        </p>
      </div>

      <p className="read-the-docs">
        Docs and more details coming up soon.
      </p>
    </>
  )
}

export default App
