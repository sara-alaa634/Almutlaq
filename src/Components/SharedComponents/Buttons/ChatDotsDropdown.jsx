import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsVertical } from "react-icons/hi";
import { useUsers } from "../../../Hooks/useUsers";
const ChatDotsDropdown = ({
  buttonType = "main",
  customClass = "",
  optionClass = "",
  CustomStyle = {},
  optionStyle = {},
  actionID = "",
  onSelect,
  userBlocked,
  reciverData,
  hasDeletePermission = false,
  hasBlockPermission = false,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { blockUser, unBlockUser, removeUser } = useUsers();
  const handleSelect = async (actionType) => {
    if (onSelect) {
      if (actionType === "delete") {
        await removeUser(actionID);
        onSelect(!userBlocked, actionID, true);
      } else if (actionType === "block") {
        await blockUser(actionID);
        onSelect(!userBlocked, actionID);
      } else if (actionType === "unBlock") {
        await unBlockUser(actionID);
        onSelect(!userBlocked, actionID);
      }
    }
  };
  return (
    <div className="btn-group">
      <button
        className={
          buttonType === "main"
            ? `btn bg-transparent fw-medium create-btn-clr border text-capitalize dropdown-toggle dots-action ${customClass}`
            : buttonType === "subMain"
            ? `btn bg-transparent fw-medium mc-1-clr text-capitalize dropdown-toggle dots-action ${customClass}`
            : ""
        }
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={CustomStyle}
      >
        <HiDotsVertical />
      </button>
      <ul className={`dropdown-menu ${isRTL?"text-end":"text-start"}`}>
        {userBlocked && hasBlockPermission ? (
          <li
            data-action="unBlock"
            onClick={(e) => {
              handleSelect(e.target.dataset.action);
            }}
            className={`text-capitalize dropdown-item cusrsor-pointer ${optionClass}`}
            style={optionStyle}
          >
            {t("unblock account")}
          </li>
        ) : !userBlocked && hasBlockPermission ? (
          <li
            data-action="block"
            onClick={(e) => {
              handleSelect(e.target.dataset.action);
            }}
            className={`text-capitalize dropdown-item cusrsor-pointer ${optionClass}`}
            style={optionStyle}
          >
            {t("block account")}
          </li>
        ) : null}

        {hasDeletePermission ? (
          <li
            data-action="delete"
            onClick={(e) => {
              handleSelect(e.target.dataset.action);
            }}
            className={`text-capitalize dropdown-item cusrsor-pointer ${optionClass}`}
            style={optionStyle}
          >
            {t("delete account")}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default ChatDotsDropdown;
