#!/bin/bash
cd /home/kavia/workspace/code-generation/voice-ai-agent-using-livekit-179326-179366/WebUI
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

