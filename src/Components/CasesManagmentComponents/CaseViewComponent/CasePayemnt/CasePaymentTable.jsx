import { useState } from "react";
import "../../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { TbSettings } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { HiOutlineChat } from "react-icons/hi";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { handleTableColumnDateFormat } from "../../../../helpers/formatDate";
import { defaultAlert } from "../../../../helpers/Alert";
import { alertMessages } from "../../../../helpers/messages";
import CasePaymentUpdateModal from "./CasePaymentUpdateModal";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const CasePaymentTable = ({
  paginationData,
  setPaginationData,
  onDelete,
  hasViewChatPermission,
  hasDeletePermission,
  hasEditPermission,
  loading,
  currentPage,
  onChange,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [oldCasePaymentData, setOldCsePaymentData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmTextCasePayment),
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
  // funcions to handle model open in update state
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleEdit = (e, casePayment) => {
    e.stopPropagation();
    setOldCsePaymentData(casePayment);
    handleShow();
  };

  const handleView = (e, userID) => {
    e.stopPropagation();
    navigate(`/chat/${userID}`);
  };

  return (
    <>
      {showModal && (
        <CasePaymentUpdateModal
          show={showModal}
          onHide={handleClose}
          oldCasePaymentData={oldCasePaymentData}
          setData={setPaginationData}
        />
      )}
      <table className="table  table-border">
        <thead>
          <tr>
            <th scope="col ">
              <span
                className={`${
                  isRTL ? "me-2" : "ms-2"
                } d-inline-block create-btn-clr`}
              >
                {t("Paid_Details")}
              </span>
            </th>
            <th scope="col">{t("Order_date")}</th>
            <th scope="col">{t("Payment_date")}</th>
            <th scope="col">{t("responsible")}</th>
            <th scope="col">{t("payment_method")}</th>
            <th scope="col">{t("payment_status")}</th>
            <th scope="col" className={isRTL ? "text-start" : "text-end"}>
              <span
                className={` ${isRTL ? "ms-4" : "me-4"} d-inline-block fs-5`}
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
            paginationData.map((casePayment, index) => (
              <tr key={index}>
                <td className=" mw-170px maxW-200px pe-3">
                  <div
                    className={`text-capitalize fs-5 fw-medium mb-2 mc-1-clr ${
                      isRTL ? "me-2" : "ms-2"
                    }`}
                  >
                    {casePayment.payment_details}
                  </div>{" "}
                  <div
                    className={`text-capitalize fs-6 fw-normal ${
                      isRTL ? "me-2" : "ms-2"
                    }  mc-1-clr`}
                  >
                    {casePayment.required_amount}
                  </div>{" "}
                </td>
                <td className="mw-120px">
                  {handleTableColumnDateFormat(casePayment.created_at)}
                </td>
                <td className="mw-120px">
                  {handleTableColumnDateFormat(casePayment.payment_date)}
                </td>
                <td className=" mw-170px">
                  <img
                    className="client-table-user-img mx-2"
                    src={
                      casePayment.added_by.image
                        ? casePayment.added_by.image
                        : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                    }
                    alt=""
                  />{" "}
                  <span>{casePayment.added_by.name} </span>
                </td>
                <td className=" mw-170px">
                  <div className="text-capitalize fs-6 fw-medium mb-2 mc-1-clr">
                    {casePayment.action === "payment"
                      ? casePayment.payment_method
                      : "-"}
                  </div>{" "}
                </td>
                <td className="mw-100px">
                  <span
                    className={
                      casePayment.action === "payment"
                        ? "active-case px-3 py-1 fs-13 fw-semibold"
                        : "ongoing-case px-3 py-1 fs-13 fw-semibold"
                    }
                  >
                    {casePayment.action === "payment"
                      ? t("paid")
                      : t("required")}
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
                          className={`text-end bg-transparent border-0 ${
                            casePayment.action === "payment" ? (isRTL?"ms-3":"me-3") : null
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(casePayment.id);
                          }}
                        >
                          <TbTrash className="fs-4 mb-2 text-color" />
                        </button>
                      ) : null}
                      {casePayment.action !== "payment" && hasEditPermission ? (
                        <button
                          className="text-end bg-transparent border-0"
                          onClick={(e) => {
                            handleEdit(e, casePayment);
                          }}
                        >
                          <PiCurrencyCircleDollar className="fs-4 mb-2 text-color" />
                        </button>
                      ) : null}
                    </span>
                    {casePayment.action !== "payment" ? (
                      <span className="d-flex justify-content-between align-items-center">
                        {hasViewChatPermission ? (
                          <button
                            className="text-end bg-transparent border-0"
                            onClick={(e) => {
                              handleView(e, casePayment?.added_by?.id);
                            }}
                          >
                            <HiOutlineChat
                              className={`fs-4 mb-2 text-color ${
                                isRTL ? "ms-3" : "me-3"
                              }`}
                            />
                          </button>
                        ) : null}
                      </span>
                    ) : null}
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
    </>
  );
};

export default CasePaymentTable;
