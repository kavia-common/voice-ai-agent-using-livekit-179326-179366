import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import HomePage from './pages/App.tsx';
import SessionStatus from './components/SessionStatus.tsx';

/**
 * Root shell for the app: provides global theme, header/footer layout
 * and renders the HomePage which contains chat/voice controls.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" role="application" aria-label="Voice AI App">
      <header className="app-header-bar" role="banner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">🎙️</span>
          <span className="brand-name">Voice AI</span>
        </div>
        <div className="header-right">
          <SessionStatus />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="app-main" id="main" role="main">
        <HomePage />
      </main>

      <footer className="app-footer" role="contentinfo">
        <p>
          Built with React. LiveKit integration placeholders included. Configure environment variables in .env later.
        </p>
      </footer>
    </div>
  );
}

export default App;
