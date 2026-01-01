import React, { useState, useEffect } from "react";
import "../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiEdit } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";
import { LuToggleRight } from "react-icons/lu";
import { LuToggleLeft } from "react-icons/lu";
import { TbEyeCheck } from "react-icons/tb";
import Pagination from "../../SharedComponents/Pagination";
import { handleTableColumnDateFormat } from "../../../helpers/formatDate";
import { defaultAlert } from "../../../helpers/Alert";
import { alertMessages } from "../../../helpers/messages";
const CaseCategoryTable = ({
  data,
  setData,
  removeCaseCategory,
  editCaseCategoryState,
  editPermission,
  deletePermission,
  viewPermission,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const validData = Array.isArray(data) ? data : [];

  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(validData.length / rowsPerPage);

  // Slice the data array to show only rows for the current page
  const currentData = validData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to page 1 when rows per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = async (id) => {
    const result = await defaultAlert(
      t(alertMessages.confirmTitle),
      t(alertMessages.confirmTextCaseCategory),
      t(alertMessages.confirmButton),
      t(alertMessages.cancelButton),
      "warning"
    );

    if (result) {
      await removeCaseCategory(id);
      setData((prev) => {
        const updatedData = prev.filter(
          (caseCategory) => caseCategory.id !== id
        );
        // If the current page has no data and is not the first page, go back one page
        if (
          currentPage > 1 &&
          updatedData.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
          ).length === 0
        ) {
          setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        }

        return updatedData;
      });
    }
  };

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/cases/case-category/${id}`);
  };

  const handleSwitch = async (event, caseCategory) => {
    event.stopPropagation();
    await editCaseCategoryState(
      caseCategory.id,
      caseCategory.status === 1 ? 0 : 1
    );
    setData((prev) =>
      prev.map((item) =>
        item.id === caseCategory.id
          ? {
              ...item,
              status: caseCategory.status === 1 ? 0 : 1,
            }
          : item
      )
    );
  };

  const handleView = (event, id) => {
    event.stopPropagation();
    navigate(`/cases/case-category-view/${id}`);
  };

  return (
    <section className="table-wrapper mt-lg-0 mt-md-5 mt-4 l-d-bg p-3 rounded">
      <div className="table-responsive-xl">
        <table className="table table-border">
          <thead>
            <tr>
              <th scope="col">
                <span className={`${isRTL?"me-2":"ms-2"} d-inline-block create-btn-clr`}>
                  {t("publisher_info")}
                </span>
              </th>
              <th scope="col">{t("publish_data")}</th>
              <th scope="col">{t("case_type")}</th>
              <th scope="col">{t("state")}</th>
              <th scope="col" className={isRTL?"text-start":"text-end"}>
                <span className={` ${isRTL?"ms-4":"me-4"} d-inline-block fs-5`}>
                  <FiSettings />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData && currentData.length > 0 ? (
              currentData.map((caseCategory) => (
                <tr key={caseCategory.id}>
                  <td className="mw-170px">
                    <img
                      className="client-table-user-img mx-2"
                      src={
                        caseCategory.user.image
                          ? caseCategory.user.image
                          : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                      }
                      alt="..."
                    />
                    <span>{caseCategory.user.name}</span>
                  </td>
                  <td className="mw-120px">
                    {handleTableColumnDateFormat(caseCategory.created_at)}
                  </td>
                  <td className="mw-170px">
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        className="client-table-user-img-rounded mx-2"
                        src={caseCategory.image}
                        alt="..."
                      />
                      <div className="text-capitalize fw-medium mc-1-clr">
                        {caseCategory.title}
                      </div>
                    </div>
                  </td>
                  <td className="mw-100px">
                    <span
                      className={
                        caseCategory.status
                          ? "active-case px-3 py-1 fs-13 fw-semibold"
                          : "inactive-case px-3 py-1 fs-13 fw-semibold"
                      }
                    >
                      {caseCategory.status ? t("active") : t("inactive")}
                    </span>
                  </td>
                  <td className="text-end">
                    <span
                      className={` ${
                        isRTL ? "ms-2" : "me-2"
                      } d-flex flex-column align-items-end justify-content-end`}
                    >
                      <span className="d-flex justify-content-between align-items-center">
                        {deletePermission && (
                          <a
                            className="text-end"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(caseCategory.id);
                            }}
                          >
                            <TbTrash
                              className={`fs-4 mb-2 text-color ${
                                isRTL ? "ms-3" : "me-3"
                              }`}
                            />
                          </a>
                        )}
                        {editPermission && (
                          <a
                            className="text-end"
                            onClick={(e) => handleEdit(e, caseCategory.id)}
                          >
                            <FiEdit
                              className={`fs-4 mb-2 text-color ${
                                !deletePermission
                                  ? isRTL
                                    ? "ms-3"
                                    : "me-3"
                                  : ""
                              }`}
                            />
                          </a>
                        )}
                      </span>
                      <span className="d-flex justify-content-between align-items-center">
                        {editPermission && (
                          <a
                            className="text-end"
                            onClick={(e) => handleSwitch(e, caseCategory)}
                          >
                            {caseCategory.status ? (
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
                        )}
                        {viewPermission && (
                          <a
                            className="text-end"
                            onClick={(e) => handleView(e, caseCategory.id)}
                          >
                            <TbEyeCheck
                              className={`fs-4 mb-2 text-color ${
                                !editPermission ? (isRTL ? "ms-4" : "me-3") : ""
                              }`}
                            />
                          </a>
                        )}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </section>
  );
};

export default CaseCategoryTable;
