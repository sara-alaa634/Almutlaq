import apiClient from "./apiClient";

export const getChatHistroy = (userID, pageId) => {
  return apiClient.get(`/messages?page=${pageId}`, {
    params: {
      user_id: userID,
    },
  });
};
export const sendChatMessage = (data) => {
  return apiClient.post("/send-message", data);
};

export const AdminChatList = (page, filter,search) => {
  return apiClient.get(
    `/chat-list?page=${page}&user_type=${filter}${search !==null?"&search="+search:""}`
  );
};

export const userHasChatHistory = (userId) => {
  return apiClient.get(`/chat/has-history/${userId}`);
};
