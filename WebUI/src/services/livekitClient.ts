export type LiveKitClient = {
  connectIfConfigured: () => Promise<void>;
  disconnect: () => Promise<void>;
};

/**
 * PUBLIC_INTERFACE
 * createLiveKitClient prepares a client that will attempt a connection only
 * when environment variables are present. Otherwise it behaves as a no-op stub.
 */
export function createLiveKitClient(): LiveKitClient {
  const url = process.env.REACT_APP_LIVEKIT_URL || process.env.LIVEKIT_URL;
  const apiKey = process.env.REACT_APP_LIVEKIT_API_KEY || process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.REACT_APP_LIVEKIT_API_SECRET || process.env.LIVEKIT_API_SECRET;

  const configured = Boolean(url && apiKey && apiSecret);

  return {
    async connectIfConfigured() {
      if (!configured) {
        console.info('LiveKit not configured (env missing). Skipping real connection.');
        return;
      }
      // Placeholder: insert LiveKit connection code here in future task
      console.info('LiveKit env detected. Connection will be implemented later.');
    },
    async disconnect() {
      // Placeholder: insert LiveKit disconnection/cleanup here
      return;
    }
  };
}
