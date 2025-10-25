import React, { useEffect, useRef } from 'react';

export type TranscriptViewProps = {
  transcript: string[];
};

/**
 * PUBLIC_INTERFACE
 * TranscriptView shows a scrollable list of user/AI utterances.
 */
const TranscriptView: React.FC<TranscriptViewProps> = ({ transcript }) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <section className="transcript-card" role="log" aria-live="polite" aria-relevant="additions">
      <h2 className="section-title">Transcript</h2>
      <div className="transcript-list" ref={listRef} tabIndex={0} aria-label="Conversation transcript">
        {transcript.length === 0 ? (
          <p className="description">No messages yet. Start a session and ask your question.</p>
        ) : (
          transcript.map((line, idx) => (
            <div key={idx} className="transcript-line">
              {line}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TranscriptView;
