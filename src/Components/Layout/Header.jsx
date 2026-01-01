import React, { useEffect, useState } from "react";
import "../../Assets/Css/Layout.css";
import { IoIosSearch } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import WorldFlag from "react-world-flags";
import { useLogin } from "../../Hooks/useAuth";
import LogoLoader from "../../helpers/loader";
import { useUser } from "../../Context/userContext";
import { FiUserCheck } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import NotificationDropdown from "./NotificationDropdown";
const Header = () => {
  const { t, i18n } = useTranslation();
  const { logout, loading } = useLogin();
  const { userData } = useUser();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    // Update body class based on selected language
    if (lng === "ar") {
      document.body.classList.add("arabic");
      document.body.classList.remove("english");
    } else {
      document.body.classList.add("english");
      document.body.classList.remove("arabic");
    }
  };
  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.classList.add("arabic");
    } else {
      document.body.classList.add("english");
    }
  }, [i18n.language]);
  const isRTL = i18n.language === "ar";
  const currentFlag = i18n.language === "ar" ? "EG" : "US";

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-transparent mt-md-4 mt-2"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {loading && <LogoLoader loading={loading} />}
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mt-lg-0 mt-4  align-items-start"
          id="navbarSupportedContent"
        >
          <form className="d-flex" role="search">
            {/* <div className="d-flex w-100"> */}
            <input
              className={`form-control  flex-grow-1 navbar-search  ${
                isRTL ? "rtl" : "ltr"
              } `}
              type="search"
              placeholder={t("search")}
              aria-label="Search"
            />
            <button
              className={`btn bg-white rounded-0 navbar-search-btn ${
                isRTL ? "rtl" : "ltr"
              }`}
              type="submit"
            >
              <IoIosSearch />
            </button>
            {/* </div> */}
          </form>
          <ul
            className={`navbar-nav ${
              isRTL ? "me-auto" : "ms-auto"
            } mb-2 mb-lg-0 mt-lg-0 mt-2`}
          >
            <li
              className={`nav-item dropdown mb-5 rounded ${
                isRTL ? "ms-lg-4 ms-0 " : "me-lg-4 me-0 "
              }`}
            >
              <a
                className="custom-nav-link nav-link dropdown-toggle d-flex justify-content-center align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-flex justify-content-center align-items-center">
                  {" "}
                  <WorldFlag code={currentFlag} />
                </span>
                <span className={`d-lg-none d-flex justify-content-start align-items-center w-100 fs-6 text-capitalize ${isRTL?"me-2":"ms-2"}`}>
                  {t("language")}
                </span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className={`dropdown-item ${
                      isRTL ? "text-end" : "text-start"
                    }`}
                    href="#"
                    onClick={() => changeLanguage("en")}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <WorldFlag
                      code="US"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                      className={isRTL ? "ms-2" : "me-2"}
                    />
                    English
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${
                      isRTL ? "text-end" : "text-start"
                    }`}
                    href="#"
                    onClick={() => changeLanguage("ar")}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <WorldFlag
                      code="EG"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                      className={isRTL ? "ms-2" : "me-2"}
                    />
                    Arabic
                  </a>
                </li>
              </ul>
            </li>
            <NotificationDropdown />
            <li className="nav-item dropdown rounded mb-5">
              <a
                className="custom-nav-link nav-link dropdown-toggle p-lg-2 px-lg-3 d-flex justify-content-center align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-flex justify-content-center align-items-center ">
                  <FaRegCircleUser />
                </span>
                <span className={`d-lg-none d-flex justify-content-start align-items-center w-100 fs-6 text-capitalize ${isRTL?"me-2":"ms-2"}`}>
                  {t("user_profile")}
                </span>
              </a>
              <ul className={`custom dropdown-menu ${isRTL ? "rtl" : ""}`} dir={isRTL ? "rtl" : ""}>
                <li>
                  <a className="dropdown-item cusrsor-pointer" href="#" >
                    <div className="w-100 d-flex align-items-center justify-content-start gap-3">
                      <img
                        src={
                          userData && userData.image && userData.image !== null
                            ? userData.image
                            : process.env.PUBLIC_URL +
                              "/Assets/Images/human-placeholder-square.jpg"
                        }
                        className="navbar-user-image"
                        alt=""
                      />
                      <div>
                        <div className="user-name">
                          {userData && userData.name ? userData.name : "admin"}
                        </div>
                        <div className="user-position">{t("responsible")}</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-item d-flex align-items-center text-capitalize cusrsor-pointer">
                  <a
                    className={`custom dropdown-item cusrsor-pointer ${isRTL ? "text-end" : "text-start"}`}
                    href="/user-profile"
                  >
                    <FiUserCheck className={`mc-1-clr fs-5 ${isRTL ? "ms-2" : "me-2"}`} />{" "}
                    {t("my_info")}
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  className="dropdown-item text-capitalize d-flex align-items-center cusrsor-pointer"
                  onClick={handleLogout}
                >
                  <a className={`custom dropdown-item cusrsor-pointer ${isRTL ? "text-end" : "text-start"}`} href="#">
                    <IoLogOutOutline className={`mc-1-clr  fs-5 ${isRTL ? "ms-2" : "me-2"}`} />{" "}
                    {t("logout")}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
