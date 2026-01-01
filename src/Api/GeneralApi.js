import apiClient from "./apiClient";

export const getHomeStatistics = () => {
  return apiClient.get("/statistics/user-cases");
};

export const getNotifications = (param) => {
  return apiClient.get(`/notifications`, { params: param });
};

export const viewSingleNotification = (id) => {
  return apiClient.get(`/notifications/${id}`);
};

export const sendNotification = (newNotification) => {
  return apiClient.post("/notifications", newNotification);
};

export const updateNotification = (id, data) => {
  return apiClient.put(`/notifications/${id}`, data);
};
export const deleteNotification = (id) => {
  return apiClient.delete(`/notifications/${id}`);
};

export const getSupportMessages = (params) => {
  return apiClient.get(`/support-teams?page=${params.page}`);
};
export const deleteSupportMessage = (id) => {
  return apiClient.delete(`/support-teams/${id}`);
};

export const aboutUsData = () => {
  return apiClient.get("/business-settings/about-office");
};
export const addAboutUsData = (newData) => {
  return apiClient.post("/business-settings/about-office",newData);
};

export const getMessages = (params) => {
  return apiClient.get(`/notifications/received?page=${params.page}`);
};

export const markNotificationSeen = (id) => {
  return apiClient.post(`/notifications/${id}/mark-seen`);
};

