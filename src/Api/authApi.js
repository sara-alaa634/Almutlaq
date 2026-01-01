import apiClient from "./apiClient";
import { handleApiError } from "../helpers/apiError";
import { setToken, removeToken } from "../Services/TokenService";
import { setID, removeID } from "../Services/LocalStorageVaraibles";
import {removePermissions, setUserPermissions} from "../Services/PermissionsService";
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    const { access_token, expires_in, user } = response.data;
    removeToken();
    removeID();
    removePermissions();
    setToken(access_token, expires_in);
    setID(user.id);
    setUserPermissions(user.permissions);

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await removeToken();
    await removeID();
    await removePermissions();
    return "user logged out";
  } catch (error) {
    throw error;
  }
};
