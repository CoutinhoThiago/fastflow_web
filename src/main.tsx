// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.tsx';


// Cria o link da fonte PT Sans dinamicamente
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap';
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Aplica a fonte globalmente */}
    <div style={{ fontFamily: "'PT Sans', Arial, sans-serif" }}>
      <App />
    </div>
  </React.StrictMode>
);
