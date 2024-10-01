import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './frontend/App.jsx'
import './frontend/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
