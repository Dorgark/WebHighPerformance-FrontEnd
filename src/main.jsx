import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Filtros from './components/Filter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Filtros />
  </StrictMode>,
)

