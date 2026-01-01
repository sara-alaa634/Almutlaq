import React, { useEffect, useState, useRef } from "react";
import { useChat } from "../../Hooks/useChat";
import Pusher from "pusher-js";
import { useUser } from "../../Context/userContext";
import { useUsers } from "../../Hooks/useUsers";
import LogoLoader from "../../helpers/loader";
import ChatList from "./ChatList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatFilterList from './ChatFilterList'
import ChatSearch from './ChatSearch'
import "../../Assets/Css/Chat.css";
import ChatDotsDropdown from "../SharedComponents/Buttons/ChatDotsDropdown";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const ChatMainComponent = ({ initialUserId }) => {
  const { t } = useTranslation();
  const [receiverId, setReceiverId] = useState("");
  const [chatListData, setChatListData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [hasCheckedChatList, setHasCheckedChatList] = useState(false);
  // this state to handle new user not in the chatlist
  const [reciverData, setReciverData] = useState(null);
  const { chatList, fetchChatHistory, sendMessage, hasChatHistory } = useChat();
  const { userId } = useUser();
  const { fetchUserProfileAdminInChat, loading } = useUsers();
  const [isNewChat, setIsNewChat] = useState(false);
  // New states for chat list pagination
  const [chatListPage, setChatListPage] = useState(1);
  const [hasMoreChats, setHasMoreChats] = useState(true);
  const [loadingChats, setLoadingChats] = useState(false);
  // handle profile view component
  const [showUserProfile, setShowUserProfile] = useState(false);
  // handle chatList filters
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(null);
  // handle pagination according to scroll
  const messagesContainerRef = useRef(null);
  const loaderRef = useRef(null);
  const chatListContainerRef = useRef(null);
  const chatListLoaderRef = useRef(null);
  const prevScrollHeightRef = useRef(0);
  const isMounted = useRef(true);
  // handle chat responsive
  const [showChatList, setShowChatList] = useState(true);
  const { hasPermission } = useHasPermission();
  const hasCreatePermission = hasPermission(permissionsNames.chat.create);
  const hasDeletePermission = hasPermission(permissionsNames.users.delete);
  const hasBlockPermission = hasPermission(permissionsNames.chat.edit);


  useEffect(() => {
    let isSubscribed = true;

    const fetchInitialChats = async () => {
      if (!userId || loadingChats) return;
      
      try {
        setLoadingChats(true);
        // Reset states when filter or search changes
        setChatListData([]);
        setChatListPage(1);
        setHasMoreChats(true);
        
        const data = await chatList(1, currentFilter, searchTerm);
        if (isSubscribed && data.data) {
          setChatListData(data.data);
          setHasMoreChats(data.data.length === 10);
          setChatListPage(1);
        }
      } catch (error) {
        if (isSubscribed) {
          setHasMoreChats(false);
        }
      } finally {
        if (isSubscribed) {
          setLoadingChats(false);
        }
      }
    };

    fetchInitialChats();

    return () => {
      isSubscribed = false;
    };
  }, [userId, currentFilter, searchTerm]);


  // Set up intersection observer for chat list infinite scroll
  useEffect(() => {
    if (!chatListLoaderRef.current || !hasMoreChats) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loadingChats && hasMoreChats) {
          loadMoreChats();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(chatListLoaderRef.current);
    return () => observer.disconnect();
  }, [loadingChats, hasMoreChats]);
  // handle case of loading the chat page from user recirect with user id
  // the initial user data fetch
  useEffect(() => {
    if (hasCheckedChatList || !chatListData.length || !initialUserId) return;

    const fetchNewUserData = async () => {
      const response = await hasChatHistory(initialUserId);

      if (!response) {
        const userData = await fetchUserProfileAdminInChat(initialUserId);
        setReciverData({
          user: userData.user,
          last_message: {
            type: "text",
            content: "",
          },
          is_blocked_by_auth: userData.is_blocked_by_auth,
        });
        setReceiverId(initialUserId);
        setMessagesData([]);
        setIsNewChat(true);
      } else {
        // Remove any existing entries with this user ID
        setChatListData((prevList) => {
          const newChat = {
            ...response,
            user: response.user,
          };
          return updateChatListWithOrder(newChat, prevList);
        });
        handleGetUser(response.user.id);
      }
      setHasCheckedChatList(true);
    };

    fetchNewUserData();
  }, [initialUserId, hasCheckedChatList, chatListData]);

    // Add cleanup for component unmount
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

  // Set up intersection observer for infinite scroll for chat history
  useEffect(() => {
    if (!loaderRef.current || !hasMoreMessages || !receiverId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          !loadingMessages &&
          hasMoreMessages &&
          receiverId
        ) {
          loadMoreMessages();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loadingMessages, hasMoreMessages, receiverId, currentPage]);

  // Maintain scroll position when loading more messages for chat history
  useEffect(() => {
    if (messagesContainerRef.current && prevScrollHeightRef.current) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
      messagesContainerRef.current.scrollTop = scrollDiff;
    }
  }, [messagesData]);

  // Handle Pusher subscription separately
  useEffect(() => {
    if (!userId) return;
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe(`chat.${userId}`);
    channel.bind("App\\Events\\MessageSent", function (data) {
      if (data.message) {
        // Update messages if it's the current chat
        if (data.message.sender_id === receiverId) {
          setMessagesData((prevMessages) => [...prevMessages, data.message]);

          // Scroll to bottom when new message arrives
          setTimeout(() => {
            if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
            }
          }, 0);
        }

        // Always update chat list order
        setChatListData((prevChatList) => {
          const senderUser = prevChatList.find(
            (chat) => chat.user.id === data.message.sender_id
          );

          if (senderUser) {
            const updatedChat = {
              ...senderUser,
              last_message: {
                content: data.message.content,
                type: data.message.type,
                is_sent_by_auth_user: false,
              },
            };
            return updateChatListWithOrder(updatedChat, prevChatList);
          }
          return prevChatList;
        });
      }
    });

    return () => {
      pusher.disconnect();
      pusher.unsubscribe(`chat.${userId}`);
    };
  }, [userId, receiverId]);

  const updateChatList = (message, isCurrentChat) => {
    setChatListData((prevChatList) => {
      let updatedList = [...prevChatList];
      let chatIndex = updatedList.findIndex(
        (chat) =>
          chat.user.id === (isCurrentChat ? receiverId : message.sender_id)
      );

      if (chatIndex !== -1) {
        const chatToUpdate = updatedList[chatIndex];
        const updatedChat = {
          ...chatToUpdate,
          last_message: {
            content: message.content,
            is_sent_by_auth_user: false,
          },
        };
        updatedList.splice(chatIndex, 1);
        updatedList.unshift(updatedChat);
      }
      return updatedList;
    });
  };

  // Helper function to remove duplicates and sort chats
  const updateChatListWithOrder = (newChat, currentList) => {
    // Remove any existing entries with the same user ID
    const filteredList = currentList.filter(
      (chat) => chat.user.id !== newChat.user.id
    );

    // Add the new chat at the beginning
    return [newChat, ...filteredList];
  };

  const loadMoreMessages = async () => {
    if (loadingMessages || !hasMoreMessages || !receiverId) return;

    setLoadingMessages(true);
    const nextPage = currentPage + 1;
    // Store current scroll height before loading more messages
    if (messagesContainerRef.current) {
      prevScrollHeightRef.current = messagesContainerRef.current.scrollHeight;
    }
    const response = await fetchChatHistory(receiverId, nextPage);
    if (response && response.length > 0) {
      setMessagesData((prevMessages) => [
        ...response.reverse(),
        ...prevMessages,
      ]);
      setCurrentPage(nextPage);
      // Maintain scroll position after new messages are loaded
      setTimeout(() => {
        if (messagesContainerRef.current && prevScrollHeightRef.current) {
          const newScrollHeight = messagesContainerRef.current.scrollHeight;
          const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
          messagesContainerRef.current.scrollTop = scrollDiff;
        }
      }, 0);
    } else {
      setHasMoreMessages(false);
    }
    setLoadingMessages(false);
  };
  const fetchChatList = async (page, isInitial = false) => {
    if (loadingChats || (!isInitial && page <= chatListPage)) return;

    setLoadingChats(true);
    try {
      // Add filter parameter to your API call
      const data = await chatList(page, currentFilter,searchTerm);
      if (!isMounted.current) return;

      if (data.data?.length > 0) {
        setChatListData((prevChats) =>
          isInitial ? data.data : [...prevChats, ...data.data]
        );
        setHasMoreChats(data.data.length === 10);
        setChatListPage(page);
      } else {
        setHasMoreChats(false);
      }
    } catch (error) {
      if (isMounted.current) {
        setHasMoreChats(false);
      }
    } finally {
      if (isMounted.current) {
        setLoadingChats(false);
      }
    }
  };
  const loadMoreChats = async () => {
    if (loadingChats || !hasMoreChats) return;

    const nextPage = chatListPage + 1;
    await fetchChatList(nextPage);
  };

  const handleGetUser = async (userId) => {
    setReceiverId(userId);
    setCurrentPage(1);
    const reciverUser = chatListData.find((chat) => chat.user.id === userId);
    // i made a condtion to handle the case if the user chat found but not in the current chatlist page so its data will be already set  up in the check of user has history request
    if (reciverUser) {
      setReciverData(reciverUser); 
    }
    setHasMoreMessages(true);
    setMessagesData([]);
    setLoadingMessages(true);

    const response = await fetchChatHistory(userId, 1);
    if (response) {
      setMessagesData(response.reverse());
      // Scroll to bottom when loading initial messages
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      }, 0);
    }
    setLoadingMessages(false);
    setShowChatList(false);
  };
  // handleSendMessage function for ChatMainComponent
const handleSendMessage = async (messageData) => {
  if (!receiverId) return;


  let formData = new FormData();
  formData.append("receiver_id", receiverId);

  if (messageData.type === 'voice') {
    // For voice messages, spread the existing FormData
    const voiceFormData = messageData.content;
    for (let [key, value] of voiceFormData.entries()) {
      formData.append(key, value);
    }
  }else if(messageData.type === 'image' || messageData.type === 'file'){
    const media = messageData.content;
    for (let [key, value] of media.entries()) {
      formData.append(key, value);
    }
  } else {
    // For text messages
    formData.append("content", messageData.content);
    formData.append("type", "text");
  }

  try {
    const response = await sendMessage(formData);

    if (response?.data?.message) {
      const scrollContainer = messagesContainerRef.current;
      const wasAtBottom = 
        scrollContainer.scrollHeight - scrollContainer.scrollTop <= 
        scrollContainer.clientHeight + 100;
      
      setMessagesData(prev => [...prev, { ...response.data.data, is_seen: 0 }]);
      if (wasAtBottom) {
        setTimeout(() => {
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
        }, 100);
      }

      setChatListData((prevChatList) => {
        const newChatEntry = {
          user: reciverData?.user || reciverData,
          last_message: {
            content: messageData.type === 'voice' ? "Voice message" :messageData.type === 'image' ? "Media" : messageData.content,
            type: messageData.type,
            is_sent_by_auth_user: true,
            ...response.data.data,
          },
        };
        return updateChatListWithOrder(newChatEntry, prevChatList);
      });

      setIsNewChat(false);
    }

    if (messageData.type === 'text') {
      setNewMessage("");
    }
  } catch (error) {
    // console.error("Error sending message:", error);
  }
};

  const handleBackToList = () => {
    setShowChatList(true);
  };

  const handleUserActions = (isBlocked, userID, deleted) => {
    if (deleted) {
      const newChatlist = chatListData.filter((chat) => chat.user.id !== userID);
      setChatListData(newChatlist);
      setReceiverId("");
      setReciverData(null);
    } else {
      const newChatlist = chatListData.map((chat) =>
        chat.user.id === userID
          ? {
              ...chat,
              is_blocked_by_auth: isBlocked,
            }
          : chat
      );
      setChatListData(newChatlist);
      setReciverData((prev) => ({
        ...prev,
        is_blocked_by_auth: isBlocked,
      }));

    }
  };
//  handle filters in the chatList
  const handleFilterChange = (filter) => {
    if (filter === currentFilter) return;
    setCurrentFilter(filter);
  };
  //handle search filter
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div>
      {loading && <LogoLoader loading={loading} />}
      <div className="chat-wrapper w-100 mb-4 overflow-hidden">
        <div className="row g-0 w-100 ">
          <div
            className={`col-md-5 col-lg-5 col-xl-4 ${
              !showChatList && !showUserProfile ? "d-none d-md-block" : ""
            }`}
          >
            {!showUserProfile ? (
              <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary l-d-bg border-right h-100">
               <ChatSearch onSearch={handleSearch} />
               <ChatFilterList 
               onFilterChange={handleFilterChange}
               currentFilter={currentFilter}
             />
              <ChatList
                chatListData={chatListData}
                setChatListData={setChatListData}
                receiverId={receiverId}
                reciverData={reciverData}
                isNewChat={isNewChat}
                loadingChats={loadingChats}
                chatListContainerRef={chatListContainerRef}
                chatListLoaderRef={chatListLoaderRef}
                onSelectChat={handleGetUser}
              />
              </div>
            ) : (
              <div className="d-flex flex-column bg-body-tertiary l-d-bg border-right h-100">
                <div className="d-flex align-items-center justify-content-end p-2 ">
                  <button
                    className="btn bg-transparent"
                    onClick={() => setShowUserProfile(false)}
                  >
                    <MdOutlineClose className="fs-4 mc-1-clr" />
                  </button>
                </div>
                <div className="p-4 text-center">
                  <div className="d-flex justify-content-center align-items-center ">
                    <div className=" admin-img chat-img position-relative mb-3">
                      <img
                        src={
                          reciverData?.user?.image ||
                          process.env.PUBLIC_URL +
                            "/Assets/Images/human-placeholder-square.jpg"
                        }
                        className="chat-user-profile-img "
                        alt="image"
                      />
                      <span
                        className={`active-user-profile-crircle d-none ${
                          reciverData?.user?.isOnline === 0
                            ? "inActive"
                            : "active"
                        }`}
                      ></span>
                    </div>
                  </div>
                  <h5 className="mb-2">{reciverData?.user?.name}</h5>
                  <div className="mb-2 chat-item-header fw-semibold  mc-1-clr">
                    {reciverData?.user?.user_type === "user"
                      ? t("user")
                      : reciverData?.user?.user_type === "client"
                      ? t("client")
                      : t("our team")}
                  </div>
                </div>
                <div className="about-user p-3 px-md-4 px-3">
                  <div className="chat-item-time">{t("About him")}</div>
                  <div className="chat-item-description mt-3 text-capitalize">
                    {reciverData?.user?.about_me}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`col-md-7 col-lg-7 col-xl-8 ${showChatList ? "d-none d-md-block" : ""}`}
          >
            {receiverId ? (
              <div className="d-flex flex-column chat-history-wrapper">
                <div className="l-d-bg chat-history-user-info d-flex align-items-center justify-content-between py-3 px-md-4 px-3 border-bottomm">
                  <div
                    className="d-flex align-items-center gap-3 justify-content-start cursor-pointer"
                    onClick={() => setShowUserProfile(true)}
                  >
                    <div className="d-flex align-items-center ">
                      <div className=" admin-img chat-img position-relative">
                        <img
                          src={
                            reciverData?.user?.image ||
                            process.env.PUBLIC_URL +
                              "/Assets/Images/human-placeholder-square.jpg"
                          }
                          className="white-border"
                          alt="image"
                        />
                        <span
                          className={`active-user-crircle d-none ${
                            reciverData?.user?.isOnline === 0
                              ? "inActive"
                              : "active"
                          }`}
                        ></span>
                      </div>
                    </div>
                    <div className="reciver-info">
                      <div className="chat-item-header">
                        {reciverData?.user?.name}
                      </div>
                      <div className="chat-item-description d-none">
                        نشط الان
                      </div>
                    </div>
                  </div>
                  <div className="chat-action-btns d-flex  align-items-center">
                    <div className="btn bg-transparent mc-1-clr fs-5 d-none">
                      <IoIosSearch />
                    </div>
                    {reciverData && (
                      <ChatDotsDropdown
                        customClass="btn-h48-s15 btn-lg px-0 cursor-pointer font-size-18"
                        buttonType="subMain"
                        actionID={reciverData?.user?.id}
                        userBlocked={reciverData.is_blocked_by_auth}
                        reciverData={reciverData}
                        onSelect={handleUserActions}
                        hasBlockPermission={hasBlockPermission}
                        hasDeletePermission={hasDeletePermission}
                      />
                    )}
                  </div>
                </div>
                <div className="d-lg-none p-2 border-bottom">
                  <button className="btn btn-light" onClick={handleBackToList}>
                    <i className="bi bi-arrow-left"></i> Back
                  </button>
                </div>
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                  <MessageList
                    messagesData={messagesData}
                    userId={userId}
                    receiverId={receiverId}
                    userBlocked={reciverData?.is_blocked_by_auth}
                    loadingMessages={loadingMessages}
                    messagesContainerRef={messagesContainerRef}
                    loaderRef={loaderRef}
                  />
                  <MessageInput
                    newMessage={newMessage}
                    receiverId={receiverId}
                    onSubmit={handleSendMessage}
                    userBlocked={reciverData?.is_blocked_by_auth}
                    onChange={(e) => setNewMessage(e.target.value)}
                    hasCreatePermission={hasCreatePermission}
                  />
                </div>
              </div>
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center h-100 empty-chat bg-body-tertiary"
                style={{ minHeight: "80vh" }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/Assets/Images/chat.png"}
                  alt="image"
                />
                <p className="text-gray-500 text-lg">
                  {t("Select a user to start a conversation with")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMainComponent;
