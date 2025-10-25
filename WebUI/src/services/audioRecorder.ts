export type AudioRecorder = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  setMuted: (muted: boolean) => void;
};

type RecorderState = {
  stream: MediaStream | null;
  muted: boolean;
};

/**
 * PUBLIC_INTERFACE
 * createAudioRecorder returns a minimal wrapper around getUserMedia that can
 * be expanded to stream audio to LiveKit. Currently local/no-op streaming.
 */
export async function createAudioRecorder(): Promise<AudioRecorder> {
  const state: RecorderState = {
    stream: null,
    muted: false,
  };

  async function start() {
    if (state.stream) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.stream = stream;

      // Apply mute setting to all tracks
      stream.getAudioTracks().forEach((t) => {
        t.enabled = !state.muted;
      });
    } catch (e) {
      console.error('Microphone access denied or unavailable', e);
      throw e;
    }
  }

  async function stop() {
    if (!state.stream) return;
    state.stream.getTracks().forEach((t) => t.stop());
    state.stream = null;
  }

  function setMuted(muted: boolean) {
    state.muted = muted;
    if (state.stream) {
      state.stream.getAudioTracks().forEach((t) => {
        t.enabled = !muted;
      });
    }
  }

  return { start, stop, setMuted };
}
