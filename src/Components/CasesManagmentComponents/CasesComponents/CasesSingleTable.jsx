import { useNavigate } from "react-router-dom";
import "../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { TbSettings } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { LuToggleRight } from "react-icons/lu";
import { LuToggleLeft } from "react-icons/lu";
import { TbEyeCheck } from "react-icons/tb";
import { handleTableColumnDateFormat } from "../../../helpers/formatDate";
import { defaultAlert } from "../../../helpers/Alert";
import { alertMessages } from "../../../helpers/messages";
import { PulseLoader } from "react-spinners";
const CasesSingleTable = ({
  paginationData,
  setPaginationData,
  editCaseState,
  removeCase,
  hasViewPermission,
  hasDeletePermission,
  hasEditPermission,
  loading,
  currentPage,
  onChange,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleDelete = async (id) => {
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmTextCase),
      t(alertMessages.confirmButton),
      t(alertMessages.cancelButton),
      "warning"
    );

    if (result) {
      await removeCase(id);
      setPaginationData((prev) =>
        prev.filter((singleCase) => singleCase.id !== id)
      );
      if (paginationData.length === 1 || paginationData.length === 0) {
        onChange(currentPage - 1);
      }
    }
  };

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/cases/case-update/${id}`);
  };

  const handleSwitch = async (event, updatedCase) => {
    event.stopPropagation();
    const newState = updatedCase.status === 1 ? 0 : 1;
    await editCaseState(updatedCase.id, newState);
    setPaginationData((prev) =>
      prev.map((singleCase) =>
        singleCase.id === updatedCase.id
          ? {
              ...singleCase,
              status: newState,
            }
          : singleCase
      )
    );
  };

  const handleView = (event, id) => {
    event.stopPropagation();
    navigate(`/cases/case-view/${id}`);
  };
  return (
    <table className="table  table-border">
      <thead>
        <tr>
          <th scope="col ">
            <span
              className={`${
                isRTL ? "me-2" : "ms-2"
              } d-inline-block create-btn-clr`}
            >
              {t("case_info")}
            </span>
          </th>
          <th scope="col">{t("Start_date")}</th>
          <th scope="col">{t("case_status")}</th>
          <th scope="col">{t("the_client")}</th>
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
            <td colSpan="5">
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
          paginationData.map((singleCase, index) => (
            <tr key={index}>
              <td className="mw-170px maxW-200px pe-3">
                <div className="text-capitalize fs-5 fw-medium mb-2 mc-1-clr">
                  {singleCase.title}
                </div>{" "}
                <div className="text-capitalize fs-7  text-color">
                  {singleCase.description?.length > 60
                    ? singleCase.description.substring(0, 60) + "..."
                    : singleCase.description}
                </div>{" "}
              </td>
              <td className="mw-120px">
                {handleTableColumnDateFormat(singleCase.created_at)}
              </td>
              <td className="mw-150px">
                <span
                  className={
                    singleCase.case_type === "1"
                      ? "ongoing-case px-3 py-1 fs-13 fw-semibold"
                      : "ended-case px-3 py-1 fs-13 fw-semibold"
                  }
                >
                  {singleCase.case_type === "1" ? t("ongoing") : t("ended")}
                </span>
              </td>
              <td className="mw-150px">
                {singleCase.client ? (
                  <>
                    <img
                      className={`client-table-user-img  ${
                        isRTL ? "ms-2" : "me-2"
                      }`}
                      src={
                        singleCase.client.image !== null
                          ? singleCase.client.image
                          : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                      }
                      alt={singleCase.client.name}
                    />
                    <span>{singleCase.client.name}</span>
                  </>
                ) : null}
              </td>
              <td className="mw-120px">
                <span
                  className={
                    singleCase.status
                      ? "active-case px-3 py-1 fs-13 fw-semibold"
                      : "inactive-case px-3 py-1 fs-13 fw-semibold"
                  }
                >
                  {" "}
                  {singleCase.status ? t("active") : t("inactive")}{" "}
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
                      <a
                        className="text-end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(singleCase.id);
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
                          handleEdit(e, singleCase.id);
                        }}
                      >
                        <TbEdit
                          className={`fs-4 mb-2 text-color ${
                            !hasDeletePermission ? "me-3" : ""
                          }`}
                        />
                      </a>
                    ) : null}
                  </span>
                  <span className="d-flex justify-content-between align-items-center">
                    {hasEditPermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          handleSwitch(e, singleCase);
                        }}
                      >
                        {singleCase.status ? (
                          <LuToggleLeft
                            className={`fs-4 mb-2 text-color ${
                              isRTL ? "ms-3" : "me-3"
                            }`}
                          />
                        ) : (
                          <LuToggleRight
                            className={`fs-4 mb-2 text-color ${
                              isRTL ? "ms-3" : "me-3"
                            }`}
                          />
                        )}
                      </a>
                    ) : null}
                    {hasViewPermission ? (
                      <a
                        className="text-end"
                        onClick={(e) => {
                          handleView(e, singleCase.id);
                        }}
                      >
                        <TbEyeCheck
                          className={`fs-4 mb-2 text-color ${
                            !hasEditPermission ? "me-3" : ""
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
            <td colSpan="5">
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

export default CasesSingleTable;
