import ChatListItem from "./ChatListItem";
import { PulseLoader } from "react-spinners";

import "../../Assets/Css/Chat.css";

const ChatList = ({
  chatListData,
  receiverId,
  reciverData,
  isNewChat,
  loadingChats,
  chatListContainerRef,
  chatListLoaderRef,
  onSelectChat,
}) => {
  return (
      <div
        className="list-group list-group-flush px-3 chat-list-box scrollarea sc-1 custom-scroll"
        ref={chatListContainerRef}
      >
        {chatListData.map((chat, index) => (
          <ChatListItem
            key={chat.user.id || index}
            chat={chat}
            isActive={
              receiverId === chat.user.id ||
              (!isNewChat && reciverData?.id === chat.user.id)
            }
            onSelect={onSelectChat}
          />
        ))}
        <div ref={chatListLoaderRef} className="text-center p-2">
          {loadingChats && (
            // <span className="spinner-border spinner-border-sm" />
            <PulseLoader
              color="var(--sc-1)"
              loading={loadingChats}
              size={10}
              speedMultiplier={0.5} // Decrease this value to slow down the loader
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
      </div>
  );
};

export default ChatList;
