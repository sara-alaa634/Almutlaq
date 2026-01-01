import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiDotsVertical } from "react-icons/hi";

const DropDownButton = ({
  buttonType = "main",
  customClass = "",
  optionClass = "",
  dropDownBoxClass = "",
  buttonWrapper = "",
  CustomStyle = {},
  optionStyle = {},
  value = "",
  data = [],
  onSelect,
  disabled,
}) => {
  const [selectedItem, setSelectedItem] = useState(value);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleSelect = (item) => {
    setSelectedItem(item.title);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className={`btn-group ${buttonWrapper}`}>
      <button
        className={
          buttonType === "main"
            ? `btn bg-transparent fw-medium create-btn-clr border text-capitalize dropdown-toggle ${customClass}`
            : null
        }
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={CustomStyle}
        disabled={disabled}
      >
        {selectedItem && selectedItem === "dots" ? (
          <HiDotsVertical />
        ) : (
          selectedItem || value
        )}
      </button>
      <ul
        className={`dropdown-menu ${dropDownBoxClass} ${
          isRTL ? "text-end" : "text-start"
        }`}
      >
        {data && data.length > 0 ? (
          data.map((item) => (
            <li
              key={item.id}
              className={`dropdown-item cusrsor-pointer ${optionClass}`}
              style={optionStyle}
              onClick={() => handleSelect(item)} // Pass the selected item directly
            >
              {item.title}
            </li>
          ))
        ) : (
          <li className={`dropdown-item cusrsor-pointer ${optionClass}`}>
            {t("No options available")}
          </li>
        )}
      </ul>
    </div>
  );
};

export default DropDownButton;
