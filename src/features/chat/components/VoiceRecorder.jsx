import React, { useRef, useState } from "react";
import { useChat } from "../context/ChatContext";

function VoiceRecorder() {
  const { sendMessage, activeChat } = useChat();

  const [recording, setRecording] = useState(false);
  const mediaRef = useRef(null);
  const chunks = useRef([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    mediaRef.current = new MediaRecorder(stream);
    chunks.current = [];

    mediaRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRef.current.onstop = () => {
      const blob = new Blob(chunks.current, {
        type: "audio/mp3",
      });

      const url = URL.createObjectURL(blob);

      sendMessage({
        id: Date.now(),
        chatId: activeChat,
        sender: "me",
        audio: url,
        time: new Date().toLocaleTimeString(),
      });
    };

    mediaRef.current.start();
    setRecording(true);
  };

  const stop = () => {
    mediaRef.current.stop();
    setRecording(false);
  };

  return (
    <button onClick={recording ? stop : start}>
      🎤 {recording ? "Stop" : "Record"}
    </button>
  );
}

export default VoiceRecorder;