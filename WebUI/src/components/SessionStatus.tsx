import React from 'react';
import { useVoiceSession } from '../hooks/useVoiceSession.ts';

/**
 * PUBLIC_INTERFACE
 * SessionStatus shows a small badge with current session state.
 */
const SessionStatus: React.FC = () => {
  const { status } = useVoiceSession();
  const color =
    status === 'active' ? 'status-active' :
    status === 'starting' ? 'status-starting' :
    status === 'stopping' ? 'status-stopping' : 'status-idle';

  return (
    <div className={`session-status ${color}`} aria-live="polite">
      <span className="dot" aria-hidden="true" />
      <span className="label">Session: {status}</span>
    </div>
  );
};

export default SessionStatus;
