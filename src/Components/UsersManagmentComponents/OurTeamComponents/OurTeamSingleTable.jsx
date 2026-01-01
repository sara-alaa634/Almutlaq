import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { TbSettings } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { TbEyeCheck } from "react-icons/tb";
import { HiOutlineChat } from "react-icons/hi";
import { PulseLoader } from "react-spinners";
import { handleTableColumnDateFormat } from "../../../helpers/formatDate";
import { defaultAlert } from "../../../helpers/Alert";
import { alertMessages } from "../../../helpers/messages";

const OurTeamSingleTable = ({
  paginationData,
  setPaginationData,
  hasViewChatPermission,
  hasEditPermission,
  hasDeletePermission,
  hasViewPermission,
  onDelete,
  currentPage,
  onChange,
  loading,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    //   console.log("user id:  ",id)
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmTextUser),
      t(alertMessages.confirmButton),
      t(alertMessages.cancelButton),
      "warning"
    );

    if (result) {
      await onDelete(id);
      setPaginationData((prev) => prev.filter((user) => user.id !== id));
      if (paginationData.length === 1 || paginationData.length === 0) {
        onChange(currentPage - 1);
      }
    }
  };

  const handleView = (event, id) => {
    event.stopPropagation();
    navigate(`/users/${id}`);
  };

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/users/update-user/${id}`);
  };
  const handleChat = (event, id) => {
    event.stopPropagation();
    navigate(`/chat/${id}`);
  };

  return (
    <table className="table  table-border">
      <thead>
        <tr>
          <th scope="col ">
          <span className={`${isRTL?"me-2":"ms-2"} d-inline-block create-btn-clr`}>
          {t("User_Data")}
            </span>
          </th>
          <th scope="col">{t("Start_date")}</th>
          <th scope="col">{t("state")}</th>
          <th scope="col" className={isRTL ? "text-start" : "text-end"}>
            <span className={` ${isRTL ? "ms-4" : "me-4"} d-inline-block fs-5`}>
              <TbSettings className="fs-4" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="4">
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
        ) : paginationData && paginationData.length > 0 ? (
          paginationData.map((user, index) => (
            <tr key={index}>
              <td className=" mw-170px maxW-200px">
                <img
                  className="client-table-user-img mx-2"
                  src={
                    user.image
                      ? user.image
                      : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                  }
                  alt=""
                />{" "}
                <span>{user.name}</span>
              </td>
              <td className="mw-120px">
                {handleTableColumnDateFormat(user.created_at)}{" "}
              </td>
              <td className="mw-100px">
                <span
                  className={
                    user.is_online
                      ? "active-case px-3 py-1 fs-13 fw-semibold"
                      : "inactive-case px-3 py-1 fs-13 fw-semibold"
                  }
                >
                  {" "}
                  {user.is_online ? t("active") : t("inactive")}{" "}
                </span>
              </td>
              <td className="text-end">
                <span
                  className={` ${
                    isRTL ? "ms-2" : "me-2"
                  } d-flex flex-column align-items-end justify-content-end`}
                >
                  <span className="d-flex justify-content-between align-items-center">
                    {hasDeletePermission ? (
                      <a className="text-end">
                        <TbTrash
                          className={`fs-4 mb-2 text-color ${
                            isRTL ? "ms-3" : "me-3"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(user.id);
                          }}
                        />
                      </a>
                    ) : null}

                    {hasEditPermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          handleEdit(e, user.id);
                        }}
                      >
                        <TbEdit
                          className={`fs-4  mb-2 text-color ${
                            !hasDeletePermission
                              ? isRTL
                                ? "ms-3"
                                : "me-3"
                              : ""
                          }`}
                        />
                      </a>
                    ) : null}
                  </span>
                  <span className="d-flex justify-content-center align-items-center">
                    {hasViewChatPermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          handleChat(e, user.id);
                        }}
                      >
                        <HiOutlineChat
                          className={`fs-4 mb-2 text-color ${
                            isRTL ? "ms-3" : "me-3"
                          }`}
                        />
                      </a>
                    ) : null}
                    {hasViewPermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          handleView(e, user.id);
                        }}
                      >
                        <TbEyeCheck
                          className={`fs-4  mb-2 text-color ${
                            !hasDeletePermission
                              ? isRTL
                                ? "ms-3"
                                : "me-3"
                              : ""
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
            <td colSpan="4">
              <div className="d-flex align-items-center justify-content-center gap-1">
                {t("no_data_available")}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OurTeamSingleTable;
