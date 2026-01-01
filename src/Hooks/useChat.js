import { useState } from "react";
import { getChatHistroy, sendChatMessage ,AdminChatList,userHasChatHistory} from "../Api/ChatApi";
import { useTranslation } from "react-i18next";
import { Toast } from "../helpers/Toast";
import { useHasPermission } from "../Hooks/usePermissions";
import { CoPresentOutlined } from "@mui/icons-material";

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { handlePermsssionError } = useHasPermission();

  const fetchChatHistory = async (userID, pageId=1) => {
    try {
      //console.log("page number: ",pageId)
      setLoading(true);
      const chatHistory = await getChatHistroy(userID, pageId);
      setLoading(false);
      //console.log("chatHistory from useChat: ",chatHistory.data.messages.data)
      return chatHistory.data.messages.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const chatList = async (page, filter = 'all',search=null) => {
    try {
      setLoading(true);
      const chatHistory = await AdminChatList(page,filter,search);
      //console.log("page number: ",page," , filter type: ",filter," , search: ",search)
      //console.log("chatList from useChat: ",chatHistory)
      setLoading(false);
      return chatHistory.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const sendMessage = async (data) => {
    try {
      setLoading(true);
      const respose = await sendChatMessage(data);
      setLoading(false);
      return respose;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const hasChatHistory =async (userId)=>{
    try{
      const respose=await userHasChatHistory(userId);
      //console.log("has chat history from useChat:",respose)
      return respose.data;
    }    
    catch(err){
      handlePermsssionError(err, setError, t);

    }
  }
  return { fetchChatHistory, sendMessage, chatList,hasChatHistory,loading, error };
};
