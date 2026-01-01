import { Toast } from "./Toast";
import {removeToken } from '../Services/TokenService';
import { toast } from "react-toastify";
import { translate } from '../Services/Translate'; // Import the translate function

const toastStyle = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};
export const handleApiError = (error) => {
  console.error("API Error:", error);
  // Check if it's a network error
  if (!error.response) {
    // Toast("error","Network error. Please check your internet connection or try again later.")
    toast.error(
      translate("Network error. Please check your internet connection or try again later."),
      toastStyle
    );
    return;
  }

  const message = error.response.data.message || 'An unexpected error occurred.';
  const status=error.response.status || ""

  // Handle specific HTTP error statuses
  switch (error.response.status) {
    case 400:
     //  console.log(error);
      Toast("error", translate("Bad Request. Please check your input and try again."))
      break;
    case 401:
     //  console.log(error);
      Toast("error",translate("Unauthorized! Please log in again."))
      removeToken();
      // window.location.href = "/login";

      break;
    case 403:
   //    console.log(error);
      Toast("error", translate("Forbidden! You do not have permission to access this resource."))
      break;
    case 404:
   //    console.log(error);
      Toast("error",translate("Resource not found! Please check the URL."))
      break;
    case 500:
    //   console.log(error);
      Toast("error",translate("Server error. Please try again later."))
      break;
    default:
      console.log(error);
      // if(error.response.data === "The email has already been taken."){
      //   console.log(error.response.data )
     // }
     
      Toast("error",translate("The request was not processed, please try again with valid information."))
      // Toast("error",`Error: ${status}. ${message}`)
  }
};
