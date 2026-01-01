import { useState } from "react";
import { loginUser, logoutUser } from "../Api/authApi";
import { useNavigate } from "react-router-dom";
import { Toast } from "../helpers/Toast";
import { useTranslation } from "react-i18next";
import { successMessages } from "../helpers/messages";
import { usePermissions } from "../Context/PermissionsContext";
import { useUser } from "../Context/userContext";

export const useLogin = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { handleLogin, handleLogout } = usePermissions();
  const {loadUserID}=useUser()
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginUser(email, password);
      await handleLogin();
      await loadUserID()
      setLoading(false);
      Toast("success", t(successMessages.login));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    //   console.log("userData: ", userData);
      return userData;
    } catch (err) {
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutUser();
      // await handleLogout();
      Toast("success", t(successMessages.logout));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    } catch (err) {
      setLoading(false);
      return null;
    }
  };

  return { login, logout, loading, error };
};
