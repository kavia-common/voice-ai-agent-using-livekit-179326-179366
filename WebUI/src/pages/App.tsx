import React from 'react';
import AudioControls from '../components/AudioControls.tsx';
import TranscriptView from '../components/TranscriptView.tsx';
import { useVoiceSession } from '../hooks/useVoiceSession.ts';

/**
 * Home/Chat page hosting voice session controls and transcript display.
 * Provides basic accessibility and responsive layout.
 */
const HomePage: React.FC = () => {
  const {
    status,
    isMuted,
    transcript,
    startSession,
    stopSession,
    toggleMute,
    isStarting,
    isStopping
  } = useVoiceSession();

  return (
    <section className="page-container container">
      <header className="page-header">
        <h1 className="title">Ask about the product</h1>
        <p className="subtitle">Start a voice session and speak your question. Responses will appear here.</p>
      </header>

      <div className="controls-card" role="region" aria-label="Audio Controls">
        <div className="session-actions">
          <button
            className="btn btn-primary"
            onClick={startSession}
            disabled={status !== 'idle' && status !== 'stopped' || isStarting}
            aria-pressed={status === 'active'}
            aria-busy={isStarting}
          >
            {isStarting ? 'Starting…' : 'Start Session'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={stopSession}
            disabled={status !== 'active' || isStopping}
            aria-busy={isStopping}
          >
            {isStopping ? 'Stopping…' : 'Stop Session'}
          </button>
        </div>

        <AudioControls
          muted={isMuted}
          onToggleMute={toggleMute}
          disabled={status !== 'active'}
        />
      </div>

      <TranscriptView transcript={transcript} />

      <div className="note">
        <p className="description">
          This is a scaffold. LiveKit connection and backend API calls are placeholders until environment variables are configured.
        </p>
      </div>
    </section>
  );
};

export default HomePage;
