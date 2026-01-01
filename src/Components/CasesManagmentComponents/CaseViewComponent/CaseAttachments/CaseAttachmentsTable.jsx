import { useState } from "react";
import "../../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { TbSettings } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { LuToggleRight } from "react-icons/lu";
import { LuToggleLeft } from "react-icons/lu";
import { TbCloudDownload } from "react-icons/tb";
import { handleTableColumnDateFormat } from "../../../../helpers/formatDate";
import { defaultAlert } from "../../../../helpers/Alert";
import { alertMessages } from "../../../../helpers/messages";
import { PulseLoader } from "react-spinners";
import { Toast } from "../../../../helpers/Toast";
import { successMessages, errorMessages } from "../../../../helpers/messages";
import LogoLoader from "../../../../helpers/loader";

const CaseAttachmentTable = ({
  paginationData,
  setPaginationData,
  onUpdate,
  onDelete,
  download,
  hasViewPermission,
  hasDeletePermission,
  hasEditPermission,
  loading,
  currentPage,
  onChange,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [downlaodLoading, setDownloadLoading] = useState(false);

  const handleDelete = async (id) => {
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmTextCaseFile),
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

  const handleDownload = async (e, caseAttachment) => {
    e.preventDefault();
    setDownloadLoading(true);
    try {
      const response = await download(caseAttachment.id);
      const filename = caseAttachment.file_name;
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Clean up the created URL
      window.URL.revokeObjectURL(url);
      setDownloadLoading(false);
      Toast("success", t(successMessages.fileDonwlaod));
    } catch (error) {
      setDownloadLoading(false);
      Toast("error", t(errorMessages.fileDownloadError));
      // console.error("File download error:", error);
    }
  };

  const getFileIcon = (filePath) => {
    // Common image extensions
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".bmp",
      ".svg",
    ];
    const extension = filePath.toLowerCase().match(/\.[^.]*$/)?.[0] || "";

    // Check if the file has an image extension
    if (imageExtensions.includes(extension)) {
      return filePath; // Return the original file path for images
    }

    // Check for specific document types
    switch (extension) {
      case ".pdf":
        return `${process.env.PUBLIC_URL}/Assets/Images/icons/pdf-file-thumbnail.png`;
      case ".doc":
      case ".docx":
        return `${process.env.PUBLIC_URL}/Assets/Images/icons/file-thumbnail.png`;
      default:
        return `${process.env.PUBLIC_URL}/Assets/Images/icons/unkonwn-file.png`;
    }
  };

  return (
    <>
      {downlaodLoading && <LogoLoader loading={downlaodLoading} />}
      <table className="table  table-border">
        <thead>
          <tr>
            <th scope="col ">
            <span className={`${isRTL?"me-2":"ms-2"} d-inline-block create-btn-clr`}>
            {t("attachment_details")}
              </span>
            </th>
            <th scope="col">{t("Order_date")}</th>
            <th scope="col">{t("upload_date")}</th>
            <th scope="col">{t("responsible")}</th>
            <th scope="col">{t("state")}</th>
            <th scope="col">{t("file_state")}</th>
            <th scope="col" className={isRTL?"text-start":"text-end"}>
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
                    speedMultiplier={0.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <span className="d-inline-block me-4">{t("searching")}</span>
                </div>
              </td>
            </tr>
          ) : paginationData && paginationData.length > 0 ? (
            paginationData.map((caseAttachment, index) => (
              <tr key={index}>
                <td className=" mw-170px maxW-200px pe-3 line-h-25px">
                  <div className="d-flex gap-2 ">
                    {caseAttachment.action === "upload" ? (
                      <img
                        className="client-table-user-img-rounded border-0 mx-2"
                        src={getFileIcon(caseAttachment.file_path)}
                        alt=""
                      />
                    ) : null}
                    <div>
                      <div className="text-capitalize fs-5 fw-medium mb-2 mc-1-clr">
                        {caseAttachment.file_name}
                      </div>
                      <div className="text-capitalize fs-6 fw-normal mc-1-clr">
                        {caseAttachment.file_size}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="mw-120px">
                  {handleTableColumnDateFormat(caseAttachment.created_at)}
                </td>
                <td className="mw-120px">
                  {caseAttachment.file_upload_date
                    ? handleTableColumnDateFormat(
                        caseAttachment.file_upload_date
                      )
                    : "-"}
                </td>
                <td className=" mw-170px">
                  <img
                    className="client-table-user-img mx-2"
                    src={
                      caseAttachment.added_by.image
                        ? caseAttachment.added_by.image
                        : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                    }
                    alt=""
                  />{" "}
                  <span>{caseAttachment.added_by.name} </span>
                </td>

                <td className="mw-100px">
                  <span
                    className={
                      caseAttachment.status
                        ? "active-case px-3 py-1 fs-13 fw-semibold"
                        : "inactive-case px-3 py-1 fs-13 fw-semibold"
                    }
                  >
                    {caseAttachment.status ? t("active") : t("inactive")}
                  </span>
                </td>
                <td className="mw-100px">
                  <span
                    className={
                      caseAttachment.action === "upload"
                        ? "active-case px-3 py-1 fs-13 fw-semibold"
                        : "ongoing-case px-3 py-1 fs-13 fw-semibold"
                    }
                  >
                    {caseAttachment.action === "upload"
                      ? t("upload")
                      : t("required")}
                  </span>
                </td>

                <td className="text-end setting-icons">
                  <span
                    className={` ${
                      isRTL ? "me-2" : "ms-2"
                    } d-flex flex-column align-items-end justify-content-end`}
                  >
                    <span className="d-flex justify-content-between align-items-center">
                      {hasDeletePermission ? (
                        <button
                          className="text-end bg-transparent border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(caseAttachment.id);
                          }}
                        >
                          <TbTrash className="fs-4  mb-2 text-color" />
                        </button>
                      ) : null}
                      {hasEditPermission ? (
                        <button
                          className="text-end bg-transparent border-0"
                          onClick={(e) => {
                            handleSwitch(e, caseAttachment);
                          }}
                        >
                          {caseAttachment.status ? (
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
                        </button>
                      ) : null}
                    </span>
                    {caseAttachment.action === "upload" ? (
                      <span className="d-flex justify-content-between align-items-center">
                        {hasViewPermission ? (
                          <button
                            className={`text-end bg-transparent border-0 ${
                              isRTL ? "ms-3" : "me-3"
                            }`}
                            onClick={(e) => handleDownload(e, caseAttachment)}
                          >
                            <TbCloudDownload
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

export default CaseAttachmentTable;
