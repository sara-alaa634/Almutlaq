import React from "react";
import "../../Assets/Css/Chat.css";
import { TbPhoto } from "react-icons/tb";
import { FaMicrophone } from 'react-icons/fa';
import { FaRegFileAlt } from "react-icons/fa";


const ChatListItem = ({ chat, isActive, onSelect }) => {
  return (
    <a
    onClick={() => onSelect(chat.user.id)}
    className={`list-group-item list-group-item-action d-flex gap-3 mb-2 algin-items-center justiify-content-start border-0 p-2 cursor-pointer ${isActive ? "active" : ""}`}
      aria-current="true"
    >
      <div className="d-flex align-items-center">
        <div className=" admin-img chat-img position-relative">
          <img
            src={
              chat?.user?.image ||
              process.env.PUBLIC_URL +
              "/Assets/Images/human-placeholder-square.jpg"
            }
            className="white-border"
            alt=""
            />
          <span className={`active-user-crircle d-none ${chat?.user?.isOnline === 0 ?"inActive":"active"}  `}></span>
        </div>
      </div>
      <div className="chat-info flex-grow-1 d-flex align-items-start justify-content-between">
        <div>
          {" "}
          <div className="chat-item-header">{chat.user.name || chat?.user?.user?.name || "user"}</div>
        
              <p className="mb-0 chat-item-description ">
              { chat?.last_message?.type === "voice"?(<span className="chat-item-description"><FaMicrophone className="me-1"/>{chat?.last_message?.voice_duration || "00:00"}</span> ):chat?.last_message?.type === "image"?(<span className="chat-item-description"><TbPhoto/> image</span>):chat?.last_message?.type === "file"?(<span className="chat-item-description"><FaRegFileAlt/> file</span>):chat?.last_message?.content?.length > 20
                          ? `${chat.last_message.content.slice(0, 20)}...`
                          : chat.last_message.content || ""}
              </p>
          
        </div>
        <span className="chat-item-time d-none">8 Minutes</span>
      </div>
    </a>

  );
};

export default ChatListItem;
