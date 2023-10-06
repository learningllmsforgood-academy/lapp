import React from 'react'
import ReactDOM from 'react-dom/client'
import ViteStarterApp from './ui/vite-starter-app'
import './index.css'

// init firebase auth outside of react loop
// will ensure firebase auth service is ready to go when
// firebase login UI needs it
import "./services/auth";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ViteStarterApp />
  </React.StrictMode>,
)
