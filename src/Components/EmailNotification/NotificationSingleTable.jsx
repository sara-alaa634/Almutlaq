import { useNavigate } from "react-router-dom";
import "../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { TbSettings } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { TbEyeCheck } from "react-icons/tb";
import { handleTableColumnDateFormat } from "../../helpers/formatDate";
import { defaultAlert } from "../../helpers/Alert";
import { alertMessages } from "../../helpers/messages";
import { PulseLoader } from "react-spinners";
const NotificationSingleTable = ({
  paginationData = [],
  setPaginationData,
  removeNotification,
  loading,
  hasEditPermission,
  hasDeletePermission,
  hasViewPermission,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const handleDelete = async (id) => {
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmTextNotification),
      t(alertMessages.confirmButton),
      t(alertMessages.cancelButton),
      "warning"
    );

    if (result) {
      await removeNotification(id);
      setPaginationData((prev) =>
        prev.filter((Notification) => Notification.id !== id)
      );
    }
  };

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/notification-update/${id}`);
  };

  const handleView = (event, id) => {
    event.stopPropagation();
    navigate(`/notification/${id}`);
  };

  return (
    <table className="table  table-border">
      <thead>
        <tr>
          <th scope="col " className="text-center">
          <span className={`${isRTL?"me-2":"ms-2"} d-inline-block create-btn-clr`}>
          {t("Messenger data")}
            </span>
          </th>
          <th scope="col" className="text-center">
            {t("Recipient's data")}
          </th>
          <th scope="col" className="text-center">
            {t("Date of submission")}
          </th>
          <th scope="col" className="text-center">
            {t("Notification details")}
          </th>
          <th scope="col" className="text-center">
          <span className={` ${isRTL?"ms-4":"me-4"} d-inline-block fs-5`}>
          <TbSettings className="fs-4" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6">
              <div className="d-flex align-items-center justify-content-center gap-1">
                <PulseLoader
                  color="var(--mc-1)"
                  loading={loading}
                  size={7}
                  speedMultiplier={0.5} // Decrease this value to slow down the loader
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <span className="d-inline-block me-4">{t("searching")}</span>
              </div>
            </td>
          </tr>
        ) : paginationData && paginationData?.length > 0 ? (
          paginationData.map((Notification, index) => (
            <tr key={index}>
              <td className="mw-170px maxW-200px pe-3 text-center">
                <img
                  className={`client-table-user-img  ${
                    isRTL ? "ms-2" : "me-2"
                  }`}
                  src={
                    Notification?.sender?.image !== null
                      ? Notification.sender.image
                      : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                  }
                  alt=""
                />
                <span>{Notification.sender.name}</span>
              </td>
              <td className="mw-150px text-center">
                {Notification?.recipients?.length === 1 ? (
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <img
                      className={`client-table-user-img  ${
                        isRTL ? "ms-2" : "me-2"
                      }`}
                      src={
                        Notification?.recipients[0]?.image !== null
                          ? Notification.recipients[0]?.image
                          : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                      }
                      alt=""
                    />
                    <span>{Notification?.recipients[0]?.name}</span>
                  </div>
                ) : Notification?.recipients?.length > 1 ? (
                  <div className="d-flex align-items-center justify-content-center">
                    {Notification.recipients
                      .slice(0, 6)
                      .map((recipient, index) => (
                        <img
                          key={index}
                          className="postLikesImgs"
                          src={
                            recipient?.image !== null
                              ? recipient.image
                              : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                          }
                          alt=""
                        />
                      ))}
                    {Notification.recipients.length > 10 && (
                      <span className="more-placeholder">...</span>
                    )}
                  </div>
                ) : null}
              </td>
              <td className="mw-120px text-center">
                {handleTableColumnDateFormat(Notification.created_at)}
              </td>
              <td className="mw-150px text-center">
                <div className="fw-semibold mc-1-clr">
                  {Notification?.notification_title}
                </div>
                <div className="fw-medium mc-1-clr">
                  {Notification?.notification_body?.length > 20
                    ? Notification.notification_body.slice(0, 20) + "..."
                    : Notification.notification_body}
                </div>
              </td>
              <td className="text-center text-center">
                <span
                  className={` ${
                    isRTL ? "ms-2" : "me-2"
                  } d-flex flex-column align-items-end justify-content-end`}
                >
                  <span className="d-flex justify-content-between align-items-center">
                    {hasDeletePermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(Notification.id);
                        }}
                      >
                        <TbTrash
                          className={`fs-4 mb-2 text-color ${
                            isRTL ? "ms-3" : "me-3"
                          }`}
                        />
                      </a>
                    ) : null}
                    {hasEditPermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          handleEdit(e, Notification.id);
                        }}
                      >
                        <TbEdit className="fs-4  mb-2 text-color" />
                      </a>
                    ) : null}
                  </span>
                  <span className="d-flex justify-content-between align-items-center">
                    {hasViewPermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          handleView(e, Notification.id);
                        }}
                      >
                        <TbEyeCheck
                          className={`fs-4 mb-2 text-color ${
                            isRTL ? "ms-3" : "me-3"
                          }`}
                        />
                      </a>
                    ) : null}
                  </span>
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              {t("no_data_available")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NotificationSingleTable;
