import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('app')!).render(
  React.createElement(React.StrictMode, null,
    React.createElement(App)
  )
)