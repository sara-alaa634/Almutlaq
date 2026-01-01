import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../Assets/Css/Chat.css";
import { RiCheckDoubleLine } from "react-icons/ri";
import { formatTime } from "../../helpers/formatDate";
import ImagePreviewModal from "../SharedComponents/ImagePreviewModal";
import { FaRegFileLines } from "react-icons/fa6";

const MessageItem = ({ message, userId }) => {
  const [showImagePreview, setShowImagePreview] = useState(false);
  const isCurrentUser = message.sender_id.toString() === userId.toString();

  const handleShow = () => setShowImagePreview(true);
  const handleClose = () => setShowImagePreview(false);

  const handleFileDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', message.content || 'document'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case "voice":
        return (
          <div dir={isCurrentUser ? "ltr" : "rtl"}>
            <AudioPlayer
              src={message.media_path}
              autoPlayAfterSrcChange={false}
              showJumpControls={false}
              layout="horizontal"
              customProgressBarSection={[
                "PROGRESS_BAR",
                "CURRENT_TIME",
                "DURATION",
              ]}
              customControlsSection={["MAIN_CONTROLS"]}
              style={{
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
              className={`custom-audio-player px-0  d-flex ${
                isCurrentUser
                  ? "sent justify-content-end"
                  : "received justify-content-start"
              }`}
              dir={isCurrentUser ? "rtl" : "ltr"}
              defaultDuration={message.voice_duration || "00:00"}
            />
          </div>
        );
      case "image":
        return (
          <div className="image-message-container w-100 position-relative">
            <img
              src={
                message?.media_path ||
                process.env.PUBLIC_URL +
                  "/Assets/Images/default-placeholder.jpg"
              }
              className="chat-item-message-img w-100 cursor-pointer"
              alt="image"
              onClick={handleShow}
            />
          </div>
        );
      case "file":
        return (
          <div className="file-message-container w-100 d-flex align-items-center gap-2 p-2 cursor-pointer"
          onClick={() => handleFileDownload(message.media_path)}
         >
            <FaRegFileLines className="fs-4 l-d-clr " />
            <div className="file-info flex-grow-1">
              <div className="file-name text-truncate l-d-clr fw-semibold">
                {message.content || "Document"}
              </div>
            </div>
          </div>
        );
      default:
        return message.content;
    }
  };

  return (
    <>
      <div
        className="my-1 lh-sm d-flex gap-2 align-items-start"
        dir={isCurrentUser ? "rtl" : "ltr"}
      >
        {!isCurrentUser && message.isFirstInGroup && (
          <img
            src={
              message?.sender_details?.image ||
              process.env.PUBLIC_URL +
                "/Assets/Images/human-placeholder-square.jpg"
            }
            className="chat-message-img"
            alt="image"
          />
        )}
        {!isCurrentUser && !message.isFirstInGroup && <div className="w-32p" />}
        <div className="d-flex flex-column message-box-mw">
          <div
            className={`mb-1 small message-box rounded-2 w-100 ${
              isCurrentUser
                ? "sc-1-bg l-d-clr border-radius-top-right-0"
                : "l-d-bg mc-1-clr border-radius-bottom-left-0"
            }`}
          >
            {renderMessageContent()}
          </div>
          {message.isLastInGroup && (
            <div
              className={`chat-message-time d-flex align-items-center w-100 ${
                isCurrentUser ? "justify-content-end" : "justify-content-start"
              }`}
              dir="ltr"
            >
              {isCurrentUser && (
                <RiCheckDoubleLine
                  className={`me-2 fs-6 ${
                    message?.is_seen === 0 ? "mc-1-clr" : "check-color"
                  }`}
                />
              )}
              {formatTime(message.created_at || null)}
            </div>
          )}
        </div>
      </div>
      {showImagePreview && (
        <ImagePreviewModal
          message={message}
          show={showImagePreview}
          onHide={handleClose}
        />
      )}
    </>
  );
};

export default MessageItem;