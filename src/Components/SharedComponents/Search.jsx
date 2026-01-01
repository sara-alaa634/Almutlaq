import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosSearch } from "react-icons/io";

const Search = ({
  onChange = () => {},
  onKeyPress = () => {},
  onSubmit = () => {},
  value = "",
  inputClass = "normal",
  buttonClass = "normal",
  buttonClick = () => {},
  customInputClass = "",
  customButtonClass = "",
  placeholder,
  dir = "rtl",
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form className="d-flex flex-grow-1" role="search" onSubmit={handleSubmit}>
      {dir && dir === "rtl" ? (
        <>
          <input
            className={
              inputClass === "normal"
                ? `form-control search btn-h48-s15 ps-3 create-btn-clr border search-filter ${
                    isRTL ? "rtl" : "ltr"
                  } ${customInputClass}`
                : inputClass === "chat-search"
                ? `form-control ps-3 ${customInputClass} `
                : ""
            }
            type="search"
            placeholder={t(placeholder || "search")}
            aria-label="Search"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
          />
          <button
            className={
              buttonClass === "normal"
                ? `btn bg-white rounded search-filter-btn border pe-3 btn-h48-s15 ${
                    isRTL ? "rtl" : "ltr"
                  } ${customButtonClass}`
                : buttonClass === "chat-search"
                ? `btn bg-white rounded search-filter-btn border pe-3 btn-h48-s15 ${
                    isRTL ? "rtl" : "ltr"
                  }  ${customButtonClass}`
                : ""
            }
            type="submit"
            onClick={buttonClick}
          >
            <IoIosSearch className="mc-1-clr  fs-5" />
          </button>
        </>
      ) : (
        <>
           <input
            className={
              inputClass === "normal"
                ? `form-control btn-h48-s15   create-btn-clr border search-filter ${isRTL?"rtl":"ltr"}  ${customInputClass}`
                : inputClass === "chat-search"
                ? `form-control btn-h48-s15 border-light-color rounded-5 create-btn-clr border search-filter ${isRTL?"rtl":"ltr"} ${customInputClass} `
                : ""
            }
            type="search"
            placeholder={t(placeholder)}
            aria-label="Search"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
          />
          <button
            className={
              buttonClass === "normal"
                ? `btn bg-white rounded search-filter-btn border  btn-h48-s15   ${isRTL?"pe-0 rtl":"ps-0 ltr"} ${customButtonClass}`
                : buttonClass === "chat-search"
                ? `btn bg-white rounded search-filter-btn border border-light-color  rounded-5 btn-h48-s15  ${isRTL?"pe-0 rtl":"ps-0 ltr"} ${customButtonClass}`
                : ""
            }
            type="submit"
            onClick={buttonClick}
          >
            <IoIosSearch className="mc-1-clr  fs-5" />
          </button>
       
        </>
      )}
    </form>
  );
};

export default Search;
