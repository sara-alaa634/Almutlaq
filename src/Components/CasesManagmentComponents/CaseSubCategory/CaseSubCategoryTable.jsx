import React, { useState, useEffect } from "react";
import "../../../Assets/Css/usersManagment.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TbSettings } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { LuToggleRight } from "react-icons/lu";
import { LuToggleLeft } from "react-icons/lu";
import { TbEyeCheck } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import Pagination from "../../SharedComponents/Pagination";
import { handleTableColumnDateFormat } from "../../../helpers/formatDate";
import { defaultAlert } from "../../../helpers/Alert";
import { alertMessages } from "../../../helpers/messages";

const CaseSubCategoryTable = ({
  data,
  setData,
  removeSubCaseCategory,
  editCaseSubCategoryState,
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
      t(alertMessages.confirmTextCaseSubCategory),
      t(alertMessages.confirmButton),
      t(alertMessages.cancelButton),
      "warning"
    );

    if (result) {
      await removeSubCaseCategory(id);
      setData((prev) => {
        const updatedData = prev.filter(
          (caseSubCategory) => caseSubCategory.id !== id
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
    event.stopPropagation(); // Prevent row click
    navigate(`/cases/subCategory/${id}`);
  };

  const handleSwitch = async (event, caseSubCategory) => {
    event.stopPropagation();
    await editCaseSubCategoryState(
      caseSubCategory.id,
      caseSubCategory.status === 1 ? 0 : 1
    );
    setData((prev) =>
      prev.map((item) =>
        item.id === caseSubCategory.id
          ? {
              ...item,
              status: caseSubCategory.status === 1 ? 0 : 1,
            }
          : item
      )
    );
    // Add logic for switch action
  };

  const handleView = (event, id) => {
    event.stopPropagation();
    navigate(`/cases/subCategory-view/${id}`);
  };

  return (
    <section className="table-wrapper mt-md-0 mt-sm-5 mt-4 l-d-bg p-3 rounded">
      <div className="table-responsive-xxl">
        <table className="table table-border">
          <thead>
            <tr>
              <th scope="col ">
              <span className={`${isRTL?"me-2":"ms-2"} d-inline-block create-btn-clr`}>
              {t("publisher_info")}
                </span>
              </th>
              <th scope="col">{t("publish_data")}</th>
              <th scope="col">{t("case_category")}</th>
              <th scope="col">{t("case_type")}</th>
              <th scope="col">{t("state")}</th>
              <th scope="col" className="text-end">
                <span className="me-2 d-inline-block fs-5">
                  <TbSettings className="fs-4" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData && currentData.length > 0 ? (
              currentData.map((caseSubCategory) => (
                <tr key={caseSubCategory.id}>
                  <td className=" mw-170px">
                    <img
                      className="client-table-user-img mx-2"
                      src={
                        caseSubCategory.category.user.image
                          ? caseSubCategory.category.user.image
                          : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder.jpg`
                      }
                      alt=""
                    />{" "}
                    <span>{caseSubCategory.category.user.name} </span>
                  </td>
                  <td className="mw-120px">
                    {handleTableColumnDateFormat(caseSubCategory.created_at)}
                  </td>
                  <td className=" mw-170px">
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        className="client-table-user-img-rounded mx-2"
                        src={caseSubCategory.category.image}
                        alt=""
                      />

                      <div className="text-capitalize fw-medium  mc-1-clr">
                        {caseSubCategory.category.title}
                      </div>
                    </div>
                  </td>
                  <td className=" mw-170px">
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        className="client-table-user-img-rounded mx-2"
                        src={caseSubCategory.image}
                        alt=""
                      />

                      <div className="text-capitalize fw-medium  mc-1-clr">
                        {caseSubCategory.title}
                      </div>
                    </div>
                  </td>
                  <td className="mw-100px">
                    <span
                      className={
                        caseSubCategory.status
                          ? "active-case px-3 py-1 fs-13 fw-semibold"
                          : "inactive-case px-3 py-1 fs-13 fw-semibold"
                      }
                    >
                      {caseSubCategory.status ? t("active") : t("inactive")}
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
                              handleDelete(caseSubCategory.id);
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
                            onClick={(e) => handleEdit(e, caseSubCategory.id)}
                          >
                            <TbEdit
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
                            onClick={(e) => handleSwitch(e, caseSubCategory)}
                          >
                            {caseSubCategory.status ? (
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
                            onClick={(e) => handleView(e, caseSubCategory.id)}
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

export default CaseSubCategoryTable;
