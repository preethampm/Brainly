import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const urlParams = new URLSearchParams(window.location.hash.substring(1))
const accessToken = urlParams.get('access_token')

if (accessToken) {
    localStorage.setItem('token', accessToken)
    window.location.href = '/dashboard'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)