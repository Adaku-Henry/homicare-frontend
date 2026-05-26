import React, { useRef, useState, useEffect, useCallback } from "react";
import { useChat } from "../context/ChatContext";
import { getSocket } from "../socket/socket";

const socket = getSocket();

function VoiceRecorder() {
  const { sendMessage, activeChat } = useChat();

  // ================= CORE STATES =================
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [timer, setTimer] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  // ================= REFS =================
  const mediaRef = useRef(null);
  const chunks = useRef([]);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);

  const MAX_DURATION = 60; // WhatsApp-like limit (1 min)

  // ================= TIMER SYSTEM =================
  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          const next = t + 1;

          // AUTO STOP like WhatsApp
          if (next >= MAX_DURATION) {
            stopRecording();
          }

          return next;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [recording]);

  // ================= START RECORDING =================
  const startRecording = useCallback(async () => {
    if (!activeChat) return; // IMPORTANT: ensures correct recipient

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      mediaRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      chunks.current = [];
      setTimer(0);
      setAudioURL(null);
      setPreviewMode(false);

      mediaRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRef.current.onstop = () => {
        const blob = new Blob(chunks.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioURL(url);
        setPreviewMode(true);

        // stop mic
        streamRef.current?.getTracks().forEach((t) => t.stop());
      };

      mediaRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone error:", err);
    }
  }, [activeChat]);

  // ================= STOP RECORDING =================
  const stopRecording = useCallback(() => {
    if (mediaRef.current && recording) {
      mediaRef.current.stop();
      setRecording(false);
    }
  }, [recording]);

  // ================= CANCEL =================
  const cancelRecording = () => {
    setRecording(false);
    setAudioURL(null);
    setAudioBlob(null);
    setTimer(0);
    setPreviewMode(false);
    chunks.current = [];

    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  // ================= SEND VOICE MESSAGE =================
  const sendVoice = useCallback(() => {
    if (!audioBlob || !activeChat) return;

    // IMPORTANT: create real message format for chat system
    const message = {
      id: Date.now(),
      chatId: activeChat, // 🔥 ensures correct recipient chat
      sender: "me",
      type: "audio",
      audioUrl: audioURL,
      duration: timer,
      time: new Date().toLocaleTimeString(),
      status: "sending",
    };

    // 1. LOCAL UI UPDATE (instant)
    sendMessage(message);

    // 2. SOCKET SEND (REAL-TIME DELIVERY)
    if (socket?.readyState === 1) {
      socket.send(
        JSON.stringify({
          event: "send_message",
          data: message,
        })
      );
    }

    // 3. CLEAN UP
    cancelRecording();
  }, [audioBlob, audioURL, timer, activeChat, sendMessage]);

  // ================= FORMAT TIME =================
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // ================= UI =================
  return (
    <div className="voiceRecorder">

      {/* ================= RECORD MODE ================= */}
      {!previewMode && (
        <div className="recordSection">

          <button
            className={recording ? "stopBtn" : "recordBtn"}
            onClick={recording ? stopRecording : startRecording}
            disabled={!activeChat} // 🔥 prevents wrong chat sending
          >
            🎤 {recording ? "Stop" : "Hold to Record"}
          </button>

          {recording && (
            <div className="timer">
              ⏱ {formatTime(timer)}
            </div>
          )}

          {recording && (
            <button className="cancelBtn" onClick={cancelRecording}>
              ✖ Cancel
            </button>
          )}

        </div>
      )}

      {/* ================= PREVIEW MODE ================= */}
      {previewMode && audioURL && (
        <div className="previewSection">

          <audio controls src={audioURL} />

          <div className="previewActions">
            <span>Duration: {formatTime(timer)}</span>

            <button onClick={cancelRecording}>
              Discard
            </button>

            <button onClick={sendVoice}>
              Send ▶
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default VoiceRecorder;