import { useState } from "react";
import {
  getUsersAndClients,
  filterUsers,
  filterUsersPage,
  filterUsersCount,
  createUserByAdmin,
  updateUserStatus,
  updateUserProfileByAdmin,
  getUserProfileAdminPermission,
  getUserProfileData,
  getLoggedUserProfile,
  getUserProfileCases,
  updateLoggedUserProfile,
  userDelete,
  userBlock,
  userUnBlock,
  createRole,
  getRoles,
} from "../Api/UsersApi";
import { Toast } from "../helpers/Toast";
import { useTranslation } from "react-i18next";
import { successMessages, errorMessages } from "../helpers/messages";
import { useHasPermission } from "../Hooks/usePermissions";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { handlePermsssionError } = useHasPermission();


  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getUsersAndClients();
      setUsers(usersData.data);
      setLoading(false);
      return usersData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  const fetchUsersCounts = async (userType) => {
    setLoading(true);
    try {
      const usersData = await filterUsersCount(userType);
      setUsers(usersData.data);
      setLoading(false);
      return usersData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)

    }
  };

  const fetchFilteredUsers = async (userType) => {
    setLoading(true);
    try {
      const usersData = await filterUsers(userType);
      setUsers(usersData.data);
      setLoading(false);
      return usersData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  const fetchLoggedUserProfile=async () =>{
    try{
      setLoading(true);
      const userData=await getLoggedUserProfile();
      setLoading(false);
      return userData.data.user
    }catch(err){
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  }
  const fetchUserProfileAdminPermission=async (userId) =>{
    try{
      setLoading(true);
      const userData=await getUserProfileAdminPermission(userId);
      setLoading(false);
      return userData.data.user
    }catch(err){
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  }
  const fetchUserProfileAdminInChat=async (userId) =>{
    try{
      setLoading(true);
      const userData=await getUserProfileAdminPermission(userId);
      setLoading(false);
      return userData.data
    }catch(err){
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  }
  

  const editLoggedUserProfile=async (userName,userAddress,userPhone,image) =>{
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("address", userAddress);
      formData.append("phone", userPhone);
      if(image !== null){
        formData.append("image", image);

      }
      const resposne= await updateLoggedUserProfile(formData);
      setLoading(false);
      Toast("success", t(successMessages.updateUserProfile));
      return resposne.data.user;
    }catch(err){
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  }

  const fetchFilteredUsersPage = async (params) => {
    setLoading(true);
    try {
      const filterData = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== null)
      );
      const usersData = await filterUsersPage(filterData);
      setUsers(usersData.data);
      setLoading(false);
      return usersData.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const fetchUserProfile=async (userID)=>{
    try{
      setLoading(true);
      const userData = await getUserProfileData(userID);
      setLoading(false);
      return userData.data.user;
    }catch(err){
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  }
  const fetchUserProfileCases=async (userID)=>{
    try{
      setLoading(true);
      const userCases = await getUserProfileCases(userID);
      setLoading(false);
      return userCases.data;
    }catch(err){
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  }
  const createUser = async (
    name,
    email,
    telephone,
    password,
    image,
    userType,
    userRole
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", telephone);
      formData.append("password", password);
      formData.append("password_confirmation", password);
      formData.append("user_type", userType);
      if (userRole !== null) {
        formData.append("role_name", userRole);
      }
      if (image !== null) {
        formData.append("image", image);
      }
      await createUserByAdmin(formData);
      setLoading(false);
      Toast("success", t(successMessages.createUser));
    } catch (err) {
      setLoading(false);
      const responseData = JSON.parse(err?.response?.data);
      if (responseData && responseData.email) {
        responseData.email.forEach((error) => {
          if (error === "The email has already been taken.") {
            Toast("error", t(errorMessages.emailTaken));
          }
        });
      } else {
        handlePermsssionError(err,setError,t)
      }
    }
  };

  const editUserProfile = async (
    userID,
    name,
    email,
    telephone,
    oldImage,
    image,
    userType,
    userRole
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", userID);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", telephone);
      formData.append("user_type", userType);
      if (userRole !== null) {
        formData.append("role_name", userRole);
      }
      if (image !== null && image !== oldImage ) {
        formData.append("image", image);
      }
      await updateUserProfileByAdmin(formData);
      setLoading(false);
      Toast("success", t(successMessages.updateUser));
    } catch (err) {
      setLoading(false);
      const responseData = JSON.parse(err?.response?.data);
      if (responseData && responseData.email) {
        responseData.email.forEach((error) => {
          if (error === "The email has already been taken.") {
            Toast("error", t(errorMessages.emailTaken));
          }
        });
      } else {
        handlePermsssionError(err,setError,t)
      }
    }
  };

  const switchUserState=async (userID,status)=>{
   try{
    setLoading(true)
    const data={
      id:userID,
      status:status
    }
    await updateUserStatus(data)
    Toast("success", t(successMessages.clientUpdateState));
    setLoading(false);
   }catch(err){
    setLoading(false);
    handlePermsssionError(err,setError,t)

   }
  }
  const removeUser = async (userID) => {
    setLoading(true);
    try {
     await userDelete(userID);
      Toast("success", t(successMessages.deleteUser));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const blockUser = async (userID) => {
    setLoading(true);
    try {
      const response =await userBlock(userID);
      Toast("success", t(successMessages.blockUser));
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const unBlockUser = async (userID) => {
    setLoading(true);
    try {
      const response =await userUnBlock(userID);
      Toast("success", t(successMessages.unBlockUser));
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const rolesData = await getRoles();
      setLoading(false);
      return rolesData.data.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };
  const addRole = async (roleData) => {
    setLoading(true);
    try {
      await createRole(roleData);
      setLoading(false);
      Toast("success", t(successMessages.createRole));
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err,setError,t)
    }
  };

  return {
    fetchUsers,
    fetchFilteredUsers,
    fetchFilteredUsersPage,
    fetchUsersCounts,
    fetchLoggedUserProfile,
    editLoggedUserProfile,
    fetchUserProfileAdminPermission,
    fetchUserProfileAdminInChat,
    createUser,
    editUserProfile,
    fetchUserProfile,
    fetchUserProfileCases,
    switchUserState,
    removeUser,
    blockUser,
    unBlockUser,
    addRole,
    fetchRoles,
    users,
    loading,
    error,
  };
};
