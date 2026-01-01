import { toast } from "react-toastify";
export const Toast = (type, massege) => {
 //  console.log("massege: ",massege)
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
  if (type === "error") {
    toast.error(massege, toastStyle);
  } else if (type === "success") {
    toast.success(massege, toastStyle);
  } else if (type === "warning") {
    toast.warn(massege, toastStyle);
  } else if (type === "info") {
    toast.info(massege, toastStyle);
  } else {
    toast(massege, toastStyle);
  }
};
