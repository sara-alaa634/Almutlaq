import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { TbDashboard } from "react-icons/tb";
import { TbUsers } from "react-icons/tb";
import { GoDot } from "react-icons/go";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { TbFileDollar } from "react-icons/tb";
import { TbBrandHipchat } from "react-icons/tb";
import { PiNotification } from "react-icons/pi";
import { TbHotelService } from "react-icons/tb";
import { FiHeadphones } from "react-icons/fi";
import { LuFileCheck2 } from "react-icons/lu";
import { permissionsNames } from "../../helpers/constants";
// import { hasPermission } from "../../helpers/helperFunctions";
import { useHasPermission } from "../../Hooks/usePermissions";

import "../../Assets/Css/Main.css";
import "../../Assets/Css/Layout.css";
const Sidebar = () => {
  // Determine the paths that should be considered active
  const { hasPermission } = useHasPermission();
  const userManagementPaths = [
    "/users/clients",
    "/users/app-users",
    "/users/our-team",
    "/users/create-user",
    "/users/roles",
  ];
  const caseManagementPaths = ["/cases/all-cases", "/cases/create-case"];
  const postsManagementPathes = ["/posts", "/create-post"];
  const officeInformationPathes = [
    "/about-office",
    "/cases/create-categories",
    "/cases/create-subCategory",
  ];

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const location = useLocation();
  // State to control collapse
  const [userManagementCollapsed, setUserManagementCollapsed] = useState(true);
  const [caseManagementCollapsed, setCaseManagmentCollapsed] = useState(true);
  const [postsManagementCollapsed, setPostsManagementCollapsed] =
    useState(true);
  const [
    notificationsManagementCollapsed,
    setNotificationsManagementCollapsed,
  ] = useState(true);
  const [officeInformationCollapsed, setOfficeInformationCollapsed] =
    useState(true);

  // Update collapse states based on the current path
  useEffect(() => {
    const path = location.pathname;
    setUserManagementCollapsed(
      !userManagementPaths.some((p) => path.includes(p))
    );
    setCaseManagmentCollapsed(
      !caseManagementPaths.some((p) => path.includes(p))
    );
    setPostsManagementCollapsed(
      !postsManagementPathes.some((p) => path.includes(p))
    );
    setOfficeInformationCollapsed(
      !officeInformationPathes.some((p) => path.includes(p))
    );
  }, [location.pathname]);

  const toggleUserManagementCollapse = () => {
    setUserManagementCollapsed((prev) => !prev);
  };

  const toggleCaseManagmentCollapse = () => {
    setCaseManagmentCollapsed((prev) => !prev);
  };
  const togglePostsManagementCollapse = () => {
    setPostsManagementCollapsed((prev) => !prev);
  };
  const toggleNotificationsManagementCollapse = () => {
    setNotificationsManagementCollapsed((prev) => !prev);
  };
  const toggleOfficeInformationCollapse = () => {
    setOfficeInformationCollapsed((prev) => !prev);
  };

  // Check if any of the links are active
  // const isAnyUserManagementLinkActive = userManagementPaths.some(path => location.pathname.includes(path));
  const isAnyCaseManagementLinkActive = caseManagementPaths.some((path) =>
    location.pathname.includes(path)
  );
  const isAnyPostsManagemenTLinkActive = postsManagementPathes.some((path) =>
    location.pathname.includes(path)
  );
  const isAnyOfficeInformationLinkActive = officeInformationPathes.some(
    (path) => location.pathname.includes(path)
  );

  return (
    <>
      {/* Button to toggle the sidebar on small screens */}
      <button
        className={`btn toggle-sidebar-btn position-fixed py-1 px-2 d-lg-none ${
          isRTL ? "rtl" : "ltr"
        }`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        <RiMenu2Line className="text-white" />
      </button>

      {/* Offcanvas component for small screens */}
      <div
        className={`offcanvas l-d-bg box-shadow ${
          isRTL ? "offcanvas-end" : "offcanvas-start"
        } d-lg-none h-100`}
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div
          className={`offcanvas-header d-flex ${
            isRTL ? "justify-content-end" : "justify-content-start"
          } `}
        >
          <button
            type="button"
            className="btn-close mx-0"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-3">
          {/* Sidebar content here */}
          <div className="sidebar-header d-flex justify-content-center align-items-center gap-3 mb-4">
            <img className="logo-style" src="/login-logo.svg" alt="" />
            {/* <h4 className="text-capitalize fs-4 fw-bolder mb-0">
              {t("omar_haridy")}
            </h4> */}
          </div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "list-item-link d-flex gap-2 align-items-center mb-4 py-2 px-3 active"
                : "list-item-link d-flex gap-2 align-items-center mb-4 py-2 px-3"
            }
          >
            <TbDashboard className="item-icon" /> {t("Statistics")}
          </NavLink>
          <div className="sidebar-items-list">
            <span className="text-capitalize list-title px-3">
              {t("Application_and_Office_Management")}
            </span>
            {/* main list */}
            <ul className="items-list p-0 m-0 mt-1 mb-1">
              {/* User Management */}
              {(hasPermission(permissionsNames.users.view) ||
                hasPermission(permissionsNames.users.create)) && (
                <li className="list-item">
                  <a
                    className="list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between active"
                    data-bs-toggle="collapse"
                    href="#userManagementCollapse"
                    role="button"
                    aria-expanded={!userManagementCollapsed}
                    aria-controls="userManagementCollapse"
                    onClick={toggleUserManagementCollapse}
                  >
                    <span className="d-flex gap-2 align-items-center">
                      <TbUsers className="item-icon" /> {t("User_management")}{" "}
                    </span>{" "}
                    <span>
                      {userManagementCollapsed ? (
                        isRTL ? (
                          <FaAngleLeft />
                        ) : (
                          <FaAngleRight />
                        )
                      ) : (
                        <FaAngleUp />
                      )}
                    </span>
                  </a>
                  {/* first sub list */}
                  <div className="collapse show" id="userManagementCollapse">
                    <ul className="p-0 m-0">
                      {hasPermission(permissionsNames.users.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={userManagementPaths[0]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("clients")}
                          </NavLink>
                        </li>
                      )}
                      {hasPermission(permissionsNames.users.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={userManagementPaths[1]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("App_users")}
                          </NavLink>
                        </li>
                      )}
                      {hasPermission(permissionsNames.users.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={userManagementPaths[2]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("our_Team")}
                          </NavLink>
                        </li>
                      )}
                      {hasPermission(permissionsNames.users.create) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={userManagementPaths[3]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("Create_a_user")}
                          </NavLink>
                        </li>
                      )}
                      {hasPermission(permissionsNames.role.create) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={userManagementPaths[4]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("create_role")}
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              )}
              {/* Case Management */}
              {(hasPermission(permissionsNames.cases.view) ||
                hasPermission(permissionsNames.cases.create)) && (
                <li className="list-item mt-1">
                  <a
                    className={`list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between ${
                      isAnyCaseManagementLinkActive ? "active" : ""
                    }`}
                    data-bs-toggle="collapse"
                    href="#caseManagementCollapsed"
                    role="button"
                    aria-expanded={!caseManagementCollapsed}
                    aria-controls="caseManagementCollapsed"
                    onClick={toggleCaseManagmentCollapse}
                  >
                    <span className="d-flex gap-2 align-items-center">
                      <TbFileDollar className="item-icon" />{" "}
                      {t("Case_Management")}{" "}
                    </span>{" "}
                    <span>
                      {caseManagementCollapsed ? (
                        isRTL ? (
                          <FaAngleLeft />
                        ) : (
                          <FaAngleRight />
                        )
                      ) : (
                        <FaAngleUp />
                      )}
                    </span>
                  </a>
                  {/* second sub list */}
                  <div className="collapse " id="caseManagementCollapsed">
                    <ul className="p-0 m-0">
                      {hasPermission(permissionsNames.cases.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={caseManagementPaths[0]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("all_cases")}
                          </NavLink>
                        </li>
                      )}
                      {hasPermission(permissionsNames.cases.create) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={caseManagementPaths[1]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("create_case")}
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              )}
              {/* Messages and chats */}

              {/* {(hasPermission(permissionsNames.chat.view) ||
                hasPermission(permissionsNames.chat.create)) && (
                <li className="list-item">
                  <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                      isActive
                        ? "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3 active"
                        : "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3"
                    }
                  >
                    <TbBrandHipchat className="item-icon" />{" "}
                    {t("Messages_and_chats")}
                  </NavLink>
                </li>
              )} */}
              {/* Posts management */}
              {(hasPermission(permissionsNames.posts.view) ||
                hasPermission(permissionsNames.posts.create)) && (
                <li className="list-item  mt-1 ">
                  <a
                    className={`list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between ${
                      isAnyPostsManagemenTLinkActive ? "active" : ""
                    }`}
                    data-bs-toggle="collapse"
                    href="#postsManagementCollapsed"
                    role="button"
                    aria-expanded={!postsManagementCollapsed}
                    aria-controls="postsManagementCollapsed"
                    onClick={togglePostsManagementCollapse}
                  >
                    <span className="d-flex gap-2 align-items-center">
                      <LuFileCheck2 className="item-icon" />{" "}
                      {t("Post_Management")}{" "}
                    </span>{" "}
                    <span>
                      {postsManagementCollapsed ? (
                        isRTL ? (
                          <FaAngleLeft />
                        ) : (
                          <FaAngleRight />
                        )
                      ) : (
                        <FaAngleUp />
                      )}
                    </span>
                  </a>
                  {/* third sub list */}
                  <div className="collapse " id="postsManagementCollapsed">
                    <ul className="p-0 m-0">
                      {hasPermission(permissionsNames.posts.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={postsManagementPathes[0]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("all_posts")}
                          </NavLink>
                        </li>
                      )}
                      {hasPermission(permissionsNames.posts.create) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={postsManagementPathes[1]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("create_post")}
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              )}
              {/*mails notifications management */}

              {(hasPermission(permissionsNames.notifications.view) ||
                hasPermission(permissionsNames.notifications.create)) && (
                <li className="list-item">
                  <NavLink
                    to="/notifications"
                    className={({ isActive }) =>
                      isActive
                        ? "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3 active"
                        : "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3"
                    }
                  >
                    <TbBrandHipchat className="item-icon" />{" "}
                    {t("Notifications")}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="sidebar-items-list">
            <span className="text-capitalize list-title px-3 d-inline-block mt-4 mb-1">
              {t("Mobile_App_Content_Management")}
            </span>
            {/* second main list */}
            <ul className="items-list p-0 m-0 mt-1">
              {/* Office information */}
              {(hasPermission(permissionsNames.office.view) ||
                hasPermission(permissionsNames.office.create)) && (
                <li className="list-item">
                  <a
                    className={`list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between ${
                      isAnyOfficeInformationLinkActive ? "active" : ""
                    }`}
                    data-bs-toggle="collapse"
                    href="#officeInformationCollapsed"
                    role="button"
                    aria-expanded={!officeInformationCollapsed}
                    aria-controls="officeInformationCollapsed"
                    onClick={toggleOfficeInformationCollapse}
                  >
                    <span className="d-flex gap-2 align-items-center">
                      <TbHotelService className="item-icon" />{" "}
                      {t("Office_information")}{" "}
                    </span>{" "}
                    <span>
                      {officeInformationCollapsed ? (
                        isRTL ? (
                          <FaAngleLeft />
                        ) : (
                          <FaAngleRight />
                        )
                      ) : (
                        <FaAngleUp />
                      )}
                    </span>
                  </a>
                  {/* fifth sub list */}
                  <div className="collapse " id="officeInformationCollapsed">
                    <ul className="p-0 m-0">
                      {/* {hasPermission(permissionsNames.office.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={officeInformationPathes[0]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("about_office")}
                          </NavLink>
                        </li>
                      )} */}
                      {hasPermission(permissionsNames.office.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={officeInformationPathes[1]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("main_type_of_cases")}
                          </NavLink>
                        </li>
                      )}
                      {hasPermission(permissionsNames.office.view) && (
                        <li className="sub-list-item">
                          <NavLink
                            to={officeInformationPathes[2]}
                            className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                          >
                            <GoDot />
                            {t("sub_type_of_cases")}
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
              )}
              {/* support information */}
              {(hasPermission(permissionsNames.users.view) ||
                hasPermission(permissionsNames.users.create)) && (
                <li className="list-item">
                  <span className="text-capitalize list-title px-3 d-inline-block mt-4 mb-1">
                    {t("support")}
                  </span>
                  <NavLink
                    to="/support-team"
                    className={({ isActive }) =>
                      isActive
                        ? "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3 active"
                        : "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3"
                    }
                  >
                    <FiHeadphones className="item-icon" />{" "}
                    {t("Technical_support_requests")}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* //////////////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////////////// */}

      {/* Sidebar content for large screens */}
      <div className="l-d-bg h-100 d-none d-lg-block sidebar box-shadow p-3">
        <div className="sidebar-header d-flex justify-content-center align-items-center gap-3 mb-4">
          <img className="logo-style" src="/login-logo.svg" alt="" />
          {/* <h4 className="text-capitalize fs-4 fw-bolder mb-0">
            {t("omar_haridy")}
          </h4> */}
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "list-item-link d-flex gap-2 align-items-center mb-4 py-2 px-3 active"
              : "list-item-link d-flex gap-2 align-items-center mb-4 py-2 px-3"
          }
        >
          <TbDashboard className="item-icon" /> {t("Statistics")}
        </NavLink>
        <div className="sidebar-items-list">
          <span className="text-capitalize list-title px-3">
            {t("Application_and_Office_Management")}
          </span>
          {/* main list */}
          <ul className="items-list p-0 m-0 mt-1 mb-1">
            {/* User Management */}
            {(hasPermission(permissionsNames.users.view) ||
              hasPermission(permissionsNames.users.create)) && (
              <li className="list-item">
                <a
                  className="list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between active"
                  data-bs-toggle="collapse"
                  href="#userManagementCollapse"
                  role="button"
                  aria-expanded={!userManagementCollapsed}
                  aria-controls="userManagementCollapse"
                  onClick={toggleUserManagementCollapse}
                >
                  <span className="d-flex gap-2 align-items-center">
                    <TbUsers className="item-icon" /> {t("User_management")}{" "}
                  </span>{" "}
                  <span>
                    {userManagementCollapsed ? (
                      isRTL ? (
                        <FaAngleLeft />
                      ) : (
                        <FaAngleRight />
                      )
                    ) : (
                      <FaAngleUp />
                    )}
                  </span>
                </a>
                {/* first sub list */}
                <div className="collapse show" id="userManagementCollapse">
                  <ul className="p-0 m-0">
                    {hasPermission(permissionsNames.users.view) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={userManagementPaths[0]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("clients")}
                        </NavLink>
                      </li>
                    )}
                    {hasPermission(permissionsNames.users.view) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={userManagementPaths[1]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("App_users")}
                        </NavLink>
                      </li>
                    )}
                    {hasPermission(permissionsNames.users.view) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={userManagementPaths[2]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("our_Team")}
                        </NavLink>
                      </li>
                    )}
                    {hasPermission(permissionsNames.users.create) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={userManagementPaths[3]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("Create_a_user")}
                        </NavLink>
                      </li>
                    )}

                    {hasPermission(permissionsNames.role.create) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={userManagementPaths[4]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("create_role")}
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )}
            {/* Case Management */}
            {(hasPermission(permissionsNames.cases.view) ||
              hasPermission(permissionsNames.cases.create)) && (
              <li className="list-item mt-1">
                <a
                  className={`list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between ${
                    isAnyCaseManagementLinkActive ? "active" : ""
                  }`}
                  data-bs-toggle="collapse"
                  href="#caseManagementCollapsed"
                  role="button"
                  aria-expanded={!caseManagementCollapsed}
                  aria-controls="caseManagementCollapsed"
                  onClick={toggleCaseManagmentCollapse}
                >
                  <span className="d-flex gap-2 align-items-center">
                    <TbFileDollar className="item-icon" />{" "}
                    {t("Case_Management")}{" "}
                  </span>{" "}
                  <span>
                    {caseManagementCollapsed ? (
                      isRTL ? (
                        <FaAngleLeft />
                      ) : (
                        <FaAngleRight />
                      )
                    ) : (
                      <FaAngleUp />
                    )}
                  </span>
                </a>
                {/* second sub list */}
                <div className="collapse " id="caseManagementCollapsed">
                  <ul className="p-0 m-0">
                    {hasPermission(permissionsNames.cases.view) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={caseManagementPaths[0]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("all_cases")}
                        </NavLink>
                      </li>
                    )}
                    {hasPermission(permissionsNames.cases.create) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={caseManagementPaths[1]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("create_case")}
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )}
            {/* Messages and chats */}
            {/* {(hasPermission(permissionsNames.chat.view) ||
              hasPermission(permissionsNames.chat.create)) && (
              <li className="list-item">
                <NavLink
                  to="/chat"
                  className={({ isActive }) =>
                    isActive
                      ? "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3 active"
                      : "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3"
                  }
                >
                  <TbBrandHipchat className="item-icon" />{" "}
                  {t("Messages_and_chats")}
                </NavLink>
              </li>
            )} */}
            {/* Posts management */}
            {(hasPermission(permissionsNames.posts.view) ||
              hasPermission(permissionsNames.posts.create)) && (
              <li className="list-item  mt-1 ">
                <a
                  className={`list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between ${
                    isAnyPostsManagemenTLinkActive ? "active" : ""
                  }`}
                  data-bs-toggle="collapse"
                  href="#postsManagementCollapsed"
                  role="button"
                  aria-expanded={!postsManagementCollapsed}
                  aria-controls="postsManagementCollapsed"
                  onClick={togglePostsManagementCollapse}
                >
                  <span className="d-flex gap-2 align-items-center">
                    <LuFileCheck2 className="item-icon" />{" "}
                    {t("Post_Management")}{" "}
                  </span>{" "}
                  <span>
                    {postsManagementCollapsed ? (
                      isRTL ? (
                        <FaAngleLeft />
                      ) : (
                        <FaAngleRight />
                      )
                    ) : (
                      <FaAngleUp />
                    )}
                  </span>
                </a>
                {/* third sub list */}
                <div className="collapse " id="postsManagementCollapsed">
                  <ul className="p-0 m-0">
                    {hasPermission(permissionsNames.posts.view) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={postsManagementPathes[0]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("all_posts")}
                        </NavLink>
                      </li>
                    )}

                    {hasPermission(permissionsNames.posts.create) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={postsManagementPathes[1]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("create_post")}
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )}

            {/* mails notifications management */}

            {(hasPermission(permissionsNames.notifications.view) ||
              hasPermission(permissionsNames.notifications.create)) && (
              <li className="list-item">
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    isActive
                      ? "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3 active"
                      : "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3"
                  }
                >
                  <PiNotification className="item-icon" /> {t("Notifications")}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="sidebar-items-list">
          {(hasPermission(permissionsNames.office.view) ||
            hasPermission(permissionsNames.office.create)) && (
            <span className="text-capitalize list-title px-3 d-inline-block mt-4 mb-1">
              {t("Mobile_App_Content_Management")}
            </span>
          )}

          {/* second main list */}
          <ul className="items-list p-0 m-0 mt-1">
            {/* Office information */}
            {(hasPermission(permissionsNames.office.view) ||
              hasPermission(permissionsNames.office.create)) && (
              <li className="list-item">
                <a
                  className={`list-item-link text-capitalize py-2 px-3 d-flex align-items-center justify-content-between ${
                    isAnyOfficeInformationLinkActive ? "active" : ""
                  }`}
                  data-bs-toggle="collapse"
                  href="#officeInformationCollapsed"
                  role="button"
                  aria-expanded={!officeInformationCollapsed}
                  aria-controls="officeInformationCollapsed"
                  onClick={toggleOfficeInformationCollapse}
                >
                  <span className="d-flex gap-2 align-items-center">
                    <TbHotelService className="item-icon" />{" "}
                    {t("Office_information")}{" "}
                  </span>{" "}
                  <span>
                    {officeInformationCollapsed ? (
                      isRTL ? (
                        <FaAngleLeft />
                      ) : (
                        <FaAngleRight />
                      )
                    ) : (
                      <FaAngleUp />
                    )}
                  </span>
                </a>
                {/* fifth sub list */}
                <div className="collapse " id="officeInformationCollapsed">
                  <ul className="p-0 m-0">
                    {/* {(hasPermission(permissionsNames.office.view) ||
                      hasPermission(permissionsNames.office.create)) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={officeInformationPathes[0]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("about_office")}
                        </NavLink>
                      </li>
                    )} */}
                    {(hasPermission(permissionsNames.office.view) ||
                      hasPermission(permissionsNames.office.create)) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={officeInformationPathes[1]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("main_type_of_cases")}
                        </NavLink>
                      </li>
                    )}
                    {(hasPermission(permissionsNames.office.view) ||
                      hasPermission(permissionsNames.office.create)) && (
                      <li className="sub-list-item">
                        <NavLink
                          to={officeInformationPathes[2]}
                          className="sub-list-link text-capitalize d-flex gap-2 align-items-center py-2 px-4"
                        >
                          <GoDot />
                          {t("sub_type_of_cases")}
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            )}
            {/* support  */}

            {(hasPermission(permissionsNames.users.view) ||
              hasPermission(permissionsNames.users.create)) && (
              <li className="list-item">
                <NavLink
                  to="/support-team"
                  className={({ isActive }) =>
                    isActive
                      ? "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3 active"
                      : "list-item-link d-flex gap-2 align-items-center mt-1 py-2 px-3"
                  }
                >
                  <FiHeadphones className="item-icon" />{" "}
                  {t("Technical_support_requests")}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
