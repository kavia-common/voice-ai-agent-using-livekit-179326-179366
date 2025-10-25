import React from 'react';

export type AudioControlsProps = {
  muted: boolean;
  onToggleMute: () => void;
  disabled?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * AudioControls renders microphone toggle button with accessible labeling.
 */
const AudioControls: React.FC<AudioControlsProps> = ({ muted, onToggleMute, disabled }) => {
  return (
    <div className="audio-controls">
      <button
        className="btn btn-large"
        onClick={onToggleMute}
        disabled={disabled}
        aria-pressed={muted}
        aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
      >
        {muted ? '🔇 Unmute Mic' : '🎤 Mute Mic'}
      </button>
    </div>
  );
};

export default AudioControls;
