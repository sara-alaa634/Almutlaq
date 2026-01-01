import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const FilterDropdown = ({
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  // Improved initial state setup
  const [selectedItem, setSelectedItem] = useState(() => {
    const foundItem = data.find((item) => item.value === value);
    return foundItem ? foundItem.name : value;
  });

  // Update selectedItem when value prop changes
  useEffect(() => {
    const foundItem = data.find((item) => item.value === value);
    if (foundItem) {
      setSelectedItem(foundItem.name);
    }
  }, [value, data]);

  const handleSelect = (item) => {
    setSelectedItem(item.name);
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
        {selectedItem ? t(selectedItem) : value}
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
              onClick={() => handleSelect(item)}
            >
              {t(item.name)}
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
export default FilterDropdown;
