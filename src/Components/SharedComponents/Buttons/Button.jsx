import React from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import { HiOutlineChat } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { TbUserSearch } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { TbEditCircle } from "react-icons/tb";

// import { FaCheck as RightCheck } from "react-icons/fa";

const Button = ({
  href = "",
  buttonType = "create",
  customClass = "",
  CustomStyle = {},
  icon = "",
  type = "link",
  typeAttribute = "",
  iconClass = "",
  value = "",
  onClick = () => {},
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <>
      {type === "link" ? (
        <a
          dir={isRTL ? "rtl" : "ltr"}
          type={typeAttribute}
          href={href}
          className={
            buttonType === "create"
              ? `btn create-btn-bg  l-d-clr fw-medium text-capitalize d-flex align-items-center ${customClass} `
              : buttonType === "main"
              ? ` btn bg-transparent  fw-medium  border text-capitalize d-flex align-items-center ${customClass}`
              : buttonType === "update"
              ? ` btn bg-transparent  fw-medium  secondary-border sc-1-clr text-capitalize d-flex align-items-center ${customClass}`
              : buttonType === "cancel"
              ? ` btn  fw-medium  create-btn-clr layout-btn-bg sc-1-clr text-capitalize d-flex align-items-center ${customClass}`
              : ""
          }
          style={CustomStyle}
        >
          {value}
          {icon === "FiPlus" ? (
            <FiPlus
              className={
                value !== ""
                  ? `${isRTL?"me-2":"ms-2"} fw-semibold fs-6 ${iconClass}`
                  : `fw-semibold fs-6 ${iconClass}`
              }
            />
          ) : icon === "LuArrowRight" ? (
            isRTL ? (
              <LuArrowLeft
                className={
                  value !== ""
                    ? `${isRTL?"me-2":"ms-2"} fw-semibold fs-6 ${iconClass}`
                    : `fw-semibold fs-6 ${iconClass}`
                }
              />
            ) : (
              <LuArrowRight
                className={
                  value !== ""
                    ? `${isRTL?"me-2":"ms-2"} fw-semibold fs-6 ${iconClass}`
                    : `fw-semibold fs-6 ${iconClass}`
                }
              />
            )
          ) : icon === "FiEdit" ? (
            <TbEdit
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : `${iconClass}`}
            />
          ) : icon === "GoTrash" ? (
            <TbTrash
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : `${iconClass}`}
            />
          ) : icon === "IoChatbubbleEllipsesOutline" ? (
            <HiOutlineChat
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : ` ${iconClass}`}
            />
          ) : icon === "TbUserSearch" ? (
            <TbUserSearch
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : ` ${iconClass}`}
            />
          ) : icon === "FaCheck" ? (
            <FaCheck
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : ` ${iconClass}`}
            />
          ) : icon === "TbEditCircle" ? (
            <TbEditCircle
              className={
                value !== "" ? `${isRTL?"me-2":"ms-2"} fs-5 ${iconClass}` : `fs-5 ${iconClass}`
              }
            />
          ) : null}
          
        </a>
      ) : (
        <button
          onClick={onClick}
          type={typeAttribute}
          dir={isRTL ? "rtl" : "ltr"}
          className={
            buttonType === "create"
              ? `btn create-btn-bg  l-d-clr fw-medium btn-h48-s15  btn-lg text-capitalize d-flex align-items-center ${customClass} `
              : buttonType === "submit"
              ? ` btn sc-1-bg l-d-clr fw-semibold  ${customClass}`
              : buttonType === "main"
              ? ` btn bg-transparent  fw-medium  border text-capitalize ${customClass}`
              : buttonType === "update"
              ? ` btn bg-transparent  fw-medium  secondary-border sc-1-clr text-capitalize ${customClass}`
              : buttonType === "cancel"
              ? ` btn  fw-medium create-btn-clr  layout-btn-bg sc-1-clr text-capitalize ${customClass}`
              : ""
          }
          style={CustomStyle}
        >
          {value}
          {icon === "FiPlus" ? (
            <FiPlus
              className={
                value !== ""
                  ? `${isRTL?"me-2":"ms-2"} fw-semibold fs-6 ${iconClass}`
                  : `fw-semibold fs-6 ${iconClass}`
              }
            />
          ) : icon === "LuArrowRight" ? (
            isRTL ? (
              <LuArrowLeft
                className={
                  value !== ""
                    ? `${isRTL?"me-2":"ms-2"} fw-semibold fs-6 ${iconClass}`
                    : `fw-semibold fs-6 ${iconClass}`
                }
              />
            ) : (
              <LuArrowRight
                className={
                  value !== ""
                    ? `${isRTL ? "me-2" : "ms-2"} fw-semibold fs-6 ${iconClass}`
                    : `fw-semibold fs-6 ${iconClass}`
                }
              />
            )
          ) : icon === "FiEdit" ? (
            <TbEdit
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : `${iconClass}`}
            />
          ) : icon === "GoTrash" ? (
            <TbTrash
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : `${iconClass}`}
            />
          ) : icon === "IoChatbubbleEllipsesOutline" ? (
            <HiOutlineChat
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : ` ${iconClass}`}
            />
          ) : icon === "TbUserSearch" ? (
            <TbUserSearch
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : ` ${iconClass}`}
            />
          ) : icon === "FaCheck" ? (
            <FaCheck
              className={value !== "" ? `${isRTL?"me-2":"ms-2"} ${iconClass}` : ` ${iconClass}`}
            />
          ) : icon === "TbEditCircle" ? (
            <TbEditCircle
              className={
                value !== "" ? `${isRTL?"me-2":"ms-2"} fs-5 ${iconClass}` : `fs-5 ${iconClass}`
              }
            />
          ) : null}
        </button>
      )}
    </>
  );
};

export default Button;
