import { getPermissons } from "../Services/PermissionsService";
import { Toast } from "./Toast";
import { errorMessages } from "./messages";
import {logoutUser} from '../Api/authApi'
import { usePermissions } from "../Context/PermissionsContext";

// export const hasPermission = (permission) => {
//   const { permissions } = usePermissions();
//   return permissions.includes(permission);
// };

export const handlePermsssionError = (error,setError,t) => {
  const responseMessage = error?.response?.data?.message;
 //  console.log(responseMessage);
  if (responseMessage && responseMessage === "This action is unauthorized.") {
    Toast("error", t(errorMessages.hasNoPermission));
    logoutUser()
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } else {
    setError(error)
  }
};

export const hasPermisssionOnClick = (permission, t) => {
  const permissions = getPermissons();
  if (permissions.includes(permission)) {
    return true;
  } else {
    Toast("error", t(errorMessages.hasNoPermission));
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
    return;
  }
};
