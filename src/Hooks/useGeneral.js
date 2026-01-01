import { useState } from "react";
import {
  getHomeStatistics,
  sendNotification,
  getNotifications,
  viewSingleNotification,
  updateNotification,
  deleteNotification,
  getSupportMessages,
  deleteSupportMessage,
  aboutUsData,
  addAboutUsData,
  getMessages,
  markNotificationSeen,
} from "../Api/GeneralApi";
import { useTranslation } from "react-i18next";
import { Toast } from "../helpers/Toast";
import { useHasPermission } from "../Hooks/usePermissions";
import { successMessages } from "../helpers/messages";
export const useGeneral = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { handlePermsssionError } = useHasPermission();

  const fetchHomeStatistics = async () => {
    try {
      setLoading(true);
      const statistics = await getHomeStatistics();
      setLoading(false);
      return statistics.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchNotifications = async (params) => {
    try {
      const casesData = await getNotifications(params);
      return casesData.data.notifications;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };
  const fetchSingleNotification = async (id) => {
    try {
      setLoading(true);
      const casesData = await viewSingleNotification(id);
      setLoading(false);
      return casesData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const addNotification = async (reciver, title, description) => {
    setLoading(true);
    try {
      const data = {
        to: reciver,
        notification_title: title,
        notification_body: description,
      };
      const response = await sendNotification(data);
      setLoading(false);
      Toast("success", t(successMessages.sendNotification));

      return response.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const editNotification = async (
    id,
    seletedUsersType,
    emailIds,
    emailTitle,
    emailDescription
  ) => {
    try {
      setLoading(true);
      const data = {
        to: emailIds,
        notification_title: emailTitle,
        notification_body: emailDescription,
        userType: seletedUsersType,
      };
      await updateNotification(id, data);
      setLoading(false);
      Toast("success", t(successMessages.updateNotification));
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const removeNotification = async (id) => {
    try {
      setLoading(true);
      await deleteNotification(id);
      setLoading(false);
      Toast("success", t(successMessages.deleteNotification));
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchSupportMessage = async (params) => {
    try {
      const messages = await getSupportMessages(params);
      return messages.data;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const removeSupportMessage = async (id) => {
    try {
      setLoading(true);
      await deleteSupportMessage(id);
      setLoading(false);
      Toast("success", t(successMessages.deleteSupportMessage));
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchAboutUsData = async () => {
    try {
      const messages = await aboutUsData();
      return messages.data;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const addNewAboutData = async (image, text) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if(image !== null){
        formData.append("about_office_image", image);
      }
      formData.append("about_office_text", text);

      const response = await addAboutUsData(formData);
      setLoading(false);
      Toast("success", t(successMessages.newAboutDataAdded));

      return response.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchNotificationMessages = async (params) => {
    try {
      setLoading(true);
      const messages = await getMessages(params);
      setLoading(false);
      return messages.data;
    } catch (err) {
      setLoading(false);

      handlePermsssionError(err, setError, t);
    }
  };

  const changeNotificationToSeen = async (id) => {
    try {
      await markNotificationSeen(id);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  return {
    fetchHomeStatistics,
    addNotification,
    fetchNotifications,
    fetchSingleNotification,
    editNotification,
    removeNotification,
    fetchSupportMessage,
    removeSupportMessage,
    fetchAboutUsData,
    addNewAboutData,
    fetchNotificationMessages,
    changeNotificationToSeen,
    loading,
    error,
  };
};
