import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const VoiceRecorder = ({
  onSendVoice,
  disabled,
  onRecordingStateChange,
  onPreviewModeChange,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState(null);

  // Helper function to format duration as MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: async (blobUrl, blob) => {
        setIsPreviewMode(true);
        onPreviewModeChange(true);
        onRecordingStateChange(false);
      },
    });

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  const handleStartRecording = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRecordingDuration(0);
    const interval = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
    setRecordingInterval(interval);
    startRecording();
    onRecordingStateChange(true);
  };

  const handleStopRecording = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    stopRecording();
  };

  const handleSendVoice = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await fetch(mediaBlobUrl);
    const blob = await response.blob();
    const audioFile = new File([blob], "voice-message.wav", {
      type: "audio/wav",
    });

    const formData = new FormData();
    formData.append("type", "voice");
    formData.append("media", audioFile);
    formData.append("voice_duration", formatDuration(recordingDuration));

    onSendVoice(formData);
    clearBlobUrl();
    setIsPreviewMode(false);
    onPreviewModeChange(false);
    setRecordingDuration(0);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearBlobUrl();
    setIsPreviewMode(false);
    onPreviewModeChange(false);
    onRecordingStateChange(false);
    setRecordingDuration(0);
  };

  if (isPreviewMode && mediaBlobUrl) {
    return (
      <div className="voice-preview-controls d-flex align-items-center gap-3 w-100">
        <div className="audio-wrapper flex-grow-1 mw-320px d-flex align-items-center">
          <audio src={mediaBlobUrl} controls className="w-100" />
          <span className="ms-2">{formatDuration(recordingDuration)}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={handleSendVoice}
            className="send-voice-btn sc-1-bg l-d-clr rounded fw-semibold p-2 px-3 border-0"
          >
            <IoMdSend />
          </button>
          <button
            onClick={handleCancel}
            className="cancel-voice-btn rounded p-2 px-3 border-0"
          >
            <FaTrashAlt className="mc-1-clr" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={status === "recording" ? handleStopRecording : handleStartRecording}
      disabled={disabled}
      className="voice-record-btn bg-transparent border-0 d-flex gap-2 align-items-center"
    >
      {status === "recording" ? (
        <>
          <FaStop className="record-icon" />
          <span>Recording... {formatDuration(recordingDuration)}</span>
        </>
      ) : (
        <FaMicrophone className="record-icon" />
      )}
    </button>
  );
};

export default VoiceRecorder;