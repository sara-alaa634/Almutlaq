import { useState, useRef } from "react";
import "../../Assets/Css/Chat.css";
import { useTranslation } from "react-i18next";
import { TbPhoto } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import VoiceRecorder from "./VoiceRecorder";
import { Toast } from "../../helpers/Toast";
import { errorMessages } from "../../helpers/messages";

const MessageInput = ({
  newMessage,
  receiverId,
  onSubmit,
  onChange,
  userBlocked,
  hasCreatePermission,
}) => {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only submit text message if we're not recording and have text content
    if (!isRecording && newMessage.trim()) {
      onSubmit({ type: "text", content: newMessage });
    }
  };

  const handleSendVoice = (formData) => {
    onSubmit({ type: "voice", content: formData });
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    const isImage = file.type.startsWith("image/");
    const isAllowedDocument = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ].includes(file.type);

    if (!isImage && !isAllowedDocument) {
      Toast("error", t(errorMessages.chatMediaError));
      return;
    }

    formData.append("type", isImage ? "image" : "file");
    formData.append("media", file);
    formData.append("content", file.name);

    onSubmit({
      type: isImage ? "image" : "file",
      content: formData,
    });

    // Reset the file input
    e.target.value = "";
  };

  return (
    <div className="m-3 rounded box-shadow btn-h68-s15 l-d-bg p-2 px-3">
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-center h-100 justify-content-between"
      >
        <input
          className={`form-control border-0 me-2 ${
            isRecording || isPreviewMode ? "d-none" : ""
          }`}
          value={newMessage}
          placeholder={t("write")}
          type="text"
          onChange={onChange}
          disabled={!receiverId || userBlocked || isRecording || !hasCreatePermission}
        />

        <div className="send-message-btns d-flex align-items-center gap-2">
          {hasCreatePermission ? (
            <VoiceRecorder
              onSendVoice={handleSendVoice}
              disabled={!receiverId || userBlocked}
              onRecordingStateChange={setIsRecording}
              onPreviewModeChange={setIsPreviewMode}
            />
          ) : null}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="d-none"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx,.txt"
            disabled={!hasCreatePermission}
          />

            <button
              type="button"
              className={`btn px-0 bg-transparent mc-1-clr ${
                isRecording || isPreviewMode ? "d-none" : ""
              }`}
              disabled={isRecording || !receiverId || userBlocked || !hasCreatePermission}
              onClick={handleFileButtonClick}
            >
              <TbPhoto className="fs-5" />
            </button>

            <button
              className={`btn sc-1-bg l-d-clr ${
                isRecording || isPreviewMode ? " d-none " : ""
              }`}
              type="submit"
              disabled={
                !newMessage.trim() || !receiverId || userBlocked || isRecording || !hasCreatePermission
              }
            >
              <IoMdSend />
            </button>
       
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
