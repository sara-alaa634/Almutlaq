import { useEffect, useState } from "react";
import "../../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { TbSettings } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { LuToggleRight } from "react-icons/lu";
import { LuToggleLeft } from "react-icons/lu";
import { TbEyeCheck } from "react-icons/tb";
import { handleTableColumnDateFormat } from "../../../../helpers/formatDate";
import { defaultAlert } from "../../../../helpers/Alert";
import { alertMessages } from "../../../../helpers/messages";
import CaseStatusUpdateModal from "./CaseStatusUpdateModal";
import { PulseLoader } from "react-spinners";

const CaseStatusTable = ({
  caseID,
  paginationData,
  setPaginationData,
  onUpdate,
  onDelete,
  hasEditPermission,
  hasDeletePermission,
  loading,
  currentPage,
  onChange,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [showModal, setShowModal] = useState(false);
  // this state for update senario
  const [oldCaseState, setOldCaseState] = useState({});

  // for update case
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleEdit = (event, caseState) => {
    event.stopPropagation();
    setOldCaseState(caseState);
    handleShow();
  };
  const handleDelete = async (id) => {
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmTextCaseState),
      t(alertMessages.confirmButton),
      t(alertMessages.cancelButton),
      "warning"
    );
    if (result) {
      await onDelete(id);
      setPaginationData((prev) =>
        prev.filter((singleCase) => singleCase.id !== id)
      );
      if (paginationData.length === 1 || paginationData.length === 0) {
        onChange(currentPage - 1);
      }
    }
  };

  const handleSwitch = async (event, updatedCase) => {
    event.stopPropagation();
    const newState = updatedCase.status === 1 ? 0 : 1;
    await onUpdate(updatedCase.id, newState);
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
  return (
    <table className="table  table-border">
      {showModal && (
        <CaseStatusUpdateModal
          show={showModal}
          onHide={handleClose}
          caseID={caseID}
          oldCaseState={oldCaseState}
          data={paginationData}
          setData={setPaginationData}
        />
      )}
      <thead>
        <tr>
          <th scope="col ">
            <span
              className={`${
                isRTL ? "me-2" : "ms-2"
              } d-inline-block create-btn-clr`}
            >
              {t("Case_status")}
            </span>
          </th>
          <th scope="col">{t("Start_date")}</th>
          <th scope="col">{t("responsible")}</th>
          <th scope="col">{t("state")}</th>
          <th scope="col" className={isRTL ? "text-start" : "text-end"}>
            <span
              className={`d-inline-block fs-5 ${isRTL ? " ms-4" : " me-4"}`}
            >
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
        ) : paginationData && paginationData.length > 0 ? (
          paginationData.map((caseStateData, index) => (
            <tr key={index}>
              <td className=" mw-170px">
                <div
                  className={`text-capitalize fs-5 fw-medium mb-2 mc-1-clr ${
                    isRTL ? "me-2" : "ms-2"
                  }`}
                >
                  {caseStateData.title}
                </div>{" "}
                <div
                  className={`text-capitalize fs-6 fw-normal mc-1-clr ${
                    isRTL ? "me-2" : "ms-2"
                  }`}
                >
                  {caseStateData.description}
                </div>{" "}
              </td>
              <td className="mw-120px">
                {" "}
                {handleTableColumnDateFormat(caseStateData.created_at)}
              </td>
              <td className=" mw-170px">
                <img
                  className="client-table-user-img mx-2"
                  src={
                    caseStateData.lawyer.image
                      ? caseStateData.lawyer.image
                      : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                  }
                  alt=""
                />{" "}
                <span>{caseStateData.lawyer.name} </span>
              </td>
              <td className="mw-100px">
                <span
                  className={
                    caseStateData.status
                      ? "ongoing-case px-3 py-1 fs-13 fw-semibold"
                      : "ended-case px-3 py-1 fs-13 fw-semibold"
                  }
                >
                  {caseStateData.status ? t("ongoing") : t("ended")}
                </span>
              </td>
              <td className="text-end setting-icons">
                <span
                  className={` ${
                    isRTL ? "ms-2" : "me-2"
                  } d-flex flex-column align-items-end justify-content-end`}
                >
                  <span className="d-flex justify-content-between align-items-center">
                    {hasDeletePermission ? (
                      <button
                        className="text-end bg-transparent border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(caseStateData.id);
                        }}
                      >
                        <TbTrash className="fs-5 mb-2 text-color" />
                      </button>
                    ) : null}
                    {hasEditPermission ? (
                      <button
                        className="text-end bg-transparent border-0"
                        onClick={(e) => {
                          handleEdit(e, caseStateData);
                        }}
                      >
                        <TbEdit className="fs-5 mb-2 text-color" />
                      </button>
                    ) : null}
                  </span>
                  <span className="d-flex justify-content-between align-items-center">
                    {hasEditPermission ? (
                      <button
                        className="text-end bg-transparent border-0"
                        onClick={(e) => {
                          handleSwitch(e, caseStateData);
                        }}
                      >
                        {caseStateData.status ? (
                          <LuToggleLeft
                            className={`fs-5 mb-2 ${
                              isRTL ? "ms-3" : "me-3"
                            } text-color`}
                          />
                        ) : (
                          <LuToggleRight
                            className={`fs-5 mb-2 ${
                              isRTL ? "ms-3" : "me-3"
                            } text-color`}
                          />
                        )}
                      </button>
                    ) : null}
                  </span>
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              {t("no_data_available")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CaseStatusTable;
