import React from "react";
import { useTranslation } from "react-i18next";
import { HiDotsVertical } from "react-icons/hi";

const DotsDropdown = ({
  buttonType = "main",
  customClass = "",
  optionClass = "",
  CustomStyle = {},
  optionStyle = {},
  deleteValue,
  deleteOption = true,
  actionID = "",
  updateOption = true,
  chatOption = false,
  viewOption = false,
  deletePermission,
  updatePermission,
  viewPermission,
  viewChatPermission,
  onSelect,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";  const handleSelect = (actionType) => {
    if (onSelect) {
      onSelect(actionType, actionID);
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
        {viewOption && viewPermission && (
          <li
            data-action="view"
            onClick={(e) => {
              handleSelect(e.target.dataset.action);
            }}
            className={`text-capitalize dropdown-item cusrsor-pointer ${optionClass}`}
            style={optionStyle}
          >
            {t("view")}
          </li>
        )}
        {chatOption && viewChatPermission && (
          <li
            data-action="chat"
            onClick={(e) => {
              handleSelect(e.target.dataset.action);
            }}
            className={`text-capitalize dropdown-item cusrsor-pointer ${optionClass}`}
            style={optionStyle}
          >
            {t("chat")}
          </li>
        )}

        {updateOption && updatePermission && (
          <li
            data-action="update"
            onClick={(e) => {
              handleSelect(e.target.dataset.action);
            }}
            className={`text-capitalize dropdown-item cusrsor-pointer ${optionClass}`}
            style={optionStyle}
          >
            {t("update")}
          </li>
        )}

        {deleteOption && deletePermission && (
          <li
            data-action="delete"
            onClick={(e) => {
              handleSelect(e.target.dataset.action);
            }}
            className={`text-capitalize dropdown-item cusrsor-pointer ${optionClass}`}
            style={optionStyle}
          >
            {deleteValue ? deleteValue : t("delete")}
          </li>
        )}
      </ul>
    </div>
  );
};

export default DotsDropdown;
