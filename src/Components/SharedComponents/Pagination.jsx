import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Pagination = ({ currentPage = 1, totalPages = 1, handlePageChange }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <div
      className="btn-toolbar pagination-wrapper justify-content-between align-items-center mt-4 mb-4"
      role="toolbar"
      aria-label="Toolbar with button groups"
    >
      <div className="btn-group me-2" role="group" aria-label="First group">
        <button
          type="button"
          className="btn toolbar-btn me-2 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {isRTL ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`btn toolbar-btn me-2 fw-semibold rounded ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          type="button"
          className="btn toolbar-btn me-2 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {isRTL ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
