import { usePermissions } from "../Context/PermissionsContext";
import { errorMessages } from "../helpers/messages";
import { Toast } from "../helpers/Toast";
import { logoutUser } from "../Api/authApi";

export const useHasPermission = () => {

  const { permissions } = usePermissions();

  // console.log("permissions from has permission: ", permissions);

  
  const hasPermission = (permission) => {
    // console.log("permission: ",permission)
    // console.log("has permission:",permissions)
    return permissions.includes(permission);
  };

  const handlePermsssionError = (error, setError, t) => {
    // console.log("has error permission:",permissions)
    const responseMessage = error?.response?.data?.message;
 //    console.log(responseMessage);
    if (responseMessage && responseMessage === "This action is unauthorized.") {
    //   console.log("ds")
      Toast("error", t(errorMessages.hasNoPermission));
      logoutUser();
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      setError(error);
    }
  };
  return {
    hasPermission,
    handlePermsssionError,
  };
};
