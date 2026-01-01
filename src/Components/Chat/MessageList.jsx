import React from "react";
import MessageItem from "./MessageItem";
import { PulseLoader } from "react-spinners";
import '../../Assets/Css/Chat.css'
import { useTranslation } from "react-i18next";

const MessageList = ({
  messagesData,
  userId,
  receiverId,
  loadingMessages,
  messagesContainerRef,
  loaderRef,
  userBlocked
}) => {
  const { t } = useTranslation();
  
  const processedMessages = messagesData.map((message, index) => {
    const nextMessage = messagesData[index + 1];
    const isLastInGroup = !nextMessage || nextMessage.sender_id !== message.sender_id;
    const isFirstInGroup = !messagesData[index - 1] || messagesData[index - 1].sender_id !== message.sender_id;

    return {
      ...message,
      isLastInGroup,
      isFirstInGroup
    };
  });

  return (
    <div
      ref={messagesContainerRef}
      className="list-group p-3 list-group-flush scrollarea sc-1 custom-scroll"
      style={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      {receiverId && (
        <div ref={loaderRef} className="text-center p-2">
          {loadingMessages && (
            <PulseLoader
              color="var(--sc-1)"
              loading={loadingMessages}
              size={10}
              speedMultiplier={0.5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
      )}
      {processedMessages.map((message, index) => (
        <MessageItem
          key={message.id || index}
          message={message}
          userId={userId}
        />
      ))}
      {userBlocked && (
        <div className="text-center fw-semibold text-danger text-capitalize">
          {t('the admin blocks this user, you will not be able to contact him until his status is changed')}
        </div>
      )}
    </div>
  );
};

export default MessageList;