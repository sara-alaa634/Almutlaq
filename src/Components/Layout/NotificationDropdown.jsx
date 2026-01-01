import React, { useEffect, useState } from "react";
import "../../Assets/Css/Layout.css";
import { useGeneral } from "../../Hooks/useGeneral";
import { formatTimeAgo } from "../../helpers/formatDate";
import { useTranslation } from "react-i18next";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbPhoto } from "react-icons/tb";
import { FaMicrophone } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { fetchNotificationMessages, changeNotificationToSeen, loading } =
    useGeneral();
  const [notificationData, setNotificationData] = useState([]);
  const [unReadCount, setUnReadCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications(1);
  }, []);

  const fetchNotifications = async (pageNumber) => {
    const response = await fetchNotificationMessages({ page: pageNumber });
    if (response?.notifications?.data) {
      setNotificationData((prevData) =>
        pageNumber === 1
          ? response.notifications.data
          : [...prevData, ...response.notifications.data]
      );
      setUnReadCount(response.unread_count);
      // Check if we have more pages
      setHasMorePages(
        response.notifications.current_page < response.notifications.last_page
      );
      setCurrentPage(response.notifications.current_page);
    }
  };

  const handleGetNextPage = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (loading || !hasMorePages) return;

    const nextPage = currentPage + 1;
    await fetchNotifications(nextPage);
  };

  const handleRedirectMessage = async (event, item) => {
    event.stopPropagation();
    await changeNotificationToSeen(item.id);
    if (item.type.toString() === "support_team") {
      navigate(`/support-team`);
    } else if (
      item.type.toString() === "post" ||
      item.type.toString() === "comment" ||
      item.type.toString() === "reply"
    ) {
      navigate(`/posts`);
    } else if (item.type.toString() === "user") {
      navigate(`/users/${item.data.user_id}`);
    } else if (item.type.toString() === "chat") {
      navigate(`/chat/${item.data.user_id}`);
    } else {
      navigate(`/support-team`);
    }
  };
  return (
    <li
      className={`nav-item dropdown ${
        isRTL ? "ms-lg-4 ms-0" : "me-lg-4 me-0"
      }  mb-5 rounded`}
    >
      <a
        className="custom-nav-link nav-link dropdown-toggle d-flex p-lg-2 px-lg-3 justify-content-center align-items-center"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="position-relative d-flex justify-content-center align-items-center w-100">
          <span className="d-flex justify-content-center align-items-center">
            <IoNotificationsOutline />
          </span>
          <span className={`d-lg-none d-flex justify-content-start align-items-center w-100 fs-6 text-capitalize ${isRTL?"me-2":"ms-2"}`}>
          {" "}
            {t("Notifications")}
          </span>
          {unReadCount ? (
            <span className="badge bg-danger rounded-pill d-lg-flex d-none justify-content-center ms-2 align-items-center">
              {unReadCount}
            </span>
          ) : null}
        </div>
      </a>
      <ul
        className={`dropdown-menu notification-dropdown custom-scroll ${
          isRTL ? "rtl" : ""
        } `}
      >
        <li className="pt-2 pb-1">
          <a className="dropdown-item cusrsor-pointer " href="/support-team">
            <div className="d-flex align-items-center justify-content-between gap-2">
              <div className="fw-semibold  fs-5 ">{t("Notifications")}</div>
              <div className="position-relative d-flex justify-content-center align-items-center">
                <span className="d-flex justify-content-center align-items-center">
                  <IoNotificationsOutline className="fs-4" />
                </span>
                {unReadCount ? (
                  <span className="badge bg-danger rounded-pill d-lg-flex d-none justify-content-center ms-2 align-items-center">
                    {unReadCount}
                  </span>
                ) : null}
              </div>
            </div>
          </a>
        </li>

        {notificationData && notificationData.length > 0 ? (
          notificationData.map((item, index) => (
            <li key={index}>
              <div className="my-3">
                <hr className="dropdown-divider" />
              </div>
              <a
                className="dropdown-item cusrsor-pointer"
                onClick={(e) => {
                  handleRedirectMessage(e, item);
                }}
              >
                <div className="w-100 d-flex align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <img
                      src={
                        item?.sender?.image !== null
                          ? item.sender.image
                          : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                      }
                      className="navbar-user-image"
                      alt=""
                    />
                    <div>
                      <div className={`user-name mb-0 ${isRTL?"text-end":"text-start"}`}>{item.sender.name}</div>
                      <div className={`user-position ${isRTL?"text-end":"text-start"}`}>
                        {item.type.toString() === "support_team" ? (
                          item.notification_title
                        ) : item.type.toString() === "admin_notification" ? (
                          item.notification_body
                        ) : item.type.toString() === "post" ||
                          item.type.toString() === "comment" ||
                          item.type.toString() === "reply" ||
                          item.type.toString() === "user" ? (
                          t(item.notification_body)
                        ) : item.type.toString() === "chat" ? (
                          item.notification_body === "image" ? (
                            <div className="d-flex align-items-center">
                              <TbPhoto className="me-1" /> {t("image")}
                            </div>
                          ) : item.notification_body === "audio" ? (
                            <div className="d-flex align-items-center">
                              <FaMicrophone className="me-1" />{" "}
                              {t("Voice Note")}
                            </div>
                          ) : item.notification_body === "file" ? (
                            <div className="d-flex align-items-center">
                              <FaRegFileAlt className="me-1" /> {t("file")}
                            </div>
                          ) : item.notification_body.length > 30 ? (
                            item.notification_body.slice(0, 30) + "..."
                          ) : (
                            item.notification_body
                          )
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={`user-position  ${isRTL?"text-end":"text-start"}`}>
                        {formatTimeAgo(item.created_at)}
                      </div>
                    </div>
                  </div>
                  {!item.is_read ? (
                    <div className="notification-seen"></div>
                  ) : null}
                </div>
              </a>
            </li>
          ))
        ) : (
          <li>
            <a className="dropdown-item cusrsor-pointer" href="#">
              {t("no_notifications_found")}
            </a>
          </li>
        )}
        {notificationData && notificationData.length > 0 && hasMorePages && (
          <li>
            <div className="my-3">
              <hr className="dropdown-divider" />
            </div>
            <button
              className="dropdown-item cusrsor-pointer sc-1-clr fs-6 text-center mb-2 fw-semibold bg-transparent border-0"
              onClick={handleGetNextPage}
              disabled={loading || !hasMorePages}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center gap-1">
                  <PulseLoader
                    color="var(--sc-1)"
                    loading={loading}
                    size={7}
                    speedMultiplier={0.5} // Decrease this value to slow down the loader
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="d-inline-block me-4 sc-1-clr">
                    {t("loading...")}{" "}
                  </span>
                </div>
              ) : (
                t("see multiple notifications")
              )}
            </button>
          </li>
        )}
      </ul>
    </li>
  );
};

export default NotificationDropdown;
