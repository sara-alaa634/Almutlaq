import Swal from 'sweetalert2';

export const defaultAlert = async (title,text,confirmButtonText,cancelButtonText,icon) => {
  const result = await Swal.fire({
    title: title,
    text:text,
    confirmButtonText:confirmButtonText,
    cancelButtonText:cancelButtonText,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "var(--statistic-bg3)",
    cancelButtonColor: "transparent"
  });
  return result.isConfirmed; 
};