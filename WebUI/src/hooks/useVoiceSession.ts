import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createLiveKitClient, LiveKitClient } from '../services/livekitClient.ts';
import { createAudioRecorder, AudioRecorder } from '../services/audioRecorder.ts';

export type SessionStatus = 'idle' | 'starting' | 'active' | 'stopping' | 'stopped';

type UseVoiceSession = {
  status: SessionStatus;
  isMuted: boolean;
  isStarting: boolean;
  isStopping: boolean;
  transcript: string[];
  startSession: () => Promise<void>;
  stopSession: () => Promise<void>;
  toggleMute: () => void;
};

/**
 * PUBLIC_INTERFACE
 * useVoiceSession centralizes lifecycle for voice chat sessions, with placeholders
 * for LiveKit streaming and backend integrations. No network calls are made until
 * env vars are configured and services are implemented.
 */
export function useVoiceSession(): UseVoiceSession {
  const [status, setStatus] = useState<SessionStatus>('idle');
  const [isMuted, setMuted] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  const livekitRef = useRef<LiveKitClient | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);

  // Lazily create service instances
  const ensureServices = useCallback(async () => {
    if (!livekitRef.current) {
      livekitRef.current = createLiveKitClient();
    }
    if (!recorderRef.current) {
      recorderRef.current = await createAudioRecorder();
    }
  }, []);

  const startSession = useCallback(async () => {
    if (status === 'active' || isStarting) return;
    setIsStarting(true);
    try {
      await ensureServices();

      // Placeholder: connect to LiveKit if env present
      await livekitRef.current?.connectIfConfigured();

      // Start mic recording stream (placeholder: no real stream sent)
      await recorderRef.current?.start();

      setTranscript((t) => [...t, 'System: Session started. Speak to ask your question.']);
      setStatus('active');
    } catch (e) {
      console.error('Failed to start session', e);
      setTranscript((t) => [...t, 'System: Failed to start session. Check configuration.']);
      setStatus('idle');
    } finally {
      setIsStarting(false);
    }
  }, [ensureServices, isStarting, status]);

  const stopSession = useCallback(async () => {
    if (status !== 'active' || isStopping) return;
    setIsStopping(true);
    setStatus('stopping');
    try {
      await recorderRef.current?.stop();
      await livekitRef.current?.disconnect();
      setTranscript((t) => [...t, 'System: Session stopped.']);
      setStatus('stopped');
    } catch (e) {
      console.error('Failed to stop session', e);
      setTranscript((t) => [...t, 'System: Failed to stop session.']);
      setStatus('stopped');
    } finally {
      setIsStopping(false);
    }
  }, [isStopping, status]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      recorderRef.current?.setMuted(next);
      return next;
    });
  }, []);

  // Demo: Append placeholder AI response when recording "hears" something (simulated)
  useEffect(() => {
    if (status !== 'active') return;

    // This interval simulates incoming partials; remove when real STT wired.
    const id = window.setInterval(() => {
      setTranscript((t) => {
        // Keep transcript small to avoid unbounded growth during preview
        const next = t.length > 200 ? t.slice(-200) : t;
        return next;
      });
    }, 4000);

    return () => window.clearInterval(id);
  }, [status]);

  return useMemo(
    () => ({
      status,
      isMuted,
      transcript,
      startSession,
      stopSession,
      toggleMute,
      isStarting,
      isStopping,
    }),
    [isMuted, isStarting, isStopping, startSession, status, stopSession, toggleMute, transcript]
  );
}
